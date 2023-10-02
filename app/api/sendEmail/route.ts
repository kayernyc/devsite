import type { NextRequest } from 'next/server';

import sendgrid from '@sendgrid/mail';

export async function POST(request: NextRequest) {
  if (
    process.env.SENDGRID_API_KEY &&
    process.env.TO_EMAIL &&
    process.env.FROM_EMAIL &&
    process.env.EMAIL_SUBJECT
  ) {
    const body = await request.json();
    const { name, email, message } = body;
    if (name && email && message) {
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: process.env.TO_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: process.env.EMAIL_SUBJECT,
        html: `<p>sender: ${name} at ${email}</p>
<div>
  ${message}
</div>
        `,
      };

      sendgrid
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error: any) => {
          console.log(JSON.stringify(error));
        });

      return new Response(
        JSON.stringify({ status: 201, message: 'Your email has been sent.' }),
      );
    }
  }

  return new Response(
    JSON.stringify({ status: 501, error: 'An error has occurred.' }),
  );
}
