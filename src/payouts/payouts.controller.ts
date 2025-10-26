import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PayoutsService } from './payouts.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { UpdatePayoutDto } from './dto/update-payout.dto';

@ApiTags('Payouts')
@Controller('payouts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payout request' })
  @ApiResponse({ status: 201, description: 'Payout created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createPayoutDto: CreatePayoutDto) {
    return this.payoutsService.create(createPayoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payouts' })
  @ApiResponse({ status: 200, description: 'Payouts retrieved successfully' })
  findAll(@Query('seller_id') sellerId?: number, @Query('status') status?: string) {
    return this.payoutsService.findAll({ seller_id: sellerId, status });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payout by ID' })
  @ApiResponse({ status: 200, description: 'Payout retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Payout not found' })
  findOne(@Param('id') id: string) {
    return this.payoutsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payout' })
  @ApiResponse({ status: 200, description: 'Payout updated successfully' })
  @ApiResponse({ status: 404, description: 'Payout not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto) {
    return this.payoutsService.update(id, updatePayoutDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a payout' })
  @ApiResponse({ status: 204, description: 'Payout deleted successfully' })
  @ApiResponse({ status: 404, description: 'Payout not found' })
  remove(@Param('id') id: string) {
    return this.payoutsService.remove(id);
  }
}
