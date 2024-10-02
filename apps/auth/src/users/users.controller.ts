import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating new user ${createUserDto.email}`);
    return this.usersService.create(createUserDto);
  }
}
