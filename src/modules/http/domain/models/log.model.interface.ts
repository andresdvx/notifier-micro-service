export interface ILogPayload {
  service: string;
  type: string;
  payload: {
    emailPayload: {
      to: string;
      type: string;
      content: string | Record<string, any>;
    };
    typeNotifacion: string;
  };
}
