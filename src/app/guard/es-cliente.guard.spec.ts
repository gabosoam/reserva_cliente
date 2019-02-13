import { TestBed, async, inject } from '@angular/core/testing';

import { EsClienteGuard } from './es-cliente.guard';

describe('EsClienteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsClienteGuard]
    });
  });

  it('should ...', inject([EsClienteGuard], (guard: EsClienteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
