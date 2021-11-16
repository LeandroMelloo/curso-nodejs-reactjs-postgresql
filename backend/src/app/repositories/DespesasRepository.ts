import { EntityRepository, Repository } from 'typeorm';
import Despesas from '../models/despesas';

@EntityRepository(Despesas)
class DespesasRepository extends Repository<Despesas> {
    public async findDespesas(desc_despesa: string): Promise<Despesas | null> {
        const findDespesa = await this.findOne({
            where: { desc_despesa },
        });

        return findDespesa || null;
    }

    public async findById(cod_despesa: number): Promise<Despesas | null> {
        const findId = await this.findOne({
            where: { cod_despesa },
        });

        return findId || null;
    }
}

export default DespesasRepository;

