import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'S3CR3tK3Y';

export class JwtProvider {
  sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error('Error en verificar token JWT:', err);
      throw new Error('Token inválido');
    }
  }
}
