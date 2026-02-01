import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, switchMap, Observable, of, tap } from 'rxjs';
import { User, PaginaDTO } from '@shared-ui';
import { UpdateUserPayload, UsuarioDTO } from '../models/user.model';
import { Funcao } from 'projects/mf-access-control/src/models/funcao.model';
import { FuncaoService } from 'projects/mf-access-control/src/service/funcao.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = '/api/professor';

  constructor(
    private http: HttpClient,
    private funcaoService: FuncaoService
  ) {}

  private montarUser(user: UsuarioDTO): Observable<User> {
    return this.http
      .get<Funcao[]>(`/api/funcoes/usuario/${user.id}`)
      .pipe(map(funcoes => this.mapToUser(user, funcoes)));
  }

  list(
    page: number,
    size: number,
    search?: string
  ): Observable<{ items: User[]; total: number }> {
    let params = new HttpParams().set('page', page - 1).set('size', size);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginaDTO<UsuarioDTO>>(this.apiUrl, { params }).pipe(
      switchMap(res => {
        if (!res.conteudo.length) {
          return of({
            items: [],
            total: res.total,
          });
        }
        return forkJoin(
          res.conteudo.map(user => {
            return this.montarUser(user);
          })
        ).pipe(
          map(users => ({
            items: users,
            total: res.total,
          }))
        );
      })
    );
  }

  deletar(cpf: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cpf}`);
  }

  atualizar(cpf: number, payload: UpdateUserPayload): Observable<UsuarioDTO> {
    let updateUserPayload: Omit<UpdateUserPayload, 'papel'> = {
      cpfCnpj: payload.cpfCnpj,
      nome: payload.nome,
      email: payload.email,
    };
    return this.http
      .put<UsuarioDTO>(`${this.apiUrl}/${payload.cpfCnpj}`, updateUserPayload)
      .pipe(
        tap(usuario => {
          this.funcaoService.adicionarUsuarioAFuncao(payload.papel, [
            usuario.id,
          ]);
        })
      );
  }

  private mapToUser(api: UsuarioDTO, funcoes: Funcao[]): User {
    return {
      id: api.id,
      cpf: api.cpfCnpj,
      name: api.nome,
      email: api.email,
      papel: funcoes[0]?.nome ?? '',
    };
  }

  getByCpf(cpf: number): Observable<User> {
    return this.http
      .get<UsuarioDTO>(`${this.apiUrl}/${cpf}`)
      .pipe(switchMap(api => this.montarUser(api)));
  }
}
