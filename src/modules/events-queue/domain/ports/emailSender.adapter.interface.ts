export interface IEmailSender<T> {
  createEmailSender(email: T): Promise<void>;
}
