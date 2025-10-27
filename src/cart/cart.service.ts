import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, name: true }
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async getCart(userId: number) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { user_id: userId, status: 'ACTIVE' },
      include: { product: true },
    });

    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
    const serviceFee = subtotal * 0.05; // 5% service fee
    const total = subtotal + serviceFee;

    return {
      items: cartItems,
      subtotal,
      service_fee: serviceFee,
      total,
      items_count: cartItems.length,
    };
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        user_id: userId,
        product_id: Number(addToCartDto.productId),
        status: 'ACTIVE',
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + addToCartDto.quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        user_id: userId,
        product_id: Number(addToCartDto.productId),
        quantity: addToCartDto.quantity,
      },
    });
  }

  async updateCartItem(userId: number, itemId: number, updateCartItemDto: UpdateCartItemDto) {
    return this.prisma.cartItem.updateMany({
      where: { id: itemId, user_id: userId },
      data: { quantity: updateCartItemDto.quantity },
    });
  }

  async removeFromCart(userId: number, itemId: number) {
    return this.prisma.cartItem.updateMany({
      where: { id: itemId, user_id: userId },
      data: { status: 'REMOVED' },
    });
  }

  async clearCart(userId: number) {
    return this.prisma.cartItem.updateMany({
      where: { user_id: userId, status: 'ACTIVE' },
      data: { status: 'REMOVED' },
    });
  }
}
