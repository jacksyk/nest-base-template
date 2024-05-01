import { SetMetadata } from '@nestjs/common';
// 需要放行的装饰器
export const Pass = (args: boolean) => SetMetadata('requirePass', args);
