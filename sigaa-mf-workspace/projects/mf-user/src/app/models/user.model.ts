import { UserAccess } from '@shared-ui';

export interface User {
  cpfCnpj: number;
  nome: string;
  email: string;
  idInstitucional: number;
  idUnidade: number;
  idDocente: number;
  sexo: string;
  nomeIdentificacao: string;
  siape: number;
  digitoSiape: string;
  idAtivo: number;
  idSituacao: number;
  unidade: string;
  cargo: string;
  idCargo: number;
  regimeDeTrabalho: number;
  cargoFormal: string;
  dataDeAdmissao: number;

  access?: UserAccess;
}

export interface UsuarioDTO {
  id: string;
  cpfCnpj: number;
  nome: string;
  email: string;
  idInstitucional: number;
  idUnidade: number;
  idDocente: number;
  sexo: string;
  nomeIdentificacao: string;
  siape: number;
  digitoSiape: string;
  idAtivo: number;
  idSituacao: number;
  unidade: string;
  cargo: string;
  idCargo: number;
  regimeDeTrabalho: number;
  cargoFormal: string;
  dataDeAdmissao: number;
}

export interface UpdateUserPayload {
  cpfCnpj: number;
  nome: string;
  email: string;
  papel: string;
}
