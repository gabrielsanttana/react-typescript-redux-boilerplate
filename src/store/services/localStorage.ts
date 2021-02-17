import {fromJS} from 'immutable';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('applicationState');

    if (serializedState === null) {
      return undefined;
    }

    return fromJS(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  const selectedSlices = ['authentication', 'router'];

  try {
    const selectedState = state.filter((v: any, k: any) =>
      selectedSlices.includes(k),
    );
    const serializedState = JSON.stringify(selectedState.toJS());
    localStorage.setItem('applicationState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};
