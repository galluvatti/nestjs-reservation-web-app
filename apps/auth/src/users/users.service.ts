import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.isAlreadyRegistered(createUserDto.email)) {
      throw new UnprocessableEntityException('Email already registered');
    }
    // @ts-expect-error Omit type
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials not valid');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  async isAlreadyRegistered(email: string) {
    try {
      await this.usersRepository.findOne({ email });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
