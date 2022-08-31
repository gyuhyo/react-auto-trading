import { useEffect, useRef, useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// S is the RootState. If used with reselect, it can be derived. Otherwise, it could also initialized here with S = RootState
export function useDebouncedSelector(selector, time = 300, equalityFn) {
  const useAppSelector = useSelector;
  const [state, setState] = useState({ data: undefined });
  const result = useRef();
  const data = useAppSelector(selector, equalityFn);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (result.current !== data) {
        result.current = data;
        setState({ data });
      }
    }, time);

    return () => clearTimeout(handler);
  }, [data, time]);

  return state.data;
}
