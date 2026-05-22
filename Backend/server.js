import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

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
  items: [{
    productId: { type: Number },
    title: { type: String },
    price: { type: String },
    quantity: { type: Number }
  }],
  totalAmount: { type: String, default: '' }
}, { timestamps: true });

// explicitly mapping schema to collection name 'booking'
const Booking = mongoose.model('Booking', bookingSchema, 'booking');

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
      // In a real app we'd hash and compare, but we'll do simple check for prototype convenience
      if (user.password !== password) {
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
      items: items || [],
      totalAmount: totalAmount || ''
    });

    await newBooking.save();

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
  console.log(`Time Vault Backend Server running on port ${PORT}`);
});
