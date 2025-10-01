import { EmailService } from './email.service';
import { Queue, Worker } from 'bullmq';

const emailQueue = new Queue('send-email', { connection: { host: 'localhost', port: 6379 } });

new Worker('send-email', async job => {
  const { to, subject, template, data } = job.data;
  const emailService = new EmailService();
  await emailService.sendEmail(to, subject, template, data);
}, {
  connection: { host: 'localhost', port: 6379 },
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
});
