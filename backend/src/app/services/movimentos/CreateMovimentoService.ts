import { getCustomRepository } from 'typeorm';
import Movimentos from '../../models/Movimentos';
import MovimentosRepository from '../../repositories/MovimentosRepository';
import ReceitasRepository from '../../repositories/ReceitasRepository';
import DespesasRepository from '../../repositories/DespesasRepository';
import AppError from '../../../errors/AppError';

interface Request {
  desc_movimento: string;
  dt_movimento: Date;
  valor: number;
  cod_receita: number;
  cod_despesa: number;
}

class CreateMovimentoService {
  public async execute({
    desc_movimento,
    dt_movimento,
    valor,
    cod_receita,
    cod_despesa
  }: Request): Promise<Movimentos> {

    const movimentosRepository = getCustomRepository(MovimentosRepository);
    const receitasRepository = getCustomRepository(ReceitasRepository);
    const despesasRepository = getCustomRepository(DespesasRepository);

    if (cod_receita) {
      const receitaId = await receitasRepository.findById(cod_receita);

      if (!receitaId) {
        throw new AppError('Receita não cadastrada no sistema', 400);
      }
    }

    if (cod_despesa) {
      const despesaId = await despesasRepository.findById(cod_despesa);

      if (!despesaId) {
        throw new AppError('Despesa não cadastrada no sistema', 400);
      }
    }
    
    const movimento = movimentosRepository.create({
      desc_movimento,
      dt_movimento,
      valor,
      cod_receita,
      cod_despesa
    });

    await movimentosRepository.save(movimento);

    return movimento;
  }
}

export default CreateMovimentoService;