import React from "react";
import { store } from "app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

type TLayoutProps = "redux" | "react-query" | "redux-react-query";

const ReactQueryReduxWrapper = ({
  component,
}: {
  component: React.ReactNode;
}) => {
  const queryClient = new QueryClient({});

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </Provider>
  );
};

const ReactQueryWrapper = ({ component }: { component: React.ReactNode }) => {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

export const getTestLayout = (component: JSX.Element, type?: TLayoutProps) => {
  switch (type) {
    case "redux":
      return <Provider store={store}>{component}</Provider>;
    case "react-query":
      return <ReactQueryWrapper component={component} />;
    case "redux-react-query":
      return <ReactQueryReduxWrapper component={component} />;
    default:
      return component;
  }
};
