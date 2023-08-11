import React from "react";

type Props = {
  value: string;
  delay: number;
};

const useDebounce = ({ value, delay }: Props) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [value, delay]);

  return { debouncedValue };
};

export default useDebounce;
