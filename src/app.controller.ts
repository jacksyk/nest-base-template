import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { IsString, IsNumber, IsOptional } from 'class-validator';
class LoginBody {
  @IsString({
    message: (args) => {
      if (!args.value) return '用户名不能为空';
      console.log(args, '>>>');
      return '用户名必须是字符串';
    },
  })
  username: string;
  @IsString()
  password: string;
  @IsNumber()
  @IsOptional()
  id: number;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.jwtService.sign({
      sub: '1234567890',
      name: 'John Doe',
    });
  }

  @Post('login')
  login(@Body() body: LoginBody) {
    const { username, password } = body;
    console.log(typeof username);
    console.log(typeof password);

    return {
      message: '登陆成功',
    };
  }
}
