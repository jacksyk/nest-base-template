import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs/internal/Observable';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(Reflector)
  private reflect: Reflector;

  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 代表需要放行的路由
    const isPass = this.reflect.getAllAndOverride<boolean>('requirePass', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPass) return true;

    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.token;
    if (!token) {
      throw new UnauthorizedException({
        message: '没有权限操作',
      });
    }

    try {
      this.jwtService.verify(token as string);
      return true;
    } catch (err) {
      return false;
    }
  }
}
