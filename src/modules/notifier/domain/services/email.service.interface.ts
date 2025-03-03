export interface IEmailService<T> {
  sendEmail(email: T): Promise<void>;
  saveEmail(email: T): Promise<T>;
}
