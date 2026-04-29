import { useEffect, useReducer } from 'react';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

function reducer(state, action) {
  if (action.type === 'loading') {
    return { ...state, loading: true, error: null };
  }

  if (action.type === 'success') {
    return { data: action.payload, loading: false, error: null };
  }

  if (action.type === 'error') {
    return { ...state, loading: false, error: action.payload };
  }

  return state;
}

export function useFetch(fn, deps = [], options = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;

    dispatch({ type: 'loading' });
    fn()
      .then((res) => {
        // Ignora respuestas tardias despues de desmontar el componente.
        if (!cancelled) {
          if (options.onSuccess) options.onSuccess(res);
          dispatch({ type: 'success', payload: res });
        }
      })
      .catch((err) => {
        if (!cancelled) dispatch({ type: 'error', payload: err });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
