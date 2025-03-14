export const EmailTypes = {
  EmailRepository: Symbol.for('EmailRepository'),
  EmailService: Symbol.for('EmailService'),
};

export const EventQueueTypes = {
  EmailEventQueue: Symbol.for('EmailEventQueue'),
  EmailProcess: Symbol.for('SendEmailProcess'),
  EmailSender: Symbol.for('EmailSender'),
  EmailProducer: Symbol.for('EmailProducer'),
};

export const HttpTypes = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
};
