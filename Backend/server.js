import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI = "mongodb+srv://harshithavidath_db_user:StudentNo4200@cluster0.sj4gwfa.mongodb.net/njwatches?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB successfully connected to njwatches database.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User Schema & Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Valued Customer' },
  addresses: { type: [String], default: [] }
}, { timestamps: true });

// Pre-save hook to hash password before saving to MongoDB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

// Define Booking Schema & Model
const bookingSchema = new mongoose.Schema({
  emailOrPhone: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  address: { type: String, default: '' },
  apartment: { type: String, default: '' },
  city: { type: String, default: '' },
  postalCode: { type: String, default: '' },
  phone: { type: String, default: '' },
  cardType: { type: String, default: '' },
  billingAddressType: { type: String, default: 'Same' },
  billingAddress: { type: String, default: '' },
  billingApartment: { type: String, default: '' },
  billingCity: { type: String, default: '' },
  billingPostalCode: { type: String, default: '' },
  items: [{
    productId: { type: Number },
    title: { type: String },
    price: { type: String },
    quantity: { type: Number }
  }],
  totalAmount: { type: String, default: '' },
  status: { type: String, default: 'Processing' } // 'Processing' or 'Delivered'
}, { timestamps: true });

// explicitly mapping schema to collection name 'booking'
const Booking = mongoose.model('Booking', bookingSchema, 'booking');

// Setup Nodemailer Transporter with zero-config test account fallback
const createTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('Configuring Nodemailer with custom SMTP settings from environment.');
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal SMTP test account successfully generated for zero-config email debugging.');
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (err) {
    console.error('Failed to initialize test Ethereal SMTP account. Falling back to local terminal logger:', err);
    return {
      sendMail: async (mailOptions) => {
        console.log('\n=================== MOCK INVOICE EMAIL ===================');
        console.log(`From: ${mailOptions.from}`);
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log('----------------------------------------------------------');
        console.log('HTML CONTENT CAPTURED SUCCESSFULLY (PREVIEW BLOCKED)');
        console.log('==========================================================\n');
        return { messageId: 'mock-local-id-' + Date.now() };
      }
    };
  }
};

let transporter;
createTransporter().then(t => {
  transporter = t;
});

// Send Invoice Confirmation Email to customer
const sendConfirmationEmail = async (booking) => {
  if (!transporter) {
    console.warn('Transporter is not initialized yet. Skipping confirmation email.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(booking.emailOrPhone.trim())) {
    console.log(`Skipping confirmation email because contact '${booking.emailOrPhone}' is not a valid email address.`);
    return;
  }

  const recipientEmail = booking.emailOrPhone.toLowerCase().trim();

  // Create a clean, elegant HTML summary of invoice items
  const orderItemsHtml = booking.items.map(item => `
    <tr style="border-bottom: 1px solid #E5E5E5;">
      <td style="padding: 12px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #1C1917;">
        <strong>${item.title}</strong>
      </td>
      <td style="padding: 12px 0; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #78716C;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 0; text-align: right; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; color: #1C1917;">
        ${item.price}
      </td>
    </tr>
  `).join('');

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation - N.J. Watches</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F4F0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F5F4F0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #FFFFFF; border-radius: 8px; border: 1px solid #E5E2D9; box-shadow: 0 4px 12px rgba(0,0,0,0.03); overflow: hidden;">
          
          <!-- Header (Brand Name) -->
          <tr>
            <td align="center" style="padding: 35px 40px 25px 40px; background-color: #FFFFFF; border-bottom: 1px solid #F5F4F0;">
              <h2 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 26px; letter-spacing: 2px; color: #1C1917; text-transform: uppercase;">
                N.J. Watches
              </h2>
              <p style="margin: 5px 0 0 0; font-size: 11px; letter-spacing: 3px; color: #C5A880; text-transform: uppercase;">
                Exceptional Timepieces
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h1 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 22px; font-weight: normal; color: #1C1917; line-height: 1.3;">
                Thank You for Your Order, ${booking.firstName || 'Valued Customer'}!
              </h1>
              <p style="margin: 15px 0 0 0; font-size: 14px; line-height: 1.6; color: #44403C;">
                Your order has been successfully completed. Our boutique curators are preparing your watch for delivery. Below are your invoice details:
              </p>
            </td>
          </tr>

          <!-- Reference Cards -->
          <tr>
            <td style="padding: 0 40px;">
              <table border="0" cellpadding="15" cellspacing="0" width="100%" style="background-color: #FDFDFB; border: 1px dashed #C5A880; border-radius: 4px;">
                <tr>
                  <td>
                    <span style="display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #78716C; margin-bottom: 4px;">
                      Order Reference
                    </span>
                    <strong style="font-size: 16px; color: #1C1917; font-family: Courier, monospace;">
                      ${booking._id.toString().substring(0, 8).toUpperCase()}
                    </strong>
                  </td>
                  <td align="right">
                    <span style="display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #78716C; margin-bottom: 4px;">
                      Estimated Delivery
                    </span>
                    <strong style="font-size: 14px; color: #1C1917;">
                      2 - 3 Business Days (Sri Lanka)
                    </strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 30px 40px 10px 40px;">
              <h3 style="margin: 0 0 15px 0; font-family: 'Times New Roman', Times, serif; font-size: 16px; font-weight: normal; color: #1C1917; border-bottom: 1px solid #1C1917; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
                Order Summary
              </h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <thead>
                  <tr style="border-bottom: 1px solid #1C1917;">
                    <th align="left" style="padding-bottom: 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #78716C; font-weight: bold;">
                      Timepiece
                    </th>
                    <th align="center" style="padding-bottom: 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #78716C; font-weight: bold; width: 60px;">
                      Qty
                    </th>
                    <th align="right" style="padding-bottom: 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #78716C; font-weight: bold; width: 120px;">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Financial Details -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table border="0" cellpadding="5" cellspacing="0" width="100%" style="border-top: 1px solid #F5F4F0; padding-top: 15px;">
                <tr>
                  <td style="font-size: 13px; color: #78716C;">Shipping Method:</td>
                  <td align="right" style="font-size: 13px; font-weight: bold; color: #1C1917;">
                    Free Premium Courier Delivery
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #78716C;">Payment Method:</td>
                  <td align="right" style="font-size: 13px; font-weight: bold; color: #1C1917;">
                    Secure Card Booking (${booking.cardType || 'Credit/Debit Card'})
                  </td>
                </tr>
                <tr style="font-size: 16px;">
                  <td style="padding-top: 15px; font-family: 'Times New Roman', Times, serif; color: #1C1917; font-size: 18px;">
                    <strong>Total Amount Paid:</strong>
                  </td>
                  <td align="right" style="padding-top: 15px; font-size: 18px; color: #C5A880;">
                    <strong>${booking.totalAmount}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Address Section -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table border="0" cellpadding="15" cellspacing="0" width="100%" style="background-color: #FAF9F6; border-radius: 4px; border: 1px solid #E5E2D9;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 8px 0; font-family: 'Times New Roman', Times, serif; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #1C1917;">
                      Delivery Details
                    </h4>
                    <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #44403C;">
                      <strong>Recipient:</strong> ${booking.firstName} ${booking.lastName}<br>
                      <strong>Address:</strong> ${booking.address}${booking.apartment ? ', ' + booking.apartment : ''}, ${booking.city}, ${booking.postalCode}<br>
                      <strong>Phone:</strong> ${booking.phone || booking.emailOrPhone}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Premium Brand Footer -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #1C1917; color: #A8A29E; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #FFFFFF; font-family: 'Times New Roman', Times, serif; letter-spacing: 1px;">
                Thank you for choosing N.J. Watches.
              </p>
              <p style="margin: 0; font-size: 11px; color: #78716C; line-height: 1.5;">
                This is an automatically generated receipt. If you have any inquiries regarding shipping tracking or adjustments, please email our support department at support@njwatches.com.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const mailOptions = {
    from: '"N.J. Watches" <sales@njwatches.com>',
    to: recipientEmail,
    subject: `Order Confirmation - N.J. Watches (Ref: ${booking._id.toString().substring(0, 8).toUpperCase()})`,
    html: emailHtml
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent successfully to ${recipientEmail}. Message ID: ${info.messageId}`);
    
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[Zero-Config Debug] Preview sent email inside your browser: ${previewUrl}`);
    }
  } catch (err) {
    console.error(`Failed to send order confirmation email to ${recipientEmail}:`, err);
  }
};

// API Endpoints

// 1. Sign In / Register (Sign in or create an account)
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (user) {
      // Check if the password in DB is hashed, otherwise upgrade security seamlessly
      let isMatch = false;
      if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
        isMatch = await bcrypt.compare(password, user.password);
      } else {
        isMatch = (user.password === password);
        if (isMatch) {
          // Upgrade legacy plain text password to secure bcrypt hash
          user.password = password; 
          await user.save();
          console.log(`Successfully upgraded legacy plain text password to secure bcrypt hash for user: ${user.email}`);
        }
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials. Password does not match.' });
      }
      return res.status(200).json({
        message: 'Successfully logged in',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          addresses: user.addresses
        }
      });
    } else {
      // Create new user automatically since flow is "Sign in or create an account"
      user = new User({
        email: email.toLowerCase().trim(),
        password: password,
        name: email.split('@')[0] // default name from email prefix
      });
      await user.save();

      return res.status(201).json({
        message: 'Account successfully created and logged in',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          addresses: user.addresses
        }
      });
    }
  } catch (err) {
    console.error('Error in signin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 2. Update Profile Name
app.put('/api/users/update-name', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and name are required.' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { name: name.trim() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'Name updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        addresses: user.addresses
      }
    });
  } catch (err) {
    console.error('Error in update-name:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 3. Add Address
app.post('/api/users/add-address', async (req, res) => {
  const { email, address } = req.body;

  if (!email || !address) {
    return res.status(400).json({ message: 'Email and address are required.' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { $push: { addresses: address.trim() } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'Address added successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        addresses: user.addresses
      }
    });
  } catch (err) {
    console.error('Error adding address:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 4. Remove Address
app.delete('/api/users/remove-address', async (req, res) => {
  const { email, index } = req.body;

  if (!email || index === undefined) {
    return res.status(400).json({ message: 'Email and address index are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Remove by index
    user.addresses.splice(index, 1);
    await user.save();

    res.status(200).json({
      message: 'Address removed successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        addresses: user.addresses
      }
    });
  } catch (err) {
    console.error('Error removing address:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 4.5 Get all bookings/orders for a specific user email
app.get('/api/bookings/user/:email', async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: 'Email parameter is required.' });
  }

  try {
    const queryEmail = email.toLowerCase().trim();
    // Fetch bookings matching this email, sorted newest first
    const bookings = await Booking.find({ 
      emailOrPhone: { $regex: new RegExp(`^${queryEmail}$`, 'i') } 
    }).sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ message: 'Internal server error while fetching bookings' });
  }
});

// 4.6 [ADMIN] Fetch all registered users details (name, email)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find({ email: { $ne: 'dicksonskd62@gmail.com' } }, 'name email createdAt').sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (err) {
    console.error('Error in admin fetching users:', err);
    res.status(500).json({ message: 'Internal server error while fetching users' });
  }
});

// 4.7 [ADMIN] Fetch all bookings/orders
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (err) {
    console.error('Error in admin fetching bookings:', err);
    res.status(500).json({ message: 'Internal server error while fetching bookings' });
  }
});

// 4.8 [ADMIN] Update order status (Processing or Delivered)
app.put('/api/admin/bookings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || (status !== 'Processing' && status !== 'Delivered')) {
    return res.status(400).json({ message: 'Valid status is required ("Processing" or "Delivered").' });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json({ message: 'Order status successfully updated by Admin.', booking });
  } catch (err) {
    console.error('Error updating order status by admin:', err);
    res.status(500).json({ message: 'Internal server error while updating order status' });
  }
});

// 5. Save Checkout Booking details to MongoDB Atlas database table 'booking'
app.post('/api/bookings', async (req, res) => {
  const { 
    emailOrPhone, 
    deliveryMethod, 
    firstName, 
    lastName, 
    address, 
    apartment, 
    city, 
    postalCode, 
    phone, 
    cardType,
    billingAddressType,
    billingAddress,
    billingApartment,
    billingCity,
    billingPostalCode,
    items,
    totalAmount 
  } = req.body;

  if (!emailOrPhone) {
    return res.status(400).json({ message: 'Email or phone number is required.' });
  }

  try {
    const newBooking = new Booking({
      emailOrPhone,
      deliveryMethod,
      firstName: firstName || '',
      lastName: lastName || '',
      address: address || '',
      apartment: apartment || '',
      city: city || '',
      postalCode: postalCode || '',
      phone: phone || '',
      cardType: cardType || '',
      billingAddressType: billingAddressType || 'Same',
      billingAddress: billingAddress || '',
      billingApartment: billingApartment || '',
      billingCity: billingCity || '',
      billingPostalCode: billingPostalCode || '',
      items: items || [],
      totalAmount: totalAmount || ''
    });

    await newBooking.save();

    // Trigger confirmation email asynchronously so it doesn't block the API response
    sendConfirmationEmail(newBooking).catch(err => {
      console.error('Error in sendConfirmationEmail async handler:', err);
    });

    res.status(201).json({
      message: 'Booking successfully saved to MongoDB Atlas database.',
      booking: newBooking
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Internal server error while saving booking' });
  }
});

app.listen(PORT, () => {
  console.log(`N.J. Watches Backend Server running on port ${PORT}`);
});
