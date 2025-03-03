interface IResponseHandler {
  message: string;
  error: string;
  statusCode: number;
}

export const ResponseHandler = ({
  message,
  error,
  statusCode,
}: IResponseHandler) => {
  return {
    message,
    error,
    statusCode,
  };
};
