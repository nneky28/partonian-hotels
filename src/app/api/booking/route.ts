import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration - Update these values
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-email@yourdomain.com';
const HOTEL_NAME = 'Parktonian Hotels';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      branchName,
      checkIn,
      checkOut,
      roomType,
      guests,
      nights,
      totalPrice,
      fullName,
      email,
      phone,
    } = body;

    // Validation
    const errors: string[] = [];
    
    if (!checkIn) errors.push('Check-in date is required');
    if (!checkOut) errors.push('Check-out date is required');
    if (!roomType) errors.push('Room type is required');
    if (!fullName || fullName.length < 2) errors.push('Valid full name is required');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
    if (!phone) errors.push('Phone number is required');

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join(', ') },
        { status: 400 }
      );
    }

    // Format dates
    const checkinDate = new Date(checkIn);
    const checkoutDate = new Date(checkOut);
    const checkinFormatted = checkinDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const checkoutFormatted = checkoutDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Format room type
    const roomTypeFormatted = roomType.charAt(0).toUpperCase() + roomType.slice(1);

    // Format currency
    const formattedPrice = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(totalPrice);

    // Admin email HTML
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset='UTF-8'>
          <title>New Hotel Booking</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f4f4f4; }
              .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: #EA2A33; color: white; padding: 30px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { padding: 30px; }
              .booking-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
              .detail-row:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #555; }
              .value { color: #333; text-align: right; }
              .section-title { color: #EA2A33; font-size: 18px; margin: 25px 0 15px 0; font-weight: bold; }
              .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
              .price-highlight { background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; text-align: center; }
              .price-amount { font-size: 28px; font-weight: bold; color: #28a745; margin: 10px 0; }
          </style>
      </head>
      <body>
          <div class='container'>
              <div class='header'>
                  <h1>🏨 New Booking Request</h1>
                  <p>${HOTEL_NAME} - ${branchName}</p>
              </div>
              
              <div class='content'>
                  <div class='highlight'>
                      <strong>⚡ Action Required:</strong> New booking request received. Please contact the guest to confirm availability and finalize the reservation.
                  </div>
                  
                  <div class='booking-details'>
                      <h2 class='section-title'>👤 Guest Information</h2>
                      <div class='detail-row'>
                          <span class='label'>Full Name:</span>
                          <span class='value'>${fullName}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Email:</span>
                          <span class='value'>${email}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Phone:</span>
                          <span class='value'>${phone}</span>
                      </div>
                      
                      <h2 class='section-title'>🛏️ Booking Details</h2>
                      <div class='detail-row'>
                          <span class='label'>Branch:</span>
                          <span class='value'>${branchName}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Check-in:</span>
                          <span class='value'>${checkinFormatted}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Check-out:</span>
                          <span class='value'>${checkoutFormatted}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Number of Nights:</span>
                          <span class='value'>${nights} night${nights > 1 ? 's' : ''}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Room Type:</span>
                          <span class='value'>${roomTypeFormatted}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Number of Guests:</span>
                          <span class='value'>${guests}</span>
                      </div>
                  </div>
                  
                  <div class='price-highlight'>
                      <div style='font-size: 14px; color: #555;'>Estimated Total</div>
                      <div class='price-amount'>${formattedPrice}</div>
                      <div style='font-size: 12px; color: #666;'>${nights} night${nights > 1 ? 's' : ''}</div>
                  </div>
                  
                  <div class='highlight'>
                      <strong>💡 Next Steps:</strong>
                      <ul style='margin: 10px 0; padding-left: 20px;'>
                          <li>Check room availability for the requested dates</li>
                          <li>Contact guest at ${phone} or ${email}</li>
                          <li>Confirm booking details and pricing</li>
                          <li>Send booking confirmation</li>
                      </ul>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;

    // Guest confirmation email HTML
    const guestEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset='UTF-8'>
          <title>Booking Confirmation</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f4f4f4; }
              .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: #28a745; color: white; padding: 30px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { padding: 30px; }
              .booking-summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dee2e6; }
              .detail-row:last-child { border-bottom: none; }
              .label { font-weight: bold; }
              .highlight { background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
              .footer { text-align: center; padding: 20px; background: #f8f9fa; color: #666; font-size: 12px; }
          </style>
      </head>
      <body>
          <div class='container'>
              <div class='header'>
                  <h1>✅ Booking Request Received</h1>
                  <p>${HOTEL_NAME}</p>
              </div>
              
              <div class='content'>
                  <p>Dear ${fullName},</p>
                  
                  <p>Thank you for choosing ${HOTEL_NAME}! We have received your booking request and our team will contact you within 24 hours to confirm availability and finalize your reservation.</p>
                  
                  <div class='booking-summary'>
                      <h3 style='margin-top: 0; color: #28a745;'>Your Booking Request Summary</h3>
                      <div class='detail-row'>
                          <span class='label'>Branch:</span>
                          <span>${branchName}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Check-in:</span>
                          <span>${checkinFormatted}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Check-out:</span>
                          <span>${checkoutFormatted}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Duration:</span>
                          <span>${nights} night${nights > 1 ? 's' : ''}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Room Type:</span>
                          <span>${roomTypeFormatted}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Guests:</span>
                          <span>${guests}</span>
                      </div>
                      <div class='detail-row'>
                          <span class='label'>Estimated Total:</span>
                          <span style='font-weight: bold; color: #28a745;'>${formattedPrice}</span>
                      </div>
                  </div>
                  
                  <div class='highlight'>
                      <strong>📋 What happens next?</strong>
                      <ul style='margin: 10px 0; padding-left: 20px;'>
                          <li>We'll verify room availability for your requested dates</li>
                          <li>Our team will contact you to confirm pricing and details</li>
                          <li>You'll receive a final booking confirmation once approved</li>
                          <li>Payment instructions will be provided upon confirmation</li>
                      </ul>
                  </div>
                  
                  <p>If you have any questions or need to make changes to your booking request, please don't hesitate to contact us at ${ADMIN_EMAIL} or call us directly.</p>
                  
                  <p style='margin-top: 30px;'>We look forward to welcoming you!</p>
                  
                  <p>Best regards,<br>
                  <strong>${HOTEL_NAME} Team</strong></p>
              </div>
              
              <div class='footer'>
                  <p>This is an automated message from ${HOTEL_NAME}. Please do not reply directly to this email.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Send admin notification email
    await transporter.sendMail({
      from: `${fullName} <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New Booking Request - ${branchName} - ${fullName}`,
      html: adminEmailHTML,
    });

    // Send guest confirmation email
    await transporter.sendMail({
      from: `${HOTEL_NAME} <${SMTP_USER}>`,
      to: email,
      subject: `Booking Request Received - ${HOTEL_NAME}`,
      html: guestEmailHTML,
    });

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully! Check your email for confirmation.',
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit booking request. Please try again or contact us directly.',
      },
      { status: 500 }
    );
  }
}
