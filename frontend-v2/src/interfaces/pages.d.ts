interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
}

export { ErrorResponse };
