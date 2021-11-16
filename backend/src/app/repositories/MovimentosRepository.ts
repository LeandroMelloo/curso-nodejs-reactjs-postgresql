import { EntityRepository, Repository } from 'typeorm';
import Movimentos from '../models/movimentos';

@EntityRepository(Movimentos)
class MovimentosRepository extends Repository<Movimentos> {
    public async findById(cod_movimento: string): Promise<Movimentos | null> {
        const findId = await this.findOne({
            where: { cod_movimento },
        });

        return findId|| null;
    }
}

export default MovimentosRepository;

