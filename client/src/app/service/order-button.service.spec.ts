import { TestBed } from '@angular/core/testing';

import { OrderButtonService } from './order-button.service';

describe('OrderButtonService', () => {
  let service: OrderButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
