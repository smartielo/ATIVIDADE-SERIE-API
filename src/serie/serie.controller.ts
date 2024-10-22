import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { listaSerieDTO } from "./dto/listaSerie.dto";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { SerieService } from "./serie.service";
import { SERIE } from "./serie.entity";
import { CriaSerieDTO } from "./dto/criaSerie.dto";
import { AlteraSerieDTO } from "./dto/atualizaSerie.dto";

@ApiTags('Serie')
//decorator responsável por definir que essa classe é um controller, dentro do parenteses é necessário informar o URL desse controller
@Controller('/series')
export class SerieController{
    //controller com injeção de dependencia da classe de usuários armazenados
    constructor(private readonly serieService: SerieService){
    }

    //POST - Recebe dados, pode ou não retornar informações, mas em geral recebe dados e retorna uma resposta
    //GET - Recebe apenas parametros, mas retorna dados variados, normalmente utilizado para consulta de dados
    //PUT - recebe dados, utilizado para fazer alterações de registros
    //DELETE - recebe dados, utilizado para remover registros ----


    @Post()//essa linha, seria um decorator para definir que a função é um metodo POST
    //Para receber dados do body da requisição, deve utilizar o decorator de "Body", especificando depois a variavel
    @ApiCreatedResponse({ description:'Retorna que houve sucesso na inclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async criaSerie(@Body() dadosSerie: CriaSerieDTO): Promise <RetornoCadastroDTO>{       
        //criação do objeto de usuário, aqui é criado um objeto específico desse usuário 
        
        //gravação do usuário, aqui é inserido no DM o usuário criado anteriormente
        var retorno = this.serieService.inserir(dadosSerie);                       
        return retorno        
    }

    @Put('/:id')//linha que define o método vai ser de alteração (put), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na alteração'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na alteração.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async alteraSerie(@Body() dadosNovos: AlteraSerieDTO,@Param('id') id: string){//aqui é definido que vai receber dados tanto do body quanto da URL(param)
        //aqui é chamada a função de alteração de usuário, onde ja é feita toda a modificação do usuário
        var retornoAlteracao = this.serieService.alterar(id,dadosNovos)
        //criação do padrão de retorno   
        return retornoAlteracao;       
        
    }

    @Delete('/ID:id')//linha que define o método vai ser de exclusão (delete), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na exclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na exclusão.'})
    async removeSerie(@Param('id') id: string){//aqui é definido que vai receber dados da URL(param)
        //aqui é chamada a função de exclusão de usuário, onde ja é feita toda a exclusão do usuário
        var retornoExclusao = await this.serieService.remover(id)   
        return retornoExclusao;               
    }

    @Get('/:ID')//criação de método GET, para retornar usuários filtrados pelo ID, onde é necessário passar o ID do usuário pelo url 
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na consulta.'})
    async retornaSerieId(@Param('ID') ID:string){
        //aqui é feita a pesquisa do filme, depois é criado mapeado os dados desse usuário para um retorno padrão (lista filme DTO)
        var seriesListados = await this.serieService.Compartilhar(ID);
        return {
                Serie: seriesListados
            };
    }

    @Get()//aqui é criado um método GET sem nenhum tipo de recepção de dados, onde é retornada uma lista de uusários
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    async retornaFilme(): Promise <listaSerieDTO[]>{
        //Aqui são pesquisados os usuários a serem listados, depois é feito um mapeamento de dados para retornar as informações no padrão de resposta esperado (listaFilmeDTO)
        return this.serieService.listar();
    }

}