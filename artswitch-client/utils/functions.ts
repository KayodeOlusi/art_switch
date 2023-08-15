import { AxiosError } from "axios";

type TErrorType = "authorization" | "not-found" | "server" | "custom";

const generateAPIError = (status: number | string, err: AxiosError) => {
  console.log("status", status);

  switch (status) {
    case 401:
      return buildErrorResponse("authorization");
    case 404:
      return buildErrorResponse("not-found");
    case 500:
      return buildErrorResponse("server");
    default:
      return buildErrorResponse("custom", err);
  }
};

const buildErrorResponse = (errorType: TErrorType, error?: AxiosError) => {
  switch (errorType) {
    case "authorization":
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    case "not-found":
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    case "server":
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };

    default:
      return {
        props: {
          data: null,
          err: JSON.parse(JSON.stringify(error)),
        },
      };
  }
};

export { generateAPIError };
