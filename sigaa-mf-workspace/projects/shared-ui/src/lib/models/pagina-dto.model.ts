export interface PaginaDTO<T> {
  conteudo: T[];
  pagina: number;
  tamanhoPagina: number;
  total: number;
  totalPaginas: number;
}
