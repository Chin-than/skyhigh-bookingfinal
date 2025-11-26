import React, { useState, useEffect } from 'react';
import { Flight, Seat, User } from '../types';
import { generateSeats } from '../services/mockData';

interface SeatSelectionProps {
  flight: Flight;
  user: User;
  onBook: (seat: Seat) => void;
  onCancel: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ flight, onBook, onCancel }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  useEffect(() => {
    // Simulate fetching seats
    const flightSeats = generateSeats(flight.id);
    setSeats(flightSeats);
  }, [flight.id]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isOccupied) return;
    if (selectedSeat?.id === seat.id) {
        setSelectedSeat(null);
    } else {
        setSelectedSeat(seat);
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.isOccupied) return 'bg-slate-300 cursor-not-allowed text-slate-400';
    if (selectedSeat?.id === seat.id) return 'bg-brand-600 text-white shadow-md ring-4 ring-brand-200 scale-110 z-10';
    if (seat.class === 'Business') return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-200';
    return 'bg-white border border-slate-200 text-slate-700 hover:bg-brand-50 hover:border-brand-300';
  };

  const getSeatType = (col: string) => {
      if (['A', 'F'].includes(col)) return 'Window';
      if (['C', 'D'].includes(col)) return 'Aisle';
      return 'Middle';
  };

  // Group seats by row for rendering
  const rows = Array.from(new Set(seats.map(s => s.row))).sort((a, b) => a - b);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onCancel} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors">
            <i className="fa-solid fa-arrow-left"></i> Back to Flights
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Select Your Seat</h2>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seat Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-slate-300"></div>
                    <span className="text-slate-600">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-white border border-slate-300"></div>
                    <span className="text-slate-600">Economy</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-indigo-100 border border-indigo-200"></div>
                    <span className="text-slate-600">Business</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-brand-600 flex items-center justify-center text-white"><i className="fa-solid fa-check text-[10px]"></i></div>
                    <span className="text-slate-600">Selected</span>
                </div>
            </div>

            {/* Plane Fuselage Visual */}
            <div className="bg-slate-50 rounded-t-[4rem] border-t-4 border-x-4 border-slate-200 pt-16 pb-10 px-4 md:px-8 relative">
                 <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-slate-300 text-5xl opacity-20">
                    <i className="fa-brands fa-avianex"></i>
                 </div>
                 
                 {/* Column Headers for Seat Types */}
                 <div className="flex justify-between items-center mb-4 text-[10px] text-slate-400 uppercase tracking-tighter font-semibold text-center">
                    <div className="w-4"></div> {/* Row Number Spacer */}
                    <div className="flex gap-2">
                        <div className="w-10">Window</div>
                        <div className="w-10">Middle</div>
                        <div className="w-10">Aisle</div>
                    </div>
                    <div className="w-8"></div> {/* Aisle Spacer */}
                    <div className="flex gap-2">
                        <div className="w-10">Aisle</div>
                        <div className="w-10">Middle</div>
                        <div className="w-10">Window</div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    {rows.map(rowNum => {
                        const rowSeats = seats.filter(s => s.row === rowNum).sort((a, b) => a.col.localeCompare(b.col));
                        const leftSide = rowSeats.slice(0, 3);
                        const rightSide = rowSeats.slice(3, 6);

                        return (
                            <div key={rowNum} className="flex justify-between items-center group">
                                <span className="text-xs text-slate-400 w-4 font-mono">{rowNum}</span>
                                <div className="flex gap-2">
                                    {leftSide.map(seat => (
                                        <button
                                            key={seat.id}
                                            onClick={() => handleSeatClick(seat)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 relative ${getSeatColor(seat)}`}
                                            disabled={seat.isOccupied}
                                            title={`Row ${seat.row} Seat ${seat.col} (${getSeatType(seat.col)}) - ₹${seat.price}`}
                                        >
                                            {selectedSeat?.id === seat.id ? (
                                                <i className="fa-solid fa-check text-lg"></i>
                                            ) : (
                                                <>
                                                   {seat.col}
                                                   {getSeatType(seat.col) === 'Window' && !seat.isOccupied && (
                                                       <i className="fa-solid fa-cloud absolute -top-1 -left-1 text-[8px] text-slate-300"></i>
                                                   )}
                                                </>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-8 flex justify-center items-center text-slate-300 text-xs h-full">
                                    <div className="h-1 w-1 bg-slate-300 rounded-full opacity-30"></div>
                                </div>
                                <div className="flex gap-2">
                                    {rightSide.map(seat => (
                                        <button
                                            key={seat.id}
                                            onClick={() => handleSeatClick(seat)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 relative ${getSeatColor(seat)}`}
                                            disabled={seat.isOccupied}
                                            title={`Row ${seat.row} Seat ${seat.col} (${getSeatType(seat.col)}) - ₹${seat.price}`}
                                        >
                                             {selectedSeat?.id === seat.id ? (
                                                <i className="fa-solid fa-check text-lg"></i>
                                            ) : (
                                                <>
                                                   {seat.col}
                                                   {getSeatType(seat.col) === 'Window' && !seat.isOccupied && (
                                                       <i className="fa-solid fa-cloud absolute -top-1 -right-1 text-[8px] text-slate-300"></i>
                                                   )}
                                                </>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                 </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-slate-400">
                <p>Front of Aircraft <i className="fa-solid fa-arrow-up ml-1"></i></p>
            </div>
        </div>

        {/* Selection Summary */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Flight</span>
                        <div className="font-medium text-slate-900">{flight.airline} {flight.flightNumber}</div>
                        <div className="text-sm text-slate-500">{flight.originCode} <i className="fa-solid fa-arrow-right text-xs mx-1"></i> {flight.destinationCode}</div>
                    </div>
                    
                    <div>
                         <span className="text-xs text-slate-500 uppercase tracking-wide">Seat</span>
                         <div className="font-medium text-slate-900 text-lg flex items-center gap-2">
                            {selectedSeat ? (
                                <>
                                    <span>{selectedSeat.row}{selectedSeat.col}</span>
                                    <span className="text-sm font-normal text-slate-500">({selectedSeat.class})</span>
                                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600 border border-slate-200">
                                        {getSeatType(selectedSeat.col)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-slate-400 italic">No seat selected</span>
                            )}
                         </div>
                    </div>

                     <div>
                         <span className="text-xs text-slate-500 uppercase tracking-wide">Price Breakdown</span>
                         <div className="flex justify-between text-sm mt-1">
                             <span className="text-slate-600">Base Fare</span>
                             <span className="text-slate-900">₹{flight.price.toLocaleString('en-IN')}</span>
                         </div>
                         {selectedSeat && selectedSeat.price > 0 && (
                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-slate-600">Seat Selection ({selectedSeat.class})</span>
                                <span className="text-slate-900">+₹{selectedSeat.price.toLocaleString('en-IN')}</span>
                            </div>
                         )}
                         <div className="border-t border-slate-100 mt-2 pt-2 flex justify-between font-bold">
                             <span className="text-slate-900">Total</span>
                             <span className="text-brand-600 text-lg">
                                ₹{(selectedSeat ? flight.price + selectedSeat.price : flight.price).toLocaleString('en-IN')}
                             </span>
                         </div>
                    </div>
                </div>

                <button
                    disabled={!selectedSeat}
                    onClick={() => selectedSeat && onBook(selectedSeat)}
                    className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all transform ${
                        selectedSeat 
                        ? 'bg-brand-600 text-white hover:bg-brand-700 hover:scale-[1.02] hover:shadow-brand-200' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    Proceed to Payment <i className="fa-solid fa-chevron-right ml-1"></i>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;