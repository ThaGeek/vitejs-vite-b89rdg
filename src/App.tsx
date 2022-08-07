import { useState } from 'react';
import './App.css';

import { useForm, FormProvider } from 'react-hook-form';
import View from './View';
import { MultiStepFormProvider } from './context/MultiStepFormContext';
function App() {
  let formState = window.localStorage.getItem('formState');

  if (formState) {
    formState = JSON.parse(formState);
  }

  console.log('formState from localStorage', formState);
  return (
    <MultiStepFormProvider
      steps={['location', 'personalInfo']}
      initialState={
        formState ?? {
          currentStep: 'location',
          formData: {
            location: {
              location: 'test',
            },
          },
        }
      }
    >
      <View />
    </MultiStepFormProvider>
  );
}

export default App;
