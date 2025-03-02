export interface IEmailModel {
  to: string;
  subject: string;
  body: string;
  status: 'pending' | 'sent' | 'failed';
}
