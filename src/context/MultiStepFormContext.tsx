import { createContext, useReducer } from 'react';

type Action =
  | { type: 'SET_CURRENT_STEP'; payload: string }
  | {
      type: 'SET_STEP_DATA';
      payload: {
        step: string;
        data: object;
      };
    };

interface ProviderProps<T extends string> extends FormState<T> {
  children: React.ReactNode;
  initialState: FormState<T>;
}

export type FormState<T extends string> = {
  currentStep: T;
  formData: {
    [key in T]?: object;
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

const reducer = <T extends string, _>(state: FormState<T>, action: Action) => {
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

export const MultiStepFormProvider = <T extends string>({
  children,
  initialState,
}: ProviderProps<T>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MultiStepFormContext.Provider
      value={{
        currentStep: state.currentStep,
        formData: state.formData,
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
