import { RegistrationField } from '../models';
import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { RegistrationState } from '.';

export const registrationFeatureKey = 'register';

const getRegistrationFields = (state: RegistrationState.State): RegistrationField[] => state.registrationFields;

const getRegistrationLoading = (state: RegistrationState.State): boolean => state.loading;

const getRegistrationError = (state: RegistrationState.State): string => state.error;

const selectRegistrationInfo: MemoizedSelector<
  object,
  RegistrationState.State
> = createFeatureSelector<RegistrationState.State>(registrationFeatureKey);


export const selectRegistrationFields: MemoizedSelector<
object,
RegistrationField[]
> = createSelector(selectRegistrationInfo, getRegistrationFields);

export const selectRegistrationLoading: MemoizedSelector<
object,
boolean
> = createSelector(selectRegistrationInfo, getRegistrationLoading);

export const selectRegistrationError: MemoizedSelector<
object,
string
> = createSelector(selectRegistrationInfo, getRegistrationError);
