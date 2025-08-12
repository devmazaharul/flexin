export interface jwtpayload {
  email: string;
  id: string;
  role: string;
}

export interface additionalInfoMail {
  toName: string;
  subject:string;
  fromName: string;
  bodyHtml: string;
  greeting: string;
  reason: string;
  callToActionLink: string;
  callToActionText: string;
}

export interface sendMail {
  to: string;
  subject: string;
  additionalInfo: additionalInfoMail;
}

export enum queueJobName {
SEND_MAIL = 'sendMail',
CREATE_ORDER = 'createOrder',
NOTIFY_USER = 'notifyUser',
NOTIFY_ADMIN = 'notifyAdmin',
} 
