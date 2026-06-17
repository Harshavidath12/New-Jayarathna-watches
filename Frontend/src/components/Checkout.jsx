import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import './Checkout.css';

const Checkout = ({ cartItems, onCompleteOrder, onNavigate }) => {
  const [step, setStep] = useState(1); // 1 = Contact & Delivery, 2 = Payment
  
  // Shipping form fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Ship'); // 'Ship' or 'Pickup'
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [textOffers, setTextOffers] = useState(false);

  // Payment form fields
  const [cardType, setCardType] = useState('Credit Card'); // 'Credit Card' or 'Debit Card'
  const [cardNumber, setCardNumber] = useState(''); // Formatted as XXXX-XXXX-XXXX-XXXX
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [billingAddressType, setBillingAddressType] = useState('Same'); // 'Same' or 'Different'
  const [billingAddress, setBillingAddress] = useState('');
  const [billingApartment, setBillingApartment] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');

  // Errors state
  const [shippingErrors, setShippingErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});

  // Calculation helpers
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const priceVal = parseFloat(item.product.newPrice.replace(/[^0-9.]/g, ''));
      return acc + (priceVal * item.quantity);
    }, 0);
  };

  const formatCurrency = (val) => {
    return `Rs ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} LKR`;
  };

  // Auto format card number to XXXX-XXXX-XXXX-XXXX as user types
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Keep only digits
    if (value.length > 16) {
      value = value.slice(0, 16); // Strictly limit to 16 digits
    }
    
    // Add dashes every 4 digits
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    setCardNumber(parts.join('-'));
  };

  // Expiry Month constraint: allow only digits, limit to 2 chars, restrict 1-12
  const handleMonthChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
    setExpiryMonth(value);
  };

  // Expiry Year constraint: limit to 4 digits
  const handleYearChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setExpiryYear(value);
  };

  // CVC constraint: strictly 3 digits as requested
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
    setCvc(value);
  };

  // Shipping form validation
  const validateShippingForm = () => {
    const errors = {};
    if (!emailOrPhone.trim()) {
      errors.emailOrPhone = 'Enter an email or mobile phone number';
    } else if (emailOrPhone.includes('@') && !/\S+@\S+\.\S+/.test(emailOrPhone)) {
      errors.emailOrPhone = 'Enter a valid email address';
    }
    
    if (deliveryMethod === 'Ship') {
      if (!lastName.trim()) errors.lastName = 'Enter your last name';
      if (!address.trim()) errors.address = 'Enter your shipping address';
      if (!city.trim()) errors.city = 'Enter your city';
      if (!phone.trim()) {
        errors.phone = 'Enter a contact phone number';
      } else if (phone.replace(/[^0-9]/g, '').length < 8) {
        errors.phone = 'Enter a valid phone number';
      }
    }
    
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Payment form validation
  const validatePaymentForm = () => {
    const errors = {};
    const cleanCard = cardNumber.replace(/[^0-9]/g, '');
    
    if (cleanCard.length !== 16) {
      errors.cardNumber = 'Card number must be exactly 16 digits';
    }
    
    const monthVal = parseInt(expiryMonth, 10);
    if (!expiryMonth || isNaN(monthVal) || monthVal < 1 || monthVal > 12) {
      errors.expiryMonth = 'Month must be between 1 and 12';
    }
    
    const currentYear = new Date().getFullYear();
    const yearVal = parseInt(expiryYear, 10);
    if (!expiryYear || isNaN(yearVal) || yearVal < currentYear) {
      errors.expiryYear = `Year must be equal to or greater than ${currentYear}`;
    }
    
    if (cvc.length !== 3) {
      errors.cvc = 'CVC must be exactly 3 digits';
    }

    if (billingAddressType === 'Different') {
      if (!billingAddress.trim()) {
        errors.billingAddress = 'Enter your billing address';
      }
      if (!billingCity.trim()) {
        errors.billingCity = 'Enter your billing city';
      }
    }
    
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep(2);
    }
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      try {
        const orderData = {
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
          billingAddress: billingAddressType === 'Same' ? address : billingAddress,
          billingApartment: billingAddressType === 'Same' ? apartment : billingApartment,
          billingCity: billingAddressType === 'Same' ? city : billingCity,
          billingPostalCode: billingAddressType === 'Same' ? postalCode : billingPostalCode,
          items: cartItems.map(item => ({
            productId: item.product.id,
            title: item.product.title,
            price: item.product.newPrice,
            quantity: item.quantity
          })),
          totalAmount: formatCurrency(calculateTotal())
        };

        const response = await fetch(`${API_BASE_URL}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to submit booking');
        }

        // Success! Pass order info up to App.jsx
        onCompleteOrder({
          customerName: `${firstName} ${lastName}`.trim() || 'Valued Customer',
          emailOrPhone
        });
      } catch (err) {
        alert(err.message || 'Error processing checkout. Please try again.');
      }
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        
        <div className="checkout-left-form-panel">
          <div className="checkout-left-content-inner">
            <div className="checkout-form-header">
              <div className="logo-container checkout-site-logo" onClick={() => onNavigate('HOME')}>
                <img src="/nj_watches_logo.png" alt="N.J. Watches Logo" className="site-logo-circle" style={{ width: '95px', height: '95px' }} />
              </div>
              
              {/* Step Wizard Indicator */}
              <div className="checkout-breadcrumb-steps">
                <span className={`step-item ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                  Shipping Info
                </span>
                <span className="step-item-arrow">→</span>
                <span className={`step-item ${step === 2 ? 'active' : ''}`}>
                  Payment
                </span>
              </div>
            </div>

            {step === 1 ? (
              /* Step 1 Form: Contact & Delivery */
              <form onSubmit={handleContinueToPayment} className="checkout-step-form">
              
              {/* Contact Information */}
              <div className="form-section-block">
                <div className="section-title-header">
                  <h2>Contact Information</h2>
                  <span className="sign-in-prompt">Already have an account? <span className="underline-link">Sign in</span></span>
                </div>
                
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Email or mobile phone number"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className={`form-input-field ${shippingErrors.emailOrPhone ? 'input-error-state' : ''}`}
                  />
                  {shippingErrors.emailOrPhone && (
                    <span className="field-error-message">{shippingErrors.emailOrPhone}</span>
                  )}
                </div>
                
                <label className="checkbox-label-container">
                  <input 
                    type="checkbox" 
                    checked={textOffers} 
                    onChange={(e) => setTextOffers(e.target.checked)} 
                  />
                  <span className="checkbox-custom-mark"></span>
                  <span className="checkbox-label-text">Text me with news and offers</span>
                </label>
              </div>

              {/* Delivery Section */}
              <div className="form-section-block">
                <h2>Delivery Method</h2>
                
                <div className="delivery-tab-selector">
                  <button 
                    type="button"
                    className={`delivery-tab-btn ${deliveryMethod === 'Ship' ? 'selected' : ''}`}
                    onClick={() => setDeliveryMethod('Ship')}
                  >
                    📦 Ship
                  </button>
                  <button 
                    type="button"
                    className={`delivery-tab-btn ${deliveryMethod === 'Pickup' ? 'selected' : ''}`}
                    onClick={() => setDeliveryMethod('Pickup')}
                  >
                    🏪 Pickup
                  </button>
                </div>

                {deliveryMethod === 'Ship' ? (
                  <div className="shipping-address-fields">
                    <div className="input-group">
                      <select className="form-input-field select-field" disabled>
                        <option>Sri Lanka</option>
                      </select>
                      <span className="select-dropdown-indicator">▾</span>
                    </div>

                    <div className="input-row-split-2">
                      <div className="input-group">
                        <input 
                          type="text" 
                          placeholder="First name (optional)" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="form-input-field"
                        />
                      </div>
                      <div className="input-group">
                        <input 
                          type="text" 
                          placeholder="Last name" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className={`form-input-field ${shippingErrors.lastName ? 'input-error-state' : ''}`}
                        />
                        {shippingErrors.lastName && (
                          <span className="field-error-message">{shippingErrors.lastName}</span>
                        )}
                      </div>
                    </div>

                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="Address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`form-input-field ${shippingErrors.address ? 'input-error-state' : ''}`}
                      />
                      {shippingErrors.address && (
                        <span className="field-error-message">{shippingErrors.address}</span>
                      )}
                    </div>

                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="Apartment, suite, etc. (optional)" 
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        className="form-input-field"
                      />
                    </div>

                    <div className="input-row-split-2">
                      <div className="input-group">
                        <input 
                          type="text" 
                          placeholder="City" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className={`form-input-field ${shippingErrors.city ? 'input-error-state' : ''}`}
                        />
                        {shippingErrors.city && (
                          <span className="field-error-message">{shippingErrors.city}</span>
                        )}
                      </div>
                      <div className="input-group">
                        <input 
                          type="text" 
                          placeholder="Postal code (optional)" 
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="form-input-field"
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="Phone number for updates" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`form-input-field ${shippingErrors.phone ? 'input-error-state' : ''}`}
                      />
                      {shippingErrors.phone && (
                        <span className="field-error-message">{shippingErrors.phone}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="pickup-store-box">
                    <p className="pickup-title">🏪 Store Pickup Location</p>
                    <p className="pickup-address">N.J. Watches Boutique - Galle Road, Colombo 03, Sri Lanka</p>
                    <p className="pickup-hours">Ready in 2-4 hours | Hours: 10:00 AM - 8:00 PM</p>
                  </div>
                )}

                <label className="checkbox-label-container">
                  <input 
                    type="checkbox" 
                    checked={saveInfo} 
                    onChange={(e) => setSaveInfo(e.target.checked)} 
                  />
                  <span className="checkbox-custom-mark"></span>
                  <span className="checkbox-label-text">Save this information for next time</span>
                </label>
              </div>

              {/* Step footer button */}
              <div className="checkout-step-footer">
                <button type="submit" className="btn-checkout-submit">
                  Continue to Payment
                </button>
              </div>
            </form>
          ) : (
            /* Step 2 Form: Payment Methods (Strictly Credit/Debit Card) */
            <form onSubmit={handlePayNow} className="checkout-step-form">
              
              {/* Shipping Method Recall */}
              <div className="form-section-block">
                <h2>Shipping Method</h2>
                <div className="shipping-recall-row">
                  <span className="recall-label">Free Shipping</span>
                  <span className="recall-value font-bold">FREE</span>
                </div>
              </div>

              {/* Card Payment Form (No Koko Installments) */}
              <div className="form-section-block">
                <div className="section-title-header">
                  <h2>Payment</h2>
                  <span className="encryption-notice">🔒 Secure & Encrypted</span>
                </div>
                <p className="payment-explanation-text">All transactions are processed securely. Select your card type and enter your details below.</p>

                {/* Credit / Debit Card Toggles */}
                <div className="payment-card-types-radios">
                  <label className={`card-type-label ${cardType === 'Credit Card' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="cardType" 
                      value="Credit Card"
                      checked={cardType === 'Credit Card'}
                      onChange={() => setCardType('Credit Card')}
                    />
                    <span className="radio-dot"></span>
                    <span className="radio-text-label">💳 Credit Card</span>
                  </label>

                  <label className={`card-type-label ${cardType === 'Debit Card' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="cardType" 
                      value="Debit Card"
                      checked={cardType === 'Debit Card'}
                      onChange={() => setCardType('Debit Card')}
                    />
                    <span className="radio-dot"></span>
                    <span className="radio-text-label">💳 Debit Card</span>
                  </label>
                </div>

                {/* Card Fields Box */}
                <div className="credit-card-inputs-container">
                  <div className="input-group">
                    <label className="field-label-inside">CARD NUMBER</label>
                    <input 
                      type="text" 
                      placeholder="1234-5678-9012-3456" 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className={`form-input-field font-mono ${paymentErrors.cardNumber ? 'input-error-state' : ''}`}
                    />
                    {paymentErrors.cardNumber && (
                      <span className="field-error-message">{paymentErrors.cardNumber}</span>
                    )}
                  </div>

                  <div className="input-row-split-3">
                    <div className="input-group">
                      <label className="field-label-inside">EXPIRY MONTH</label>
                      <input 
                        type="text" 
                        placeholder="MM (1-12)" 
                        value={expiryMonth}
                        onChange={handleMonthChange}
                        className={`form-input-field text-center ${paymentErrors.expiryMonth ? 'input-error-state' : ''}`}
                      />
                      {paymentErrors.expiryMonth && (
                        <span className="field-error-message">{paymentErrors.expiryMonth}</span>
                      )}
                    </div>

                    <div className="input-group">
                      <label className="field-label-inside">EXPIRY YEAR</label>
                      <input 
                        type="text" 
                        placeholder="YYYY" 
                        value={expiryYear}
                        onChange={handleYearChange}
                        className={`form-input-field text-center ${paymentErrors.expiryYear ? 'input-error-state' : ''}`}
                      />
                      {paymentErrors.expiryYear && (
                        <span className="field-error-message">{paymentErrors.expiryYear}</span>
                      )}
                    </div>

                    <div className="input-group">
                      <label className="field-label-inside">CVC (3 DIGITS)</label>
                      <input 
                        type="text" 
                        placeholder="123" 
                        value={cvc}
                        onChange={handleCvcChange}
                        className={`form-input-field text-center font-mono ${paymentErrors.cvc ? 'input-error-state' : ''}`}
                      />
                      {paymentErrors.cvc && (
                        <span className="field-error-message">{paymentErrors.cvc}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address Toggle */}
              <div className="form-section-block">
                <h2>Billing Address</h2>
                <div className="billing-address-options">
                  <label className={`billing-option-row ${billingAddressType === 'Same' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="billingAddress" 
                      value="Same"
                      checked={billingAddressType === 'Same'}
                      onChange={() => setBillingAddressType('Same')}
                    />
                    <span className="radio-dot"></span>
                    <span className="radio-text-label">Same as shipping address</span>
                  </label>

                  <label className={`billing-option-row ${billingAddressType === 'Different' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="billingAddress" 
                      value="Different"
                      checked={billingAddressType === 'Different'}
                      onChange={() => setBillingAddressType('Different')}
                    />
                    <span className="radio-dot"></span>
                    <span className="radio-text-label">Use a different billing address</span>
                  </label>
                </div>

                {billingAddressType === 'Different' && (
                  <div className="different-billing-address-fields animate-fade-in">
                    <div className="form-field-group">
                      <label className="form-field-label">Billing Address</label>
                      <input 
                        type="text" 
                        placeholder="Address" 
                        value={billingAddress} 
                        onChange={(e) => setBillingAddress(e.target.value)} 
                        className={`form-input-field ${paymentErrors.billingAddress ? 'input-error-state' : ''}`}
                      />
                      {paymentErrors.billingAddress && (
                        <span className="field-error-message">{paymentErrors.billingAddress}</span>
                      )}
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">Apartment, suite, etc. (optional)</label>
                      <input 
                        type="text" 
                        placeholder="Apartment, suite, etc. (optional)" 
                        value={billingApartment} 
                        onChange={(e) => setBillingApartment(e.target.value)} 
                        className="form-input-field"
                      />
                    </div>

                    <div className="form-double-fields">
                      <div className="form-field-group">
                        <label className="form-field-label">City</label>
                        <input 
                          type="text" 
                          placeholder="City" 
                          value={billingCity} 
                          onChange={(e) => setBillingCity(e.target.value)} 
                          className={`form-input-field ${paymentErrors.billingCity ? 'input-error-state' : ''}`}
                        />
                        {paymentErrors.billingCity && (
                          <span className="field-error-message">{paymentErrors.billingCity}</span>
                        )}
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Postal code (optional)</label>
                        <input 
                          type="text" 
                          placeholder="Postal code" 
                          value={billingPostalCode} 
                          onChange={(e) => setBillingPostalCode(e.target.value)} 
                          className="form-input-field"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step footer buttons */}
              <div className="checkout-step-footer split-buttons">
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="btn-checkout-back"
                >
                  ← Back to Shipping
                </button>
                <button type="submit" className="btn-checkout-submit pay-now-btn">
                  Pay Now
                </button>
              </div>
            </form>
          )}
          </div>
        </div>

        {/* Right Column: Order Summary (Sleek watch list) */}
        <div className="checkout-right-summary-panel">
          <div className="checkout-right-content-inner">
            <div className="checkout-summary-scrollbox">
              {cartItems.map((item) => {
                const { product, quantity } = item;
                return (
                  <div key={product.id} className="summary-item-row">
                    <div className="summary-item-media">
                      <img src={product.image} alt={product.title} />
                      <span className="summary-qty-badge">{quantity}</span>
                    </div>
                    
                    <div className="summary-item-info">
                      <h3 className="summary-item-title">{product.title}</h3>
                      <span className="summary-item-brand">{product.brand}</span>
                    </div>
                    
                    <div className="summary-item-price-col">
                      {product.newPrice}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing calculations */}
            <div className="checkout-pricing-math-block">
              <div className="math-row">
                <span className="math-label">Subtotal</span>
                <span className="math-val font-medium">{formatCurrency(calculateTotal())}</span>
              </div>
              
              <div className="math-row">
                <span className="math-label">Shipping</span>
                <span className="math-val color-gold">FREE</span>
              </div>
              
              <div className="math-row grand-total-row">
                <span className="total-label">Total</span>
                <span className="total-val">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
