import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PublicUsersController } from './public-users.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UsersService],
  controllers: [UsersController, PublicUsersController],
  exports: [UsersService],
})
export class UsersModule {}
