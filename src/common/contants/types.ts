export const EmailTypes = {
  EmailRepository: Symbol.for('EmailRepository'),
  EmailService: Symbol.for('EmailService'),
};

export const EventQueueTypes = {
  EmailEventQueue: Symbol.for('EmailEvenetQueue'),
  EmailProcess: Symbol.for('SendEmailProcess'),
  EmailSender: Symbol.for('EmailSender'),
}

