import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VaultcomparePage } from './vaultcompare.page';

describe('VaultcomparePage', () => {
  let component: VaultcomparePage;
  let fixture: ComponentFixture<VaultcomparePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultcomparePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultcomparePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
