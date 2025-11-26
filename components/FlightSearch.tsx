import React, { useState, useMemo } from 'react';
import { Flight } from '../types';
import { MOCK_FLIGHTS, INDIAN_AIRPORTS } from '../services/mockData';

interface FlightSearchProps {
  onSelectFlight: (flight: Flight) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onSelectFlight }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter(flight => {
      const matchFrom = from ? flight.originCode === from : true;
      const matchTo = to ? flight.destinationCode === to : true;
      // Simple date matching - in real app would parse dates
      return matchFrom && matchTo;
    });
  }, [from, to]);

  // Sort airports by city name for easier searching
  const sortedAirports = useMemo(() => {
      return [...INDIAN_AIRPORTS].sort((a, b) => a.city.localeCompare(b.city));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-brand-600 px-6 py-8 sm:px-12 sm:py-10 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Explore India with SkyHigh
          </h2>
          <p className="mt-2 text-lg text-brand-100">
            Book domestic flights to over 30 destinations across the country.
          </p>
        </div>
        
        <div className="p-6 sm:p-8 bg-white">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-slate-700">From</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-plane-departure text-slate-400"></i>
                </div>
                <select
                  id="from"
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-3 border px-3 bg-white"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                >
                    <option value="">Select Origin</option>
                    {sortedAirports.map(airport => (
                        <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                        </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-slate-700">To</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-plane-arrival text-slate-400"></i>
                </div>
                <select
                  id="to"
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-3 border px-3 bg-white"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                >
                    <option value="">Select Destination</option>
                    {sortedAirports.map(airport => (
                        <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                        </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <i className="fa-regular fa-calendar text-slate-400"></i>
                </div>
                <input
                  type="date"
                  id="date"
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-3 border px-3"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Available Flights</h3>
            <span className="text-sm text-slate-500">{filteredFlights.length} results found</span>
        </div>
        
        {filteredFlights.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
              <i className="fa-solid fa-plane-slash text-4xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">No flights found matching your criteria.</p>
              <button 
                onClick={() => {setFrom(''); setTo('');}}
                className="mt-4 text-brand-600 font-medium hover:text-brand-800"
              >
                Clear Filters
              </button>
           </div>
        ) : (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row">
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                      {flight.airline}
                    </span>
                    <span className="text-sm text-slate-500">{flight.flightNumber}</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    <div className="text-sm font-medium text-slate-500">{flight.originCode}</div>
                  </div>
                  
                  <div className="flex-1 px-4 flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-1">{flight.duration}</div>
                    <div className="w-full h-px bg-slate-300 relative">
                        <i className="fa-solid fa-plane absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-300 text-xs bg-white px-1"></i>
                    </div>
                    <div className="text-xs text-brand-600 mt-1 font-medium">Direct</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    <div className="text-sm font-medium text-slate-500">{flight.destinationCode}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-100 min-w-[200px]">
                <div className="text-3xl font-bold text-slate-900 mb-2">₹{flight.price.toLocaleString('en-IN')}</div>
                <div className="text-xs text-slate-500 mb-4">per person</div>
                <button
                  onClick={() => onSelectFlight(flight)}
                  className="w-full bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors shadow-sm"
                >
                  Select Flight
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlightSearch;