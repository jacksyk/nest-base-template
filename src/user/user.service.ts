import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  @Inject(JwtService)
  private jwtService: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;
    const user = new User();
    user.username = username;
    user.password = password;
    const info = await this.userRepository.save(user);
    return info;
  }

  async login(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;

    const info = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });

    if (info) {
      return {
        message: '登陆成功',
        code: 200,
        token: this.jwtService.sign({
          sub: info.id,
          name: info.username,
        }),
      };
    } else {
      return {
        message: '账号或密码错误',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
