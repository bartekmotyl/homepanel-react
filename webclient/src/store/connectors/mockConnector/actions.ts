export const GENERATE_MOCK_STATE = 'GENERATE_MOCK_STATE';

export const doMock = () => (dispatch, getState) => {
  dispatch({ type: GENERATE_MOCK_STATE });
  setTimeout(() => dispatch(doMock()), 1000);
};
