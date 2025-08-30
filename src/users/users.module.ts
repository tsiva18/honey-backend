import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '@app/shared';
import { UserSchema } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collections.users, schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule { }
