import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CriaSerieDTO{
    @IsString()
    @IsNotEmpty({message: "Nome da serie não pode ser vazio"})
    NOMESERIE: string;

    @IsString()
    @IsNotEmpty({message: "Temporada não pode ser vazio"})
    TEMPORADA: string;

    @IsString()
    @IsNotEmpty({message: "Episodio não pode ser vazio"})
    EPISODIO: string;
}