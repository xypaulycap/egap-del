import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
      const { email } = await req.json();
      console.log(email);
    // const email = 'johnson@gmail.com'
      
  
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }
  
      // Proceed with sending email
      const { data, error } = await resend.emails.send({
        from: "Egap <noreply@egapswiftbuy.com>",
        to: [email],
        subject: "Hello world",
        react: WelcomeEmail({ email }),
      });
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
  
      return NextResponse.json({ status: "ok", data });
    } catch (e) {
      return NextResponse.json(
        { error: "Something went wrong", details: e.message },
        { status: 500 }
      );
    }
  }
  