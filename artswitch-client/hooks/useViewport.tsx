import React from "react";

const useViewPort = (): number => {
  const [viewport, setViewport] = React.useState<number>(window.innerWidth);

  const handleResize = (): void => setViewport(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewport]);

  return viewport;
};

export default useViewPort;
