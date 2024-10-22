import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { SERIE } from './serie.entity';
import { CriaSerieDTO } from './dto/criaSerie.dto';
import { AlteraSerieDTO } from './dto/atualizaSerie.dto';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';


@Injectable()
export class SerieService {
  constructor(
    @Inject('SERIE_REPOSITORY')
    private serieRepository: Repository<SERIE>,
  ) {}

  async listar(): Promise<any[]> {
    const seriesListadas = await this.serieRepository
        .createQueryBuilder('serie')
        .leftJoinAndSelect('serie.filmes', 'filme')  
        .leftJoinAndSelect('filme.genero', 'genero')  
        .select([
            'serie.ID',
            'serie.NOMESERIE',
            'serie.TEMPORADA',
            'serie.EPISODIO',
            'genero.NOME'  
        ])
        .getRawMany(); 

    return seriesListadas.map(serie => ({
        id: serie.serie_ID,
        nomeSerie: serie.serie_NOMESERIE,
        temporada: serie.serie_TEMPORADA,
        episodio: serie.serie_EPISODIO,
        nomeGenero: serie.genero_NOME 
    }));
}

  async inserir(dados: CriaSerieDTO): Promise<RetornoCadastroDTO>{
    let serie = new SERIE();
    serie.ID = uuid();
    serie.NOMESERIE = dados.NOMESERIE;
    serie.TEMPORADA = dados.TEMPORADA;

    return this.serieRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.ID,
        message: "Serie cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })
  }

  localizarID(ID: string): Promise<SERIE> {
    return this.serieRepository.findOne({
      where: {
        ID,
      },
    });
  }

  localizarNome(NOMESERIE: string): Promise<SERIE> {
    return this.serieRepository.findOne({
      where: {
        NOMESERIE,
      },
    });
  }


  async remover(id: string): Promise<RetornoObjDTO> {
    const serie = await this.localizarID(id);
    
    return this.serieRepository.remove(serie)
    .then((result) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "Serie excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: serie,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async Compartilhar(id: string){
    var serie = await (this.serieRepository 
      .createQueryBuilder('Serie')
      .select('serie.ID', 'ID')
      .addSelect('serie.NOME','NOME_SERIE')
      .addSelect('serie.SINOPSE','SINOPSE')
      .addSelect('serie.ANO','ANO')
      .andWhere('serie.ID = :ID',{ ID: `${id}` })               
      .getRawOne());

    return{            
      message: `Estou assistindo a serie ${serie.NOME_SERIE} que é do genero ${serie.GENERO} que conta a seguinte história: ${serie.SINOPSE} foi lançado em ${serie.ANO} e tem duração de ${serie.DURACAO} minutos. Assista também!!` 
    }
  }


  async alterar(id: string, dados: AlteraSerieDTO): Promise<RetornoCadastroDTO> {
    const serie = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          serie[chave] = valor;
      }
    )

    return this.serieRepository.save(serie)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: serie.ID,
        message: "Serie alterado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}