export interface IEmailModel {
  to: string;
  subject: string;
  body: string;
  type: 'welcome' | 'transaction'
}
