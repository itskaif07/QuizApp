import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SltCtgComponent } from './slt-ctg.component';

describe('SltCtgComponent', () => {
  let component: SltCtgComponent;
  let fixture: ComponentFixture<SltCtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SltCtgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SltCtgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
