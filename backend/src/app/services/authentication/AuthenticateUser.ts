import { sign } from 'jsonwebtoken';
import AuthConfig from '../../../config/auth';
import AppError from '../../../errors/AppError';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  user?: string;
  token: string;
}

class AutenticacaoUsuarioServico {
  public async execute({ email, senha }: Request): Promise<Response> {
    if (email !== 'admin@admin.com' || senha !== '12345678') {
      throw new AppError('E-mail/senha incorretos', 401);
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: 'admin',
      expiresIn,
    });

    return {
      user: 'admin',
      token,
    };
  }
}

export default AutenticacaoUsuarioServico;