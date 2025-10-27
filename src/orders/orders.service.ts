import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const { items, shipping_address, payment_method } = createOrderDto;

    // Validate that items exist and are available
    let totalAmount = 0;
    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.product_id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.product_id} not found`);
      }

      if (product.status !== 'ACTIVE') {
        throw new BadRequestException(`Product ${product.name} is not available`);
      }

      totalAmount += Number(product.price) * item.quantity;
    }

    // Get product prices
    const productPrices = await Promise.all(
      items.map((item) =>
        this.prisma.product.findUnique({
          where: { id: item.product_id },
          select: { price: true },
        })
      )
    );

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${userId}`;
    
    // Calculate fees
    const serviceFee = totalAmount * 0.05; // 5% service fee
    const finalTotal = totalAmount + serviceFee;
    
    // Create order with items
    const order = await this.prisma.order.create({
      data: {
        order_number: orderNumber,
        buyer_id: userId,
        seller_id: items[0]?.seller_id || userId, // Use first item's seller or fallback
        subtotal: totalAmount,
        service_fee: serviceFee,
        total_amount: finalTotal,
        status: 'PENDING',
        payment_status: 'PENDING',
        payment_method,
        items: {
          create: items.map((item, index) => ({
            product_id: item.product_id,
            product_name: `Product ${item.product_id}`, // Should be fetched from product
            quantity: item.quantity,
            unit_price: Number(productPrices[index]?.price || 0),
            total_price: Number(productPrices[index]?.price || 0) * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return order;
  }

  async findAll(userId: number, userRole: string) {
    // Admins can see all orders, users only see their own
    const where = userRole === 'admin' ? {} : { buyer_id: userId };

    return this.prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number, userId: number, userRole: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true,
                description: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Check if user has permission to view this order
    if (userRole !== 'admin' && order.buyer_id !== userId) {
      throw new ForbiddenException('You do not have permission to view this order');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number, userRole: string) {
    // Check if order exists
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Only admins can update orders
    if (userRole !== 'admin') {
      throw new ForbiddenException('Only admins can update orders');
    }

    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async cancel(id: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Only the owner can cancel their order
    if (order.buyer_id !== userId) {
      throw new ForbiddenException('You can only cancel your own orders');
    }

    // Can only cancel pending or processing orders
    if (!['pending', 'processing'].includes(order.status)) {
      throw new BadRequestException(`Cannot cancel order with status: ${order.status}`);
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number, userRole: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Only admins can delete orders
    if (userRole !== 'admin') {
      throw new ForbiddenException('Only admins can delete orders');
    }

    await this.prisma.order.delete({
      where: { id },
    });

    return { message: 'Order deleted successfully' };
  }
}
