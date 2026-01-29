export interface DataTableColumn<T = any> {
  key: string;
  header: string;
  cell?: (row: T) => any;
  align?: 'left' | 'right' | 'center';
}
