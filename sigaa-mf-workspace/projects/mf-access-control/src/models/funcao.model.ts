import { Permissao } from '@shared-ui';

export interface Funcao {
  id: string;
  nome: string;
  descricao: string;
  usuarioIds: string[];
  permissaoIds: string[];
}

export interface FuncaoDTO {
  id: string;
  nome: string;
  descricao: string;
  usuarioIds: string[];
  permissoes: Permissao[];
}

export interface SobrescreverFuncaoDTO {
  nome: string;
  descricao: string;
  usuarioIds: string[];
  permissaoIds: string[];
}
