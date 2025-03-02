import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhaleTxCardComponent } from './whale-tx-card.component';

describe('WhaleTxCardComponent', () => {
  let component: WhaleTxCardComponent;
  let fixture: ComponentFixture<WhaleTxCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhaleTxCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhaleTxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
