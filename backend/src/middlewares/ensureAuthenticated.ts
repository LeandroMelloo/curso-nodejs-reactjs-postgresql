import { Response, Request, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import AuthConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  nbf: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;


  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const decoded = decode(token);
  const { exp, nbf } = decoded as TokenPayload;
  const now = Date.now().valueOf() / 1000

  if (typeof exp !== 'undefined' && exp < now) {
    throw new AppError('Sessão expirada, faça login novamente', 401);
  }
  if (typeof nbf !== 'undefined' && nbf > now) {
    throw new AppError('Sessão expirada, faça login novamente', 401);
  }
  
  try {
    const decodedVerified = verify(token, AuthConfig.jwt.secret);

    const { sub } = decodedVerified as TokenPayload;

    request.user = {
      id_user: sub,
    };

    return next();
  } catch {
    throw new AppError('Não autorizado a acessar esta página ou sessão expirada', 401);
  }
}