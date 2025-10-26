import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  async getCart(@Req() req: any) {
    // Check if user is authenticated
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Return empty cart for unauthenticated users
      return {
        items: [],
        total: 0,
        count: 0
      };
    }
    
    // Extract token and get user
    const token = authHeader.substring(7);
    try {
      const user = await this.cartService.getUserFromToken(token);
      if (!user) {
        return {
          items: [],
          total: 0,
          count: 0
        };
      }
      return this.cartService.getCart(user.id);
    } catch (error) {
      // Return empty cart if token is invalid
      return {
        items: [],
        total: 0,
        count: 0
      };
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addToCart(@CurrentUser() user: any, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(user.id, addToCartDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateCartItem(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(user.id, +id, updateCartItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeFromCart(@CurrentUser() user: any, @Param('id') id: string) {
    return this.cartService.removeFromCart(user.id, +id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear entire cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.id);
  }
}
