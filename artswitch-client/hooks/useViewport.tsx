import { useEffect, useState } from "react";

const useViewPort = (): number => {
  const [viewport, setViewport] = useState<number>(window.innerWidth);

  const handleResize = (): void => {
    setViewport(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewport]);

  return viewport;
};

export default useViewPort;
