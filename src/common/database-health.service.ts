import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabaseHealthService {
  constructor(private prisma: PrismaService) {}

  // Check database connection
  async checkConnection(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  // Get database statistics
  async getDatabaseStats() {
    try {
      const [
        userCount,
        productCount,
        orderCount,
        disputeCount,
        activeUsers,
        inactiveUsers,
        pendingOrders,
        resolvedDisputes,
      ] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.product.count(),
        this.prisma.order.count(),
        this.prisma.dispute.count(),
        this.prisma.user.count({ where: { is_active: true } }),
        this.prisma.user.count({ where: { is_active: false } }),
        this.prisma.order.count({ where: { status: 'pending' } }),
        this.prisma.dispute.count({ where: { status: 'resolved' } }),
      ]);

      return {
        users: {
          total: userCount,
          active: activeUsers,
          inactive: inactiveUsers,
        },
        products: {
          total: productCount,
        },
        orders: {
          total: orderCount,
          pending: pendingOrders,
        },
        disputes: {
          total: disputeCount,
          resolved: resolvedDisputes,
        },
      };
    } catch (error) {
      console.error('Error getting database stats:', error);
      throw error;
    }
  }

  // Check data integrity
  async checkDataIntegrity() {
    const issues: string[] = [];

    try {
      // Check for orphaned cart items
      const orphanedCartItems = await this.prisma.cartItem.findMany({
        where: {
          OR: [
            { user: null },
            { product: null },
          ],
        },
      });

      if (orphanedCartItems.length > 0) {
        issues.push(`Found ${orphanedCartItems.length} orphaned cart items`);
      }

      // Check for orphaned order items
      const orphanedOrderItems = await this.prisma.orderItem.findMany({
        where: {
          OR: [
            { order: null },
            { product: null },
          ],
        },
      });

      if (orphanedOrderItems.length > 0) {
        issues.push(`Found ${orphanedOrderItems.length} orphaned order items`);
      }

      // Check for users with invalid roles
      const usersWithInvalidRoles = await this.prisma.user.findMany({
        where: {
          roles: {
            not: {
              in: [
                '["user"]',
                '["seller"]',
                '["admin"]',
                '["moderator"]',
                '["super_admin"]',
                '["user","seller"]',
                '["user","admin"]',
                '["user","moderator"]',
              ],
            },
          },
        },
      });

      if (usersWithInvalidRoles.length > 0) {
        issues.push(`Found ${usersWithInvalidRoles.length} users with invalid roles`);
      }

      // Check for products without sellers
      const productsWithoutSellers = await this.prisma.product.findMany({
        where: { seller_id: null },
      });

      if (productsWithoutSellers.length > 0) {
        issues.push(`Found ${productsWithoutSellers.length} products without sellers`);
      }

      return {
        healthy: issues.length === 0,
        issues,
        checkedAt: new Date(),
      };
    } catch (error) {
      console.error('Error checking data integrity:', error);
      return {
        healthy: false,
        issues: [`Database integrity check failed: ${error.message}`],
        checkedAt: new Date(),
      };
    }
  }

  // Clean up orphaned data
  async cleanupOrphanedData() {
    const results = {
      cartItemsRemoved: 0,
      orderItemsRemoved: 0,
      wishlistItemsRemoved: 0,
    };

    try {
      // Remove orphaned cart items
      const orphanedCartItems = await this.prisma.cartItem.findMany({
        where: {
          OR: [
            { user: null },
            { product: null },
          ],
        },
      });

      if (orphanedCartItems.length > 0) {
        await this.prisma.cartItem.deleteMany({
          where: {
            id: { in: orphanedCartItems.map(item => item.id) },
          },
        });
        results.cartItemsRemoved = orphanedCartItems.length;
      }

      // Remove orphaned order items
      const orphanedOrderItems = await this.prisma.orderItem.findMany({
        where: {
          OR: [
            { order: null },
            { product: null },
          ],
        },
      });

      if (orphanedOrderItems.length > 0) {
        await this.prisma.orderItem.deleteMany({
          where: {
            id: { in: orphanedOrderItems.map(item => item.id) },
          },
        });
        results.orderItemsRemoved = orphanedOrderItems.length;
      }

      // Remove orphaned wishlist items
      const orphanedWishlistItems = await this.prisma.wishlistItem.findMany({
        where: {
          OR: [
            { user: null },
            { product: null },
          ],
        },
      });

      if (orphanedWishlistItems.length > 0) {
        await this.prisma.wishlistItem.deleteMany({
          where: {
            id: { in: orphanedWishlistItems.map(item => item.id) },
          },
        });
        results.wishlistItemsRemoved = orphanedWishlistItems.length;
      }

      return results;
    } catch (error) {
      console.error('Error cleaning up orphaned data:', error);
      throw error;
    }
  }

  // Optimize database
  async optimizeDatabase() {
    try {
      // Analyze tables for better query performance
      await this.prisma.$executeRaw`ANALYZE TABLE users`;
      await this.prisma.$executeRaw`ANALYZE TABLE products`;
      await this.prisma.$executeRaw`ANALYZE TABLE orders`;
      await this.prisma.$executeRaw`ANALYZE TABLE disputes`;
      await this.prisma.$executeRaw`ANALYZE TABLE cart`;
      await this.prisma.$executeRaw`ANALYZE TABLE wishlist`;

      return { message: 'Database optimization completed' };
    } catch (error) {
      console.error('Error optimizing database:', error);
      throw error;
    }
  }

  // Get slow queries (if supported by database)
  async getSlowQueries() {
    try {
      // This would depend on your database setup
      // For MySQL, you might query the slow query log
      return { message: 'Slow query analysis not implemented for this database type' };
    } catch (error) {
      console.error('Error getting slow queries:', error);
      throw error;
    }
  }
}
