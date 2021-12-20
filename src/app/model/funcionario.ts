export class FuncionarioEntity{
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    email: string;
    roles: [];

    constructor(){
        this.nome = '';
        this.usuario = '';
        this.senha = '';
        this.email = '';
        this.roles = [];
    }
}