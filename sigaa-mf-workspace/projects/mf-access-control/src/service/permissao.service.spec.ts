import { TestBed } from '@angular/core/testing';

import { PermissaoService } from './permissao.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('PermissaoService', () => {
  let service: PermissaoService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTest = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PermissaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllPermissoes should make GET request', async () => {
    const dataPromise = firstValueFrom(service.getAllPermissoes());

    const req = httpTest.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/permissoes',
    });

    req.flush([]);

    expect(await dataPromise).toEqual([]);
  });

  it('#getOnePermissao should make GET request', async () => {
    const dataPromise = firstValueFrom(service.getOnePermissao('perm_1'));

    const req = httpTest.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/permissoes/perm_1',
    });

    const obj = { id: 'perm_1', nome: 'perm_1', descricao: 'descricao' };

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });

  it('#createPermissao should make POST request with body', async () => {
    const obj = { id: 'perm_2', nome: 'perm_2', descricao: 'descricao' };

    const dataPromise = firstValueFrom(service.createPermissao(obj));

    const req = httpTest.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/permissoes',
    });
    expect(req.request.body).toBeDefined();

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });

  it('#updatePermissao should make PUT request with body', async () => {
    const obj = { id: 'perm_1', nome: 'perm_1', descricao: 'descricao nova' };

    const dataPromise = firstValueFrom(service.updatePermissao('perm_1', obj));

    const req = httpTest.expectOne({
      method: 'PUT',
      url: 'http://localhost:3000/permissoes/perm_1',
    });
    expect(req.request.body).toBeDefined();

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });

  it('#deletePermissao should make DELETE request', async () => {
    const obj = { id: 'perm_1', nome: 'perm_1', descricao: 'descricao' };

    const dataPromise = firstValueFrom(service.deletePermissao('perm_1'));

    const req = httpTest.expectOne({
      method: 'DELETE',
      url: 'http://localhost:3000/permissoes/perm_1',
    });

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });
});
