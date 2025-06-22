import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab8Page } from './tab8.page';

describe('Tab8Page', () => {
  let component: Tab8Page;
  let fixture: ComponentFixture<Tab8Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab8Page]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab8Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
