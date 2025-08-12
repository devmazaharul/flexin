import {  Worker } from 'bullmq';
import redisConnection from '../config/redis';
import { queueJobName, sendMail } from '@/types/others';
import mailService from '../config/mail';


// Worker define
const queueWorker = new Worker('flexinqueue',async (job) => {
   
  if(job.name==queueJobName.SEND_MAIL){
    // Handle send mail job
    const { to, subject, additionalInfo } = job.data as sendMail;
    const { toName, fromName, bodyHtml, greeting, reason, callToActionLink, callToActionText } = additionalInfo;
    await mailService({
      to,
      subject,
      additionalInfo: {
        toName,
        fromName,
        bodyHtml,
        greeting,
        reason,
        callToActionLink,
        callToActionText,
        subject
      }
    })
  
  }else if(job.name==queueJobName.CREATE_ORDER){
      // handle order create
  }else if(job.name==queueJobName.NOTIFY_ADMIN){
      //handle notify admin
  }

  },
  {
    connection: redisConnection,
  }
);

queueWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});
queueWorker.on('failed', (job, err) => {
  if (job) {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
  } else {
    console.error(`A job failed with error: ${err.message}`);
  }
});
queueWorker.on('error', (err) => {
  console.error(`Worker encountered an error: ${err.message}`);
});
