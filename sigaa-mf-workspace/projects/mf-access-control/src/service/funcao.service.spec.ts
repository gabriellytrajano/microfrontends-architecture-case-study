import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { FuncaoService } from './funcao.service';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('FuncaoService', () => {
  let service: FuncaoService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTest = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FuncaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTest.verify();
  });

  it('#getAllFuncoes should make GET request', async () => {
    const dataPromise = firstValueFrom(service.getAllFuncoes());

    const req = httpTest.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/funcoes',
    });

    req.flush([]);

    expect(await dataPromise).toEqual([]);
  });

  it('#getOneFuncao should make GET request', async () => {
    const dataPromise = firstValueFrom(service.getOneFuncao('funcao_1'));

    const req = httpTest.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/funcoes/funcao_1',
    });

    const obj = {
      id: 'funcao_1',
      nome: 'funcao_1',
      descricao: 'descricao',
      usuarioIds: [],
      permissaoIds: [],
    };

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });

  it('#createFuncao should make POST request with body', async () => {
    const obj = {
      id: 'funcao_2',
      nome: 'funcao_2',
      descricao: 'descricao',
      usuarioIds: [],
      permissaoIds: [],
    };

    const dataPromise = firstValueFrom(service.createFuncao(obj));

    const req = httpTest.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/funcoes',
    });
    expect(req.request.body).toBeDefined();

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });

  it('#updateFuncao should make PUT request with body', async () => {
    const obj = {
      id: 'funcao_1',
      nome: 'funcao_1',
      descricao: 'descricao nova',
      usuarioIds: [],
      permissaoIds: [],
    };

    const dataPromise = firstValueFrom(service.updateFuncao('funcao_1', obj));

    const req = httpTest.expectOne({
      method: 'PUT',
      url: 'http://localhost:3000/funcoes/funcao_1',
    });
    expect(req.request.body).toBeDefined();

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });

  it('#deleteFuncao should make DELETE request', async () => {
    const obj = {
      id: 'funcao_1',
      nome: 'funcao_1',
      descricao: 'descricao',
      usuarioIds: [],
      permissaoIds: [],
    };

    const dataPromise = firstValueFrom(service.deleteFuncao('funcao_1'));

    const req = httpTest.expectOne({
      method: 'DELETE',
      url: 'http://localhost:3000/funcoes/funcao_1',
    });

    req.flush(obj);

    expect(await dataPromise).toEqual(obj);
  });
});
