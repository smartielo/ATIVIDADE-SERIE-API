import { FILME } from "src/filmes/filme.entity";
import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from "typeorm";

@Entity()
export class SERIE {
    @PrimaryColumn()
    ID: string;

    @Column({ length: 255 })
    NOMESERIE: string;

    @Column({ length: 255 })
    TEMPORADA: string;

    @Column({ length: 255 })
    EPISODIO: string;

    @OneToOne(() => FILME, filme => filme.serie)
    @JoinColumn({ name: 'IDFILME', referencedColumnName: 'ID' })
    filmes: FILME;

    // Método para acessar o nome do gênero
    getGenero(): string {
        return this.filmes?.genero?.NOME;
    }
}

