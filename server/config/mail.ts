import { handleError } from '@/server/responce/error';
import { additionalInfoMail, sendMail } from '@/types/others';
import nodemailer from 'nodemailer';

const EmailTemplate = ({
  toName,
  fromName = 'Flexin Team',
  subject,
  bodyHtml,
  callToActionText,
  callToActionLink,
  greeting = 'Hello',
  reason = ''
}: additionalInfoMail) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: 'monospace';
                line-height: 1.6;
                color: #333333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eeeeee;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #333333;
                margin: 0;
                font-size: 28px;
                font-weight: bold;
            }
            .logo {
                max-width: 150px; /* লোগোর সাইজ কাস্টমাইজ করুন */
                height: auto;
                margin-bottom: 15px;
            }
            .content {
                padding: 0 0;
                color: #555555;
                font-size: 16px;
            }
            .content p {
                margin-bottom: 15px;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                margin: 0 auto;
                background-color: #161712; 
                color: #ffffff !important; 
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #2e2f2b; 
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                margin-top: 30px;
                border-top: 1px solid #eeeeee;
                font-size: 14px;
                color: #999999;
            }
            .footer a {
                color: #007bff;
                text-decoration: none;
            }
            .unsubscribe {
                margin-top: 10px;
                font-size: 12px;
                color: #aaaaaa;
            }
            .info-text {
                font-style: italic;
                color: #777777;
                font-size: 14px;
                margin-top: 25px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${fromName}</h1>
            </div>
            <div class="content">
                <p>${greeting} ${toName},</p>
                ${reason ? `<p class="info-text">${reason}</p>` : ''}
                ${bodyHtml}
            </div>

            ${
              callToActionText && callToActionLink
                ? `
            <div class="button-container">
                <a href="${callToActionLink}" class="button" target="_blank">${callToActionText}</a>
            </div>
            `
                : ''
            }

            <div class="footer">
                <p>Regards,</p>
                <p>${fromName} Team</p>
                <p>&copy; ${new Date().getFullYear()} ${fromName}. All rights reserved.</p>
                <p class="unsubscribe">
                    If you did not request this email, please ignore it.
                    </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'work.mazaharul@gmail.com',
    pass: 'jgsewnfwzcqnyofx', // Use App Password if 2FA enabled
  },
});

const mailService = async ({ to, subject, additionalInfo }: sendMail) => {
  try {
    return transporter.sendMail({
       from: '"Flexin" <noreply@flexin.shop>',
      to,
      subject,
      html: EmailTemplate(additionalInfo),
    });
  } catch (error) {
    handleError(error);
  }
};

export default mailService;
