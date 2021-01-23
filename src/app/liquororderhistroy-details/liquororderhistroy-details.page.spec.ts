import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiquororderhistroyDetailsPage } from './liquororderhistroy-details.page';

describe('LiquororderhistroyDetailsPage', () => {
  let component: LiquororderhistroyDetailsPage;
  let fixture: ComponentFixture<LiquororderhistroyDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquororderhistroyDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiquororderhistroyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
