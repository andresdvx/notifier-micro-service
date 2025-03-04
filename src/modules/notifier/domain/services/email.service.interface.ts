export interface IEmailService<T, K> {
  sendEmail(email: T): Promise<void>;
  saveEmail(email: K): Promise<K>;
}
