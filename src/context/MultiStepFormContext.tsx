import { createContext, useReducer } from 'react';

type ProviderProps<T extends string> = {
  children: React.ReactNode;
  steps: T[];
  initialState: {
    currentStep: { [P in keyof T]: T[P] };
    formData: {
      [key in keyof T]?: object;
    };
  };
};

export type FormDataProps<T extends string> =
  ProviderProps<T>['initialState']['formData'];

type FormState<T> = {
  currentStep: T;
  formData: object;
};

type Action =
  | { type: 'SET_CURRENT_STEP'; payload: string }
  | {
      type: 'SET_STEP_DATA';
      payload: {
        step: string;
        data: object;
      };
    };

const defaultState = {
  currentStep: 'default',
  formData: {},
};

const MultiStepFormContext = createContext({
  ...defaultState,
  setCurrentStep: (step: string) => {},
  setStepData: ({ step, formData }: { step: string; formData: object }) => {},
});

const reducer = <T, _>(state: FormState<T>, action: Action) => {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      localStorage.setItem(
        'formState',
        JSON.stringify({
          ...state,
          currentStep: action.payload,
        })
      );

      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_STEP_DATA': {
      const newState = {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.step]: action.payload.data,
        },
      };
      localStorage.setItem('formState', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};

export const MultiStepFormProvider = <T extends string, _>({
  children,
  steps,
  initialState,
}: ProviderProps<T>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MultiStepFormContext.Provider
      value={{
        currentStep: state.currentStep as T,
        formData: state.formData as FormDataProps<T>,
        setCurrentStep: (step: string) =>
          dispatch({ type: 'SET_CURRENT_STEP', payload: step }),

        setStepData: ({ step, formData }) =>
          dispatch({
            type: 'SET_STEP_DATA',
            payload: {
              step,
              data: formData,
            },
          }),
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepFormContext;
