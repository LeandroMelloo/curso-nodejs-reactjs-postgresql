import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

import Movimentos from './Movimentos'

@Entity('receitas')
class Receitas {
    @PrimaryGeneratedColumn('increment')
    cod_receita: number;

    @Column('character varying', { length: 45 })
    desc_receita: string;

    @OneToMany(() => Movimentos, movimento => movimento.receitas)
    Movimento: Movimentos[];
}

export default Receitas;