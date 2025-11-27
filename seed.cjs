// File: seed.cjs
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables (like MONGO_URI)
dotenv.config();

// Require the Flight model (ensure this path and extension is correct)
const Flight = require('./models/Flight.cjs'); 

// The MongoDB Connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skyhighDB';

// --- FLIGHT DATA (Copied from your mockData.ts) ---
const MOCK_FLIGHTS_DATA = [
  {
    flightId: 'f1', // Using flightId for schema, map from 'id'
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
    flightId: 'f2',
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
    flightId: 'f3',
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
    flightId: 'f4',
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
    flightId: 'f5',
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
    flightId: 'f6',
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
    flightId: 'f7',
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
    flightId: 'f8',
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
    flightId: 'f9',
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
    flightId: 'f10',
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
// --- END FLIGHT DATA ---


const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('--- MongoDB Connected for Seeding ---');

        // 1. CLEAR existing data (Optional, but recommended for clean testing)
        await Flight.deleteMany({});
        console.log('✅ Existing flights deleted.');

        // 2. INSERT new data
        // We map the 'id' field from your mock data to the 'flightId' field in the Mongoose schema
        const flightsToInsert = MOCK_FLIGHTS_DATA.map(flight => ({
            ...flight,
            // Remove the redundant 'id' field if your schema doesn't need it
            id: undefined,
            // Mongoose automatically uses the flightId field from the mock data as per schema.
        }));

        await Flight.insertMany(flightsToInsert);
        console.log(`✅ ${flightsToInsert.length} new flights successfully seeded!`);

    } catch (error) {
        console.error('❌ SEEDING FAILED:', error.message);
    } finally {
        // 3. Disconnect from DB
        await mongoose.connection.close();
        console.log('--- Database connection closed ---');
        process.exit();
    }
}

seedDB();