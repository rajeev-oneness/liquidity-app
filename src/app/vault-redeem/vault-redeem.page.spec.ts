import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VaultRedeemPage } from './vault-redeem.page';

describe('VaultRedeemPage', () => {
  let component: VaultRedeemPage;
  let fixture: ComponentFixture<VaultRedeemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultRedeemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultRedeemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
