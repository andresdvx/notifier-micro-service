export interface IEmailPayload {
  to: string;
  payload: Record<string, any>;
  type: 'welcome' | 'transaction';
}
