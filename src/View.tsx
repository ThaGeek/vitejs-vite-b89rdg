import React, { useContext } from 'react';
import MultiStepFormContext from './context/MultiStepFormContext';
import LocationStep from './steps/LocationStep';
import PersonalInformationStep from './steps/PersonalInformationStep';
const View = () => {
  const { currentStep, formData, ...context } =
    useContext(MultiStepFormContext);
  return (
    <>
      {currentStep === 'location' && (
        <LocationStep
          // @ts-ignore
          initialData={formData['location']}
          onContinue={(values: object) => {
            context.setStepData({ step: 'location', formData: values });
            context.setCurrentStep('personalInfo');
          }}
        />
      )}
      {currentStep === 'personalInfo' && (
        <PersonalInformationStep
          // @ts-ignore
          initialData={formData['personalInfo']}
          onBack={() => {
            context.setCurrentStep('location');
          }}
        />
      )}
    </>
  );
};

export default React.memo(View);
