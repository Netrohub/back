import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateNotificationDto {
  user_id: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  action_url?: string;
}

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new notification for a user
   */
  async createNotification(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        user_id: dto.user_id,
        type: dto.type,
        title: dto.title,
        message: dto.message,
        data: dto.data || {},
        action_url: dto.action_url,
        is_read: false,
      },
    });
  }

  /**
   * Get all notifications for a user
   */
  async getUserNotifications(userId: number, onlyUnread: boolean = false) {
    const where: any = {
      user_id: userId,
    };

    if (onlyUnread) {
      where.is_read = false;
    }

    return this.prisma.notification.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
      take: 50, // Limit to recent 50 notifications
    });
  }

  /**
   * Get unread notification count for a user
   */
  async getUnreadCount(userId: number): Promise<number> {
    return this.prisma.notification.count({
      where: {
        user_id: userId,
        is_read: false,
      },
    });
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: number, userId: number) {
    // Verify the notification belongs to the user
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        user_id: userId,
      },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        is_read: true,
        read_at: new Date(),
      },
    });
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: number) {
    return this.prisma.notification.updateMany({
      where: {
        user_id: userId,
        is_read: false,
      },
      data: {
        is_read: true,
        read_at: new Date(),
      },
    });
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: number, userId: number) {
    // Verify the notification belongs to the user
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        user_id: userId,
      },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return this.prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  /**
   * Helper: Create order notification
   */
  async notifyNewOrder(sellerId: number, orderNumber: string, buyerName: string, amount: number) {
    return this.createNotification({
      user_id: sellerId,
      type: 'order',
      title: 'New Order Received',
      message: `${buyerName} placed an order #${orderNumber} for $${amount.toFixed(2)}`,
      action_url: `/dashboard?tab=seller`,
    });
  }

  /**
   * Helper: Create dispute notification
   */
  async notifyNewDispute(sellerId: number, orderNumber: string, reason: string) {
    return this.createNotification({
      user_id: sellerId,
      type: 'dispute',
      title: 'New Dispute Opened',
      message: `A dispute was opened for order #${orderNumber}: ${reason}`,
      action_url: `/disputes`,
    });
  }

  /**
   * Helper: Create payout notification
   */
  async notifyPayoutProcessed(sellerId: number, amount: number, status: string) {
    return this.createNotification({
      user_id: sellerId,
      type: 'payout',
      title: status === 'COMPLETED' ? 'Payout Completed' : 'Payout Update',
      message: `Your payout of $${amount.toFixed(2)} has been ${status.toLowerCase()}`,
      action_url: `/dashboard?tab=seller`,
    });
  }

  /**
   * Helper: Create KYC notification
   */
  async notifyKYCStatus(userId: number, status: string) {
    const title = status === 'APPROVED' ? 'KYC Approved' : 'KYC Update';
    const message = status === 'APPROVED' 
      ? 'Your identity verification has been approved!'
      : `Your KYC verification status: ${status}`;

    return this.createNotification({
      user_id: userId,
      type: 'kyc',
      title,
      message,
      action_url: '/account/security',
    });
  }
}

