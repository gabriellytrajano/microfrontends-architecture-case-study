import { PermissaoDTO } from './permissao-dto';

export interface RecursoDTO {
  id: string;
  nome: string;
  descricao: string;
  permissoes: PermissaoDTO[];
}

export interface CriarOuSobrescreverRecursoDTO {
  nome: string;
  descricao: string;
  idsPermissoes: string[];
}
