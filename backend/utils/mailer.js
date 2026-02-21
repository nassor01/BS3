import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

console.log(`📧 Mailer initialized for user: ${process.env.SMTP_USER ? process.env.SMTP_USER.replace(/(.{3}).*(@.*)/, '$1***$2') : 'undefined'}`);

export const sendBookingNotification = async (to, bookingDetails) => {
    const { roomName, date, startTime, endTime } = bookingDetails;

    const mailOptions = {
        from: `"SwahiliPot Hub Booking" <${process.env.SMTP_USER}>`,
        to: to,
        subject: 'Booking Confirmation - SwahiliPot Hub',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #0B4F6C;">Booking Confirmed!</h2>
                <p>Hello,</p>
                <p>Your room booking has been successfully recorded and is pending approval.</p>
                
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Booking Summary:</h3>
                    <p style="margin: 5px 0;"><strong>Room:</strong> ${roomName}</p>
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
                    <p style="margin: 5px 0;"><strong>Time:</strong> ${startTime || 'N/A'} - ${endTime || 'N/A'}</p>
                    <p style="margin: 5px 0;"><strong>Status:</strong> Pending Approval</p>
                </div>

                <p>Our team will review your request shortly. Thank you for choosing SwahiliPot Hub!</p>
                <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
                    This is an automated message. Please do not reply directly to this email.
                </div>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent: ' + info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
};

export const sendStatusUpdateNotification = async (to, bookingDetails) => {
    const { roomName, date, time, status } = bookingDetails;
    const isApproved = status.toLowerCase() === 'approved';
    const statusColor = isApproved ? '#28a745' : '#dc3545';
    const statusText = isApproved ? 'Approved' : 'Rejected';

    const mailOptions = {
        from: `"SwahiliPot Hub Booking" <${process.env.SMTP_USER}>`,
        to: to,
        subject: `Booking ${statusText} - SwahiliPot Hub`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: ${statusColor};">Booking ${statusText}</h2>
                <p>Hello,</p>
                <p>There has been an update regarding your room booking request.</p>
                
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Booking Details:</h3>
                    <p style="margin: 5px 0;"><strong>Room:</strong> ${roomName}</p>
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
                    <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
                    <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
                </div>

                <p>${isApproved
                ? 'We look forward to seeing you! Please ensure you adhere to the hub rules during your stay.'
                : 'Unfortunately, we are unable to accommodate your request at this time. Please feel free to book another slot or contact us for more information.'}</p>
                
                <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
                    This is an automated message. Please do not reply directly to this email.
                </div>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Status Email sent (${statusText}): ` + info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending status email:', error);
        throw error;
    }
};
