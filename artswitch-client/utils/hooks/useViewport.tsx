import React from "react";

const useViewPort = (): number => {
  const [viewport, setViewport] = React.useState<number>(0);

  const handleResize = (): void => {
    if (typeof window !== "undefined") setViewport(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewport]);

  return viewport;
};

export default useViewPort;
