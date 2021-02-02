import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutletOrderingMenuPage } from './outlet-ordering-menu.page';

describe('OutletOrderingMenuPage', () => {
  let component: OutletOrderingMenuPage;
  let fixture: ComponentFixture<OutletOrderingMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletOrderingMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutletOrderingMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
