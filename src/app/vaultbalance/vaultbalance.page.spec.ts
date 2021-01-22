import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VaultbalancePage } from './vaultbalance.page';

describe('VaultbalancePage', () => {
  let component: VaultbalancePage;
  let fixture: ComponentFixture<VaultbalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultbalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultbalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
