import { Flight, Seat, Booking, BookingStatus } from '../types';

export interface Airport {
  code: string;
  city: string;
  name: string;
}

export const INDIAN_AIRPORTS: Airport[] = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International' },
  { code: 'AMD', city: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel' },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur International' },
  { code: 'LKO', city: 'Lucknow', name: 'Chaudhary Charan Singh' },
  { code: 'PAT', city: 'Patna', name: 'Jay Prakash Narayan' },
  { code: 'IXC', city: 'Chandigarh', name: 'Shaheed Bhagat Singh' },
  { code: 'BHO', city: 'Bhopal', name: 'Raja Bhoj' },
  { code: 'TRV', city: 'Thiruvananthapuram', name: 'Thiruvananthapuram Intl' },
  { code: 'GOI', city: 'Goa', name: 'Dabolim' },
  { code: 'GAU', city: 'Guwahati', name: 'Lokpriya Gopinath Bordoloi' },
  { code: 'BBI', city: 'Bhubaneswar', name: 'Biju Patnaik' },
  { code: 'RPR', city: 'Raipur', name: 'Swami Vivekananda' },
  { code: 'IXR', city: 'Ranchi', name: 'Birsa Munda' },
  { code: 'SXR', city: 'Srinagar', name: 'Sheikh ul-Alam' },
  { code: 'IXZ', city: 'Port Blair', name: 'Veer Savarkar' },
  { code: 'DED', city: 'Dehradun', name: 'Jolly Grant' },
  { code: 'VGA', city: 'Vijayawada', name: 'Vijayawada Airport' }, // AP Capital region
  { code: 'HGI', city: 'Itanagar', name: 'Donyi Polo' },
  { code: 'IMF', city: 'Imphal', name: 'Imphal Airport' },
  { code: 'SHL', city: 'Shillong', name: 'Shillong Airport' },
  { code: 'AJL', city: 'Aizawl', name: 'Lengpui Airport' },
  { code: 'DMU', city: 'Dimapur', name: 'Dimapur Airport' }, // Nagaland
  { code: 'PYG', city: 'Gangtok', name: 'Pakyong Airport' },
  { code: 'IXA', city: 'Agartala', name: 'Maharaja Bir Bikram' },
  { code: 'IXJ', city: 'Jammu', name: 'Jammu Airport' },
  { code: 'IXL', city: 'Leh', name: 'Kushok Bakula Rimpochee' },
  { code: 'AGX', city: 'Agatti', name: 'Agatti Airport' },
  { code: 'IDR', city: 'Indore', name: 'Devi Ahilya Bai Holkar' },
  { code: 'VTZ', city: 'Visakhapatnam', name: 'Visakhapatnam Airport' },
  { code: 'COK', city: 'Kochi', name: 'Cochin International' },
  { code: 'PNQ', city: 'Pune', name: 'Pune Airport' }
];

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'f1',
    airline: 'IndiGo',
    flightNumber: '6E-2045',
    origin: 'New Delhi',
    originCode: 'DEL',
    destination: 'Mumbai',
    destinationCode: 'BOM',
    departureTime: '2023-11-15T08:00:00',
    arrivalTime: '2023-11-15T10:15:00',
    price: 5500,
    duration: '2h 15m'
  },
  {
    id: 'f2',
    airline: 'Air India',
    flightNumber: 'AI-506',
    origin: 'Bengaluru',
    originCode: 'BLR',
    destination: 'New Delhi',
    destinationCode: 'DEL',
    departureTime: '2023-11-16T10:30:00',
    arrivalTime: '2023-11-16T13:15:00',
    price: 7200,
    duration: '2h 45m'
  },
  {
    id: 'f3',
    airline: 'Vistara',
    flightNumber: 'UK-815',
    origin: 'Mumbai',
    originCode: 'BOM',
    destination: 'Goa',
    destinationCode: 'GOI',
    departureTime: '2023-11-18T09:15:00',
    arrivalTime: '2023-11-18T10:30:00',
    price: 4200,
    duration: '1h 15m'
  },
  {
    id: 'f4',
    airline: 'SpiceJet',
    flightNumber: 'SG-102',
    origin: 'Kolkata',
    originCode: 'CCU',
    destination: 'Chennai',
    destinationCode: 'MAA',
    departureTime: '2023-11-20T14:00:00',
    arrivalTime: '2023-11-20T16:20:00',
    price: 6100,
    duration: '2h 20m'
  },
  {
    id: 'f5',
    airline: 'IndiGo',
    flightNumber: '6E-300',
    origin: 'Hyderabad',
    originCode: 'HYD',
    destination: 'Bengaluru',
    destinationCode: 'BLR',
    departureTime: '2023-11-22T11:00:00',
    arrivalTime: '2023-11-22T12:00:00',
    price: 3500,
    duration: '1h 00m'
  },
  {
    id: 'f6',
    airline: 'Air India Express',
    flightNumber: 'IX-402',
    origin: 'Jaipur',
    originCode: 'JAI',
    destination: 'Mumbai',
    destinationCode: 'BOM',
    departureTime: '2023-11-23T15:00:00',
    arrivalTime: '2023-11-23T16:45:00',
    price: 4800,
    duration: '1h 45m'
  },
  {
    id: 'f7',
    airline: 'Vistara',
    flightNumber: 'UK-994',
    origin: 'New Delhi',
    originCode: 'DEL',
    destination: 'Srinagar',
    destinationCode: 'SXR',
    departureTime: '2023-11-24T07:00:00',
    arrivalTime: '2023-11-24T08:30:00',
    price: 8500,
    duration: '1h 30m'
  },
  {
    id: 'f8',
    airline: 'IndiGo',
    flightNumber: '6E-555',
    origin: 'Patna',
    originCode: 'PAT',
    destination: 'New Delhi',
    destinationCode: 'DEL',
    departureTime: '2023-11-25T09:00:00',
    arrivalTime: '2023-11-25T10:45:00',
    price: 4100,
    duration: '1h 45m'
  },
  {
    id: 'f9',
    airline: 'Air India',
    flightNumber: 'AI-202',
    origin: 'Chennai',
    originCode: 'MAA',
    destination: 'Port Blair',
    destinationCode: 'IXZ',
    departureTime: '2023-11-26T05:30:00',
    arrivalTime: '2023-11-26T07:45:00',
    price: 9200,
    duration: '2h 15m'
  },
  {
    id: 'f10',
    airline: 'Akasa Air',
    flightNumber: 'QP-112',
    origin: 'Ahmedabad',
    originCode: 'AMD',
    destination: 'Bengaluru',
    destinationCode: 'BLR',
    departureTime: '2023-11-27T18:00:00',
    arrivalTime: '2023-11-27T20:15:00',
    price: 5300,
    duration: '2h 15m'
  }
];

export const generateSeats = (flightId: string): Seat[] => {
  const seats: Seat[] = [];
  const rows = 10;
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (let r = 1; r <= rows; r++) {
    for (const c of cols) {
      seats.push({
        id: `${flightId}-${r}${c}`,
        row: r,
        col: c,
        isOccupied: Math.random() < 0.3, // 30% random occupancy
        class: r <= 2 ? 'Business' : 'Economy',
        price: r <= 2 ? 2500 : 0 // Surcharge for business in INR
      });
    }
  }
  return seats;
};

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    flightId: 'f1',
    flight: MOCK_FLIGHTS[0],
    seatId: 'f1-3A',
    status: BookingStatus.COMPLETED,
    dateBooked: '2023-10-01T10:00:00',
    passengerName: 'Rahul Sharma'
  }
];