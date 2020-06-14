import { ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from 'types';

export const GENERATE_MOCK_STATE = 'GENERATE_MOCK_STATE';

interface GenerateMockStateAction {
  type: typeof GENERATE_MOCK_STATE;
}

export const doMock = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  dispatch({ type: GENERATE_MOCK_STATE });
  setTimeout(() => dispatch(doMock()), 1000);
};

export type MockConnectorActionTypes = GenerateMockStateAction;
