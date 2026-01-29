import { Permissao } from './permissao.model';

export default interface Recurso {
  id: string;
  nome: string;
  descricao: string;
  permissoes: Permissao[];
}
