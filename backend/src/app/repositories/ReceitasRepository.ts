import { EntityRepository, Repository } from 'typeorm';
import Receitas from '../models/Receitas';

@EntityRepository(Receitas)
class ReceitasRepository extends Repository<Receitas> {
    public async findReceitas(desc_receita: string): Promise<Receitas | null> {
        const findReceita = await this.findOne({
            where: { desc_receita },
        });

        return findReceita || null;
    }

    public async findById(cod_receita: number): Promise<Receitas | null> {
        const findId = await this.findOne({
            where: { cod_receita },
        });

        return findId || null;
    }
}

export default ReceitasRepository;

