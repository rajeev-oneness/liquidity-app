import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiquororderhistroyPage } from './liquororderhistroy.page';

describe('LiquororderhistroyPage', () => {
  let component: LiquororderhistroyPage;
  let fixture: ComponentFixture<LiquororderhistroyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquororderhistroyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiquororderhistroyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
