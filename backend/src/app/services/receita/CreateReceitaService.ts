import { getCustomRepository } from 'typeorm';
import Receitas from '../../models/Receitas';
import ReceitasRepository from '../../repositories/ReceitasRepository';
import AppError from '../../../errors/AppError';

interface Request {
  desc_receita: string;
}

class CreateReceitaService {
  public async execute({
    desc_receita
  }: Request): Promise<Receitas> {

    const receitasRepository = getCustomRepository(ReceitasRepository);

    const checkReceitaExists = await receitasRepository.findReceitas(desc_receita);
    if (checkReceitaExists) {
      throw new AppError('Receita já cadastrada no sistema', 400);
    }

    const receita = receitasRepository.create({
      desc_receita
    });

    await receitasRepository.save(receita);

    return receita;
  }
}

export default CreateReceitaService;