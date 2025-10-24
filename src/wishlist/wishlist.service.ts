import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: number) {
    const wishlistItems = await this.prisma.wishlistItem.findMany({
      where: { user_id: userId },
      include: { product: true },
    });

    return wishlistItems.map(item => item.product);
  }

  async addToWishlist(userId: number, productId: number) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if already in wishlist
    const existingItem = await this.prisma.wishlistItem.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (existingItem) {
      return { message: 'Product already in wishlist' };
    }

    // Add to wishlist
    return this.prisma.wishlistItem.create({
      data: {
        user_id: userId,
        product_id: productId,
      },
      include: { product: true },
    });
  }

  async removeFromWishlist(userId: number, productId: number) {
    const wishlistItem = await this.prisma.wishlistItem.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (!wishlistItem) {
      throw new NotFoundException('Item not found in wishlist');
    }

    await this.prisma.wishlistItem.delete({
      where: { id: wishlistItem.id },
    });

    return { message: 'Item removed from wishlist' };
  }
}
