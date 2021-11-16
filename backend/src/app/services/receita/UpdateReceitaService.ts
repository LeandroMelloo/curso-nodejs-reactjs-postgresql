import { getCustomRepository } from 'typeorm';
import Receitas from '../../models/Receitas';
import ReceitasRepository from '../../repositories/ReceitasRepository';
import AppError from '../../../errors/AppError';

interface Request {
  cod_receita: number;
  desc_receita: string;
}

class UpdateReceitaService {
  public async execute({
    cod_receita,
    desc_receita
  }: Request): Promise<Receitas> {

    const receitasRepository = getCustomRepository(ReceitasRepository);

    const receitaId = await receitasRepository.findById(cod_receita);

    if (!receitaId) {
      throw new AppError('Receita não cadastrada no sistema', 400);
    }

    const checkReceitaExists = await receitasRepository.findReceitas(desc_receita);
    if (checkReceitaExists) {
      throw new AppError('Receita já cadastrada no sistema', 400);
    }

    const receita = receitasRepository.save({
      cod_receita,
      desc_receita
    });

    return receita;
  }
}

export default UpdateReceitaService;