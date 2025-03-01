import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhaleCardComponent } from './whale-card.component';

describe('WhaleCardComponent', () => {
  let component: WhaleCardComponent;
  let fixture: ComponentFixture<WhaleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhaleCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhaleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
