import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodItemCartPage } from './food-item-cart.page';

describe('FoodItemCartPage', () => {
  let component: FoodItemCartPage;
  let fixture: ComponentFixture<FoodItemCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodItemCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodItemCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
