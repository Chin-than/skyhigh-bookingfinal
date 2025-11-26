import React, { useState } from 'react';
import { Flight, Seat } from '../types';

interface PaymentProps {
  flight: Flight;
  seat: Seat;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ flight, seat, onPaymentComplete, onBack }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = flight.price + seat.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  // Simple formatting for card number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    setCardNumber(parts.join(' '));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    setExpiry(value);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <button 
        onClick={onBack} 
        className="mb-6 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors"
      >
        <i className="fa-solid fa-arrow-left"></i> Back to Seat Selection
      </button>

      <h2 className="text-2xl font-bold text-slate-900 mb-8">Secure Payment</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1 order-2 md:order-1">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>
            
            <div className="space-y-4 text-sm">
              <div className="pb-4 border-b border-slate-200">
                <div className="text-slate-500 mb-1">Flight</div>
                <div className="font-medium">{flight.airline} {flight.flightNumber}</div>
                <div className="text-slate-600">{flight.originCode} <i className="fa-solid fa-arrow-right text-xs mx-1"></i> {flight.destinationCode}</div>
              </div>

              <div className="pb-4 border-b border-slate-200">
                <div className="text-slate-500 mb-1">Seat</div>
                <div className="font-medium">Row {seat.row}, Seat {seat.col}</div>
                <div className="text-slate-600">{seat.class} Class</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Base Fare</span>
                  <span>₹{flight.price.toLocaleString('en-IN')}</span>
                </div>
                {seat.price > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Seat Selection</span>
                    <span>₹{seat.price.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-2 order-1 md:order-2">
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
               <div className="flex -space-x-2">
                 <div className="w-10 h-6 bg-slate-200 rounded text-[0.5rem] flex items-center justify-center font-bold text-slate-500 border border-white">VISA</div>
                 <div className="w-10 h-6 bg-slate-200 rounded text-[0.5rem] flex items-center justify-center font-bold text-slate-500 border border-white">MC</div>
               </div>
               <span className="text-sm text-slate-500">Encrypted & Secure</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-regular fa-credit-card text-slate-400"></i>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                    placeholder="123"
                    maxLength={3}
                    className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="JOHN DOE"
                  className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-brand-600 text-white py-4 rounded-lg font-bold text-lg shadow-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Processing...
                  </span>
                ) : (
                  <span>Pay ₹{totalAmount.toLocaleString('en-IN')}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;