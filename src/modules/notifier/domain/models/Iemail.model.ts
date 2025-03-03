export interface IEmailModel {
  to: string;
  subject: string;
  payload: string;
  template: string;
  type: 'welcome' | 'transaction'
}
