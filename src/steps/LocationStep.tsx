import { FormDataProps } from '../context/MultiStepFormContext';
import { useForm } from 'react-hook-form';
import React from 'react';
import { isEqual, omit } from 'lodash';

interface LocationStepProps<T extends string> {
  initialData: FormDataProps<T>;
  onContinue: (values: object) => void;
}

const LocationStep = <T extends string, _>({
  initialData,
  onContinue,
}: LocationStepProps<T>) => {
  console.log('initialData STep 1', initialData);

  const methods = useForm({
    defaultValues: initialData,
  });
  return (
    <>
      <h2>Step 1</h2>
      <input
        type="text"
        placeholder="Type your location"
        {...methods.register('location')}
      />
      <button onClick={() => onContinue(methods.getValues())}>Continue</button>
    </>
  );
};

const compareProps = (
  prevProps: Readonly<LocationStepProps<string>>,
  nextProps: Readonly<LocationStepProps<string>>
) => isEqual(omit(prevProps, 'onContinue'), omit(nextProps, 'onContinue'));

export default React.memo(LocationStep, compareProps);
