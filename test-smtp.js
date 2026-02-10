const nodemailer = require('nodemailer');

// Test cPanel SMTP
const transporter = nodemailer.createTransport({
  host: 'mail.parktonianhotels.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@parktonianhotels.com',
    pass: '#Twenty25', 
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

async function testEmail() {
  try {
    console.log('Testing SMTP connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Send test email
    console.log('\nSending test email...');
    const info = await transporter.sendMail({
      from: 'Parktonian Hotels <info@parktonianhotels.com>',
      to: 'theagentnigeria@gmail.com', // Send to yourself
      subject: 'Test Email - Parktonian Hotels',
      html: '<h1>Success!</h1><p>Your cPanel SMTP is working correctly!</p>',
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\n🎉 Your cPanel SMTP is ready for production!');
    
  } catch (error) {
    console.error('❌ SMTP Test Failed:');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
  }
}

testEmail();
