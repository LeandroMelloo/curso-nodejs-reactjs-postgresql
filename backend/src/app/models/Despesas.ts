import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

import Movimentos from './movimentos';

@Entity('despesas')
class Despesas {
    @PrimaryGeneratedColumn('increment')
    cod_despesa: number;

    @Column('character varying', { length: 45 })
    desc_despesa: string;

    @OneToMany(() => Movimentos, movimento => movimento.despesas)
    Movimento: Movimentos[];
}

export default Despesas;