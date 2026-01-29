import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FuncaoDTO, SobrescreverFuncaoDTO } from '../models/funcao.model';
import { PaginaDTO } from '@shared-ui';

@Injectable({
  providedIn: 'root',
})
export class FuncaoService {
  private http = inject(HttpClient);
  // proxied
  private apiUrl = '/api/funcoes';

  getAllFuncoes(params?: { pagina?: number; tamanhoPagina?: number }) {
    return this.http.get<PaginaDTO<FuncaoDTO>>(this.apiUrl, { params });
  }

  getFuncoesDropdown(): Observable<FuncaoDTO[]> {
    return this.http
      .get<PaginaDTO<FuncaoDTO>>(this.apiUrl)
      .pipe(map(res => res.conteudo));
  }

  getOneFuncao(id: string): Observable<FuncaoDTO> {
    return this.http.get<FuncaoDTO>(`${this.apiUrl}/${id}`);
  }

  createFuncao(funcao: SobrescreverFuncaoDTO): Observable<FuncaoDTO> {
    return this.http.post<FuncaoDTO>(this.apiUrl, funcao);
  }

  updateFuncao(
    idFuncao: string,
    funcao: SobrescreverFuncaoDTO
  ): Observable<FuncaoDTO> {
    return this.http.put<FuncaoDTO>(`${this.apiUrl}/${idFuncao}`, funcao);
  }

  deleteFuncao(id: string): Observable<FuncaoDTO> {
    return this.http.delete<FuncaoDTO>(`${this.apiUrl}/${id}`);
  }

  adicionarUsuarioAFuncao(
    funcaoId: string,
    usuariosIds: string[]
  ): Observable<FuncaoDTO> {
    return this.http.patch<FuncaoDTO>(
      `${this.apiUrl}/${funcaoId}/usuarios/adicionar`,
      usuariosIds
    );
  }

  removerUsuarioDeFuncao(
    funcaoId: string,
    usuariosIds: string[]
  ): Observable<FuncaoDTO> {
    return this.http.patch<FuncaoDTO>(
      `${this.apiUrl}/${funcaoId}/usuarios/remover`,
      usuariosIds
    );
  }
}
