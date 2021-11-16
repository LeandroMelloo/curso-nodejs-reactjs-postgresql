import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import Despesas from './despesas';
import Receitas from './receitas';

@Entity('movimentos')
class Movimentos {
    @PrimaryGeneratedColumn('increment')
    cod_movimento: number;

    @Column('character varying', { length: 45 })
    desc_movimento: string;

    @Column()
    dt_movimento: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column('integer')
    cod_receita: number;

    @Column('integer')
    cod_despesa: number;

    @ManyToOne(() => Receitas, receita => receita.Movimento, {
        cascade: true,
        eager: true
    })
    @JoinColumn({ name: 'cod_receita' })
    receitas: Receitas;

    @ManyToOne(() => Despesas, despesa => despesa.Movimento, {
        cascade: true,
        eager: true
    })
    @JoinColumn({ name: 'cod_despesa' })
    despesas: Despesas;
}

export default Movimentos;