import React from 'react';
import { Booking, BookingStatus as StatusEnum } from '../types';

interface BookingStatusProps {
  bookings: Booking[];
}

const BookingStatus: React.FC<BookingStatusProps> = ({ bookings }) => {
  const getStatusColor = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.CONFIRMED: return 'bg-green-100 text-green-800 border-green-200';
      case StatusEnum.PENDING: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case StatusEnum.CANCELLED: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-8">My Bookings</h2>
      
      {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-ticket text-3xl text-slate-300"></i>
              </div>
              <h3 className="text-xl font-medium text-slate-900">No bookings yet</h3>
              <p className="text-slate-500 mt-2">Looks like you haven't booked any flights yet.</p>
          </div>
      ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                             <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                                 <i className="fa-solid fa-plane"></i>
                             </div>
                             <div>
                                 <span className="text-sm text-slate-500 block">Booking Reference</span>
                                 <span className="font-mono font-bold text-slate-900 tracking-wider">#{booking.id.toUpperCase().substring(0, 8)}</span>
                             </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                        </span>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="text-2xl font-bold text-slate-900">{booking.flight.originCode}</div>
                                    <div className="flex-1 border-t-2 border-dashed border-slate-300 relative min-w-[3rem]">
                                        <i className="fa-solid fa-plane absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-slate-400 text-xs bg-white px-1"></i>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900">{booking.flight.destinationCode}</div>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>{booking.flight.origin}</span>
                                    <span>{booking.flight.destination}</span>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {new Date(booking.flight.departureTime).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                                </div>
                            </div>

                            <div className="flex gap-8 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Time</div>
                                    <div className="font-bold text-slate-900">{new Date(booking.flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Flight</div>
                                    <div className="font-bold text-slate-900">{booking.flight.flightNumber}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Seat</div>
                                    <div className="font-bold text-brand-600">{booking.seatId.split('-')[1]}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-sm">
                        <span className="text-slate-500">Booked on {new Date(booking.dateBooked).toLocaleDateString()}</span>
                        <button className="text-brand-600 font-medium hover:text-brand-800">Download Ticket</button>
                    </div>
                </div>
            ))}
          </div>
      )}
    </div>
  );
};

export default BookingStatus;