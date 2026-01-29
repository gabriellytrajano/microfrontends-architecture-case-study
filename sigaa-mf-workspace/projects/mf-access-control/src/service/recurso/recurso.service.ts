import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PermissaoService } from '../permissao.service';
import { CriarOuSobrescreverRecursoDTO, RecursoDTO } from './dtos/recurso-dto';
import Recurso from '../../models/recurso.model';
import { PaginaDTO } from '../../../../shared-ui/src/lib/models/pagina-dto.model';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  private http = inject(HttpClient);
  private permissaoService = inject(PermissaoService);
  private apiUrl = '/api/recursos';

  constructor() {}

  public buscarTodosRecursos(): Observable<Recurso[]> {
    return this.http
      .get<PaginaDTO<RecursoDTO>>(this.apiUrl + '?tamanhoPagina=10000')
      .pipe(map(pagina => pagina.conteudo));
  }

  public buscarRecurso(id: string): Observable<Recurso> {
    return this.http.get<RecursoDTO>(`${this.apiUrl}/${id}`);
  }

  public removerRecurso(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public atualizarRecurso(
    id: string,
    recursoAtualizado: Recurso
  ): Observable<Recurso> {
    let permissoesIDs = recursoAtualizado.permissoes.map(p => p.id);
    let recursoDto: CriarOuSobrescreverRecursoDTO = {
      descricao: recursoAtualizado.descricao,
      nome: recursoAtualizado.nome,
      idsPermissoes: permissoesIDs,
    };
    return this.http.put<RecursoDTO>(`${this.apiUrl}/${id}`, recursoDto);
  }
}
