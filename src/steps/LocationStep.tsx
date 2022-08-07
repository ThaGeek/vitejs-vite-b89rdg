import { useForm } from 'react-hook-form';
import React from 'react';
import { isEqual, omit } from 'lodash';

interface LocationStepProps {
  initialData: {
    position: object;
  };
  onContinue: (values: object) => void;
}

const LocationStep = ({ initialData, onContinue }: LocationStepProps) => {
  const methods = useForm({
    defaultValues: initialData,
  });
  return (
    <>
      <h2>Step 1</h2>
      <input
        type="text"
        placeholder="Type your location"
        {...methods.register('position')}
      />
      <button onClick={() => onContinue(methods.getValues())}>Continue</button>
    </>
  );
};

const compareProps = (
  prevProps: Readonly<LocationStepProps>,
  nextProps: Readonly<LocationStepProps>
) => isEqual(omit(prevProps, 'onContinue'), omit(nextProps, 'onContinue'));

export default React.memo(LocationStep, compareProps);
