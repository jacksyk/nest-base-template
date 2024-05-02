import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Pass } from '../auth/auth.decorator';
import { WINSTON_LOGGER_TOKEN } from 'src/constant';

export const CONTEXT = 'user';

@Controller('user')
export class UserController {
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;
  constructor(private readonly userService: UserService) {}

  @Post()
  @Pass(true)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  login(@Body() createUserDto: CreateUserDto) {
    this.logger.log('login', CONTEXT);
    return this.userService.login(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
