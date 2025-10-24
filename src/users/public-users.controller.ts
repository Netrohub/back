import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('public-users')
@Controller('users')
export class PublicUsersController {
  constructor(private usersService: UsersService) {}

  @Get('members')
  @ApiOperation({ summary: 'Get all members (public)' })
  @ApiResponse({ status: 200, description: 'Members list retrieved' })
  async getMembers() {
    return this.usersService.findAll();
  }
}
