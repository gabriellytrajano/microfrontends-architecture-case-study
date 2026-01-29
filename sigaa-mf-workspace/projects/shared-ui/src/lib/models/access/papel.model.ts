import { Permissao } from './permissao.model';

export interface Papel {
  id: string;
  nome: string;
  descricao?: string;
  permissoes: Permissao[];
}
