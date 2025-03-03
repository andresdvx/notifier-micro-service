export interface IEmailRepository<T> {
  saveEmail(email: T): Promise<T>;
}
