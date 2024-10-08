import { useCallback, useState } from "react";

const getLocalStorageValue = (key: string, initValue: string) => {
  if (typeof window === "undefined") return "";

  const item = localStorage.getItem(key);

  return item ? item : initValue;
};

export const useLocalStorage = (key: string, initValue: string) => {
  const [value, setValue] = useState(() =>
    getLocalStorageValue(key, initValue),
  );

  const setLocalStorageValue = useCallback(
    (setStateAction: string | ((prevState: string) => string)) => {
      if (typeof window === "undefined") return "";

      const newValue =
        setStateAction instanceof Function
          ? setStateAction(value)
          : setStateAction;

      localStorage.setItem(key, newValue);
      setValue(() => newValue);
    },
    [key, value],
  );

  return [value, setLocalStorageValue] as const;
};
