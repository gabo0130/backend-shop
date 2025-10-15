import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtProvider } from './jwt.provider';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtProvider: JwtProvider) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        throw new UnauthorizedException('No se proporcionó token');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new UnauthorizedException('Token malformado');
    }
    try {
        const payload = this.jwtProvider.verify(token);
        request.user = payload;
        return true;
    } catch (err) {
        throw new UnauthorizedException('Token inválido');
    }
    }
}
