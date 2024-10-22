//classe de modulo do aplicativo, responsável por administrar todos os modulos da aplicação

import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { FilmeModule } from './filmes/filme.module';
import { GeneroModule } from './genero/genero.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { FilesModule } from './files/files.module';
import { SerieModule } from './serie/serie.module';



@Module({
  imports: [UsuarioModule,FilmeModule,PessoaModule,SerieModule,GeneroModule,FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
