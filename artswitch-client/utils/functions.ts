import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { TSingleMessage } from "./services/typings/messages";
import { GetServerSidePropsResult } from "next";

type TErrorType = "authorization" | "not-found" | "server" | "custom";

const randomNum = () => Math.floor(Math.random() * 1000);

const generateAPIError = (status: number | string, err: AxiosError) => {
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

const buildErrorResponse = (
  errorType: TErrorType,
  error?: AxiosError
): GetServerSidePropsResult<any> => {
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
        notFound: true,
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

const getUser = (user: string, record: TSingleMessage["chat"]["users"]) => {
  return record?.filter(record => record._id !== user)[0]?.name;
};

const getChatData = (user: string, record: any[], check: string) => {
  return record?.filter(record => record[check] !== user)[0];
};

const clearUserToken = () => Cookies.remove("_token");

export { generateAPIError, clearUserToken, randomNum, getUser, getChatData };
