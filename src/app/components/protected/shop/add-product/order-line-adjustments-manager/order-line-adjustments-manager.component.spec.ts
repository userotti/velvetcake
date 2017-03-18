/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderLineAdjustmentsManagerComponent } from './order-line-adjustments-manager.component';

describe('OrderLineAdjustmentsManagerComponent', () => {
  let component: OrderLineAdjustmentsManagerComponent;
  let fixture: ComponentFixture<OrderLineAdjustmentsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLineAdjustmentsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLineAdjustmentsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
