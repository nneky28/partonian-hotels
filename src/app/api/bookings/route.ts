import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// ============================================
// EMAIL CONFIGURATION (SMTP)
// ============================================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
});

// ============================================
// SECURITY CONFIG
// ============================================
const API_SECRETS: Record<string, string> = {
  'dev_7993d852fcc630829d805ad06ecc8712a73fe0f52869f51c78fd7b18602768cd': 'TEST',
  'prod_afa0c5d82574f1513efc92c07784028d3b74bfe82fd20a0de5350209976b89d3': 'PRODUCTION'
};


// ============================================
// BRANCH CONFIGURATION - Admin emails for each branch
// ============================================
const BRANCH_EMAILS: Record<string, string> = {
  'Parktonian Hotel Lekki': 'parktonianhotels@yahoo.com',
  'Parktonian Hotel Ikate': 'parktonianhotelikate@gmail.com',
  'Parktonian Hotel Awka': 'parktonianhotelsawka@gmail.com',
  // Gallery page variations
  'Parktonian Lekki': 'parktonianhotels@yahoo.com',
  'Parktonian Ikate': 'parktonianhotelikate@gmail.com',
  'Parktonian Awka': 'parktonianhotelsawka@gmail.com',
  // Legacy names (keep for backwards compatibility)
  'Lekki Phase 1': 'parktonianhotels@yahoo.com',
  'Ikate': 'parktonianhotelikate@gmail.com',
  'Awka Heights': 'parktonianhotelsawka@gmail.com'
};

interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  branchName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  roomType: string;
  roomRate: string;
  totalPrice: string;
}
const HOTEL_NAME = 'Parktonian Hotels';
const REPLY_EMAIL = 'parktonianhotels@yahoo.com';
const SENDER_EMAIL = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@parktonian.com';
const SENDER_NAME = 'Parktonian Hotels';

export async function POST(request: Request) {
  const startTime = new Date();

  
  try {
    // 1. SECURITY: Verify token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');  
    const environment = token ? API_SECRETS[token] : null;

    
    if (!environment) {
      console.log('✗ UNAUTHORIZED: Invalid token');
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const data: BookingData = await request.json();
    
    // Trim branch name to remove any leading/trailing spaces
    if (data.branchName) {
      data.branchName = data.branchName.trim();
    }
    
    
    // 3. Validate required fields
    const requiredFields: (keyof BookingData)[] = [
      'fullName', 'email', 'phone', 'branchName', 'checkInDate', 
      'checkOutDate', 'roomType', 'numberOfNights', 'roomRate', 'totalPrice'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`✗ VALIDATION FAILED: Missing ${field}`);
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
  

    // 4. Get admin email for branch
    const adminEmail = BRANCH_EMAILS[data.branchName] || REPLY_EMAIL;

    let emailErrors: string[] = [];
    
    try {
      const adminResult = await transporter.sendMail({
        from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
        to: adminEmail,
        replyTo: data.email,
        subject: `New Booking - ${data.fullName}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'>
<style>
body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:20px}
.container{max-width:600px;margin:0 auto;background:#fff}
.header{background:#dc3545;color:white;padding:20px;text-align:center}
.content{padding:30px;background:#f9f9f9}
.booking-details{background:white;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1)}
.detail-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee}
.detail-row:last-child{border-bottom:none}
.label{font-weight:bold;color:#555}
.value{color:#333}
.section-title{color:#dc3545;font-size:18px;margin:20px 0 10px 0}
.highlight{background:#fff3cd;padding:15px;border-radius:5px;margin:20px 0;border-left:4px solid #ffc107}
</style>
</head>
<body>
<div class='container'>
<div class='header'>
<h1>New Booking Request</h1>
<p>${data.branchName}</p>
</div>
<div class='content'>
<div class='highlight'>
<strong>Action Required:</strong> New booking request received. Contact guest to confirm availability.
</div>
<div class='booking-details'>
<h2 class='section-title'>Guest Information</h2>
<div class='detail-row'><span class='label'>Name:</span><span class='value'>${data.fullName}</span></div>
<div class='detail-row'><span class='label'>Email:</span><span class='value'>${data.email}</span></div>
<div class='detail-row'><span class='label'>Phone:</span><span class='value'>${data.phone}</span></div>
<h2 class='section-title'>Booking Details</h2>
<div class='detail-row'><span class='label'>Check-in:</span><span class='value'>${data.checkInDate}</span></div>
<div class='detail-row'><span class='label'>Check-out:</span><span class='value'>${data.checkOutDate}</span></div>
<div class='detail-row'><span class='label'>Nights:</span><span class='value'>${data.numberOfNights}</span></div>
<div class='detail-row'><span class='label'>Room:</span><span class='value'>${data.roomType}</span></div>
<div class='detail-row'><span class='label'>Rate:</span><span class='value'>${data.roomRate}</span></div>
<div class='detail-row'><span class='label'>Total:</span><span class='value'><strong>${data.totalPrice}</strong></span></div>
<h2 class='section-title'>Request Info</h2>
<div class='detail-row'><span class='label'>Submitted:</span><span class='value'>${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span></div>
</div>
</div>
</div>
</body>
</html>`,
      });
      console.log('✓ Admin email sent to:', adminEmail);
      console.log('Admin email result:', JSON.stringify(adminResult, null, 2));
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      console.log('✗ Admin email error:', errMsg);
      console.log('Full error object:', error);
      emailErrors.push('Admin email failed: ' + errMsg);
    }

    // 6. Send confirmation email to guest
    console.log('Starting guest email send...');
    console.log('Sending to guest email:', data.email);
    
    try {
      const guestResult = await transporter.sendMail({
        from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
        to: data.email,
        replyTo: REPLY_EMAIL,
        subject: `Booking Request Received - ${data.branchName}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'>
<style>
body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:20px}
.container{max-width:600px;margin:0 auto;background:#fff}
.header{background:#28a745;color:white;padding:20px;text-align:center}
.content{padding:30px}
.booking-summary{background:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0}
.detail-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #dee2e6}
.detail-row:last-child{border-bottom:none}
.label{font-weight:bold}
.highlight{background:#d4edda;padding:15px;border-radius:5px;margin:20px 0;border-left:4px solid #28a745}
</style>
</head>
<body>
<div class='container'>
<div class='header'>
<h1>Booking Request Received</h1>
<p>${data.branchName}</p>
</div>
<div class='content'>
<p>Dear ${data.fullName},</p>
<p>Thank you for your booking request! We have received your reservation details and our team will contact you within 24 hours to confirm availability and finalize your booking.</p>
<div class='booking-summary'>
<h3>Your Booking Summary:</h3>
<div class='detail-row'><span class='label'>Branch:</span><span>${data.branchName}</span></div>
<div class='detail-row'><span class='label'>Check-in:</span><span>${data.checkInDate}</span></div>
<div class='detail-row'><span class='label'>Check-out:</span><span>${data.checkOutDate}</span></div>
<div class='detail-row'><span class='label'>Duration:</span><span>${data.numberOfNights} nights</span></div>
<div class='detail-row'><span class='label'>Room:</span><span>${data.roomType}</span></div>
<div class='detail-row'><span class='label'>Total:</span><span><strong>${data.totalPrice}</strong></span></div>
</div>
<div class='highlight'>
<strong>What happens next?</strong>
<ul>
<li>We will check availability for your dates</li>
<li>Our team will contact you with confirmation</li>
<li>You will receive final booking details</li>
</ul>
</div>
<p>If you have questions, please contact us.</p>
<p>Best regards,<br><strong>${HOTEL_NAME} Team</strong></p>
</div>
</div>
</body>
</html>`,
      });
      console.log('✓ Guest email sent to:', data.email);
      console.log('Guest email result:', JSON.stringify(guestResult, null, 2));
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      console.log('✗ Guest email error:', errMsg);
      console.log('Full error object:', error);
      emailErrors.push('Guest email failed: ' + errMsg);
    }

    // 7. Check if both emails failed
    if (emailErrors.length === 2) {
      console.log('✗ All emails failed');
      return NextResponse.json(
        { success: false, message: 'Booking saved but email notifications failed. We will contact you shortly.' },
        { status: 500 }
      );
    }
    
    if (emailErrors.length === 1) {
      console.log('⚠ One email failed:', emailErrors[0]);
    }
    
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    console.log(`✓ Request completed in ${duration}ms`);
    console.log('=== END REQUEST ===');

    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully! We will contact you within 24 hours.'
    });

  } catch (error) {
    console.log('✗✗✗ CRITICAL ERROR ✗✗✗');
    console.log('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.log('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'System error. Please try again or contact us directly.' 
      },
      { status: 500 }
    );
  }
}
