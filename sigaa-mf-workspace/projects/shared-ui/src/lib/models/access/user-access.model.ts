import { Papel } from './papel.model';

export interface UserAccess {
  papel: Papel;
  permissoes: string[];
}
