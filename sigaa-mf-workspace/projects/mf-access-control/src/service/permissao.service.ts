import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissao } from '../models/permissao.model';
import { PaginaDTO } from '@shared-ui';

@Injectable({
  providedIn: 'root',
})
export class PermissaoService {
  private http = inject(HttpClient);
  private apiUrl = '/api/permissoes';

  getAllPermissoes(): Observable<PaginaDTO<Permissao>> {
    return this.http.get<PaginaDTO<Permissao>>(
      `${this.apiUrl}?tamanhoPagina=10000`
    );
  }

  getOnePermissao(id: string): Observable<Permissao> {
    return this.http.get<Permissao>(`${this.apiUrl}/${id}`);
  }

  createPermissao(permissao: Permissao): Observable<Permissao> {
    return this.http.post<Permissao>(this.apiUrl, permissao);
  }

  updatePermissao(id: string, permissao: Permissao): Observable<Permissao> {
    return this.http.put<Permissao>(`${this.apiUrl}/${id}`, permissao);
  }

  deletePermissao(id: string): Observable<Permissao> {
    return this.http.delete<Permissao>(`${this.apiUrl}/${id}`);
  }
}
