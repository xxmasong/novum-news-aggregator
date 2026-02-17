import { useReducer, useCallback } from 'react';

type UseInputsAction = {
  name: string;
  value: string;
};

function reducer<T extends object>(state: T, action: UseInputsAction | null) {
  if (!action) {
    const initialState: any = {};
    Object.keys(state).forEach(key => {
      initialState[key] = '';
    });
    return initialState;
  }
  
  return {
    ...state,
    [action.name]: action.value,
  };
}
export default function useInputs<T extends object>(defaultValues: T) {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  const onReset = useCallback(() => {
    dispatch(null);
  }, []);

  return [state, onChange, onReset, dispatch] as [
    T,
    typeof onChange,
    typeof onReset,
    typeof dispatch
  ];
}
