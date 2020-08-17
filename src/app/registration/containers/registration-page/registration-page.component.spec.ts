import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationSelectors, RegistrationActions, RegistrationState } from '../../store';
import { RegistrationFormService } from '../../services';
import { RegistrationFormComponent } from '../../components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/shared/components';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let store: MockStore<RegistrationState.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        RegistrationPageComponent,
        RegistrationFormComponent,
        LoadingSpinnerComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: RegistrationSelectors.selectRegistrationFields, value: [] },
            { selector: RegistrationSelectors.selectRegistrationLoading, value: true },
            { selector: RegistrationSelectors.selectRegistrationError, value: '' }
          ]
        }),
        RegistrationFormService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject<any>(Store);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a RegistrationActions.GetRegistrationFieldsAction action on init', () => {
    component.ngOnInit();

    const action = new RegistrationActions.GetRegistrationFieldsAction();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
