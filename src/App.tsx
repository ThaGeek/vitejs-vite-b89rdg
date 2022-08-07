import { useState } from 'react';
import './App.css';

import View from './View';
import {
  FormState,
  MultiStepFormProvider,
} from './context/MultiStepFormContext';

type Steps = 'location' | 'personalInfo';

const getInitialState = (): FormState<Steps> => {
  let formState = window.localStorage.getItem('formState');

  if (formState) {
    return JSON.parse(formState);
  }
  return {
    currentStep: 'location',
    formData: {},
  };
};
function App() {
  console.log('formState from localStorage', getInitialState());
  return (
    <MultiStepFormProvider<Steps> initialState={getInitialState()}>
      <View />
    </MultiStepFormProvider>
  );
}

export default App;
