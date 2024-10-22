import { GENERO } from "src/genero/genero.entity";
import { PESSOA } from "src/pessoa/pessoa.entity";
import { SERIE } from "src/serie/serie.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn,OneToOne } from "typeorm";

@Entity()
export class FILME{
    
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    NOME: string;

    @Column('int')
    DURACAO: number;

    @Column({length: 255})
    SINOPSE: string;
    
    @Column({length: 255})
    ANO: string;
    
    @ManyToOne(() => GENERO, genero => genero.filmes)
    @JoinColumn({ name: 'IDGENERO', referencedColumnName: 'ID' })
    genero: GENERO;

   @OneToOne(() => SERIE, serie => serie.filmes)
    @JoinColumn({ name: 'IDFILME', referencedColumnName:'ID'})
    serie: SERIE;


    @ManyToMany(
        () => PESSOA,
        ator => ator.filmes,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
      )
    atores?: PESSOA[];
}