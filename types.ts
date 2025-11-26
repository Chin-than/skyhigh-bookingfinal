export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  // New personal info fields
  dob?: string;
  address?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  nationality?: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
}

export interface Seat {
  id: string;
  row: number;
  col: string; // A, B, C, D, E, F
  isOccupied: boolean;
  class: 'Economy' | 'Business' | 'First';
  price: number;
}

export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed'
}

export interface Booking {
  id: string;
  flightId: string;
  flight: Flight;
  seatId: string;
  status: BookingStatus;
  dateBooked: string;
  passengerName: string;
}

export enum AppRoute {
  LOGIN = 'login',
  SIGNUP = 'signup',
  SEARCH = 'search',
  SEATS = 'seats',
  PAYMENT = 'payment',
  BOOKINGS = 'bookings',
  PROFILE = 'profile'
}