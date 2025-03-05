export interface IEmailProducer<T> {
  addEmailToQueue(email: T): Promise<void>;
}
