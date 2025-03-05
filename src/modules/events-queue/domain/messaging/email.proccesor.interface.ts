export interface IEmailProcessor<T> {
  process(data: T): Promise<void>;
}
