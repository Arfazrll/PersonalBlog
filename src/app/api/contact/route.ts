import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Configure Nodemailer transporter (fallback to Gmail if standard SMTP fails)
        // Using environment variables for security. You must configure these in .env.local
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_APP_PASSWORD || ''
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER || '',
            to: process.env.EMAIL_USER || '', // Where you want to receive the messages
            subject: `New Message: ${subject || 'No Subject'}`,
            html: `
                <h3>You have a new message from your website!</h3>
                <p><strong>Name: </strong> ${name}</p>
                <p><strong>Email: </strong> ${email}</p>
                <br />
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email. Ensure Gmail App Password is set.' }, { status: 500 });
    }
}
