import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SerieController } from './serie.controller';
import { serieProviders } from './serie.provider';
import { SerieService } from './serie.service';
import { filmeProviders } from './../filmes/filme.providers';
import { generoProviders } from 'src/genero/genero.provider';
import { GeneroService } from 'src/genero/genero.service';
import { FilmeService } from './../filmes/filme.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { pessoaProviders } from 'src/pessoa/pessoa.providers';
import { filme_pessoaProviders } from 'src/filme_pessoa/filme_pessoa.providers';
import { FILME_PESSOAService } from 'src/filme_pessoa/filme_pessoa.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SerieController],
  providers: [
    ...serieProviders,
    SerieService,
    ...filmeProviders,
     FilmeService,
     ...pessoaProviders,
     PessoaService,
     ...filme_pessoaProviders,
     FILME_PESSOAService,
     ...generoProviders,
     GeneroService,
  ],
})
export class SerieModule {}