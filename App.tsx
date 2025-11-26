import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import FlightSearch from './components/FlightSearch';
import SeatSelection from './components/SeatSelection';
import BookingStatus from './components/BookingStatus';
import Profile from './components/Profile';
import Payment from './components/Payment';
import { User, AppRoute, Flight, Seat, Booking, BookingStatus as BookingStatusEnum } from './types';
import { MOCK_BOOKINGS } from './services/mockData';

const App: React.FC = () => {
  // Helper to extract route from hash
  const getHashRoute = (): AppRoute => {
    const hash = window.location.hash.replace('#/', '');
    // Check if the hash matches a known route, otherwise default to LOGIN
    const isValidRoute = Object.values(AppRoute).includes(hash as AppRoute);
    return isValidRoute ? (hash as AppRoute) : AppRoute.LOGIN;
  };

  const [user, setUser] = useState<User | null>(null);
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getHashRoute());
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  // Sync state with hash changes (Back/Forward button support)
  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getHashRoute();
      console.log('Route changed to:', newRoute);
      setCurrentRoute(newRoute);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial hash if empty
    if (!window.location.hash) {
      window.location.hash = `#/${AppRoute.LOGIN}`;
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isProfileComplete = (u: User) => {
    return !!(u.name && u.email && u.dob && u.address && u.gender && u.nationality);
  };

  const handleLogin = (newUser: User, isNewUser: boolean) => {
    setUser(newUser);
    if (isNewUser || !isProfileComplete(newUser)) {
      navigate(AppRoute.PROFILE);
    } else {
      navigate(AppRoute.SEARCH);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedFlight(null);
    setSelectedSeat(null);
    navigate(AppRoute.LOGIN);
  };

  // Centralized navigation function that updates URL and State
  const navigate = (route: AppRoute) => {
    window.location.hash = `#/${route}`;
    setCurrentRoute(route); // Immediate update for responsiveness
  };

  const handleNavigate = (route: AppRoute) => {
    // Prevent navigation to Search/Seats if profile is incomplete
    // Allow Profile and Bookings pages to be accessible
    if (user && !isProfileComplete(user)) {
      if (route !== AppRoute.PROFILE && route !== AppRoute.BOOKINGS && route !== AppRoute.LOGIN && route !== AppRoute.SIGNUP) {
        alert("Please complete your profile information before booking flights.");
        navigate(AppRoute.PROFILE);
        return;
      }
    }
    navigate(route);
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    navigate(AppRoute.SEATS);
  };

  const handleSeatSelected = (seat: Seat) => {
    setSelectedSeat(seat);
    navigate(AppRoute.PAYMENT);
  };

  const handlePaymentSuccess = () => {
    if (!user || !selectedFlight || !selectedSeat) return;

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(7),
      flightId: selectedFlight.id,
      flight: selectedFlight,
      seatId: selectedSeat.id,
      status: BookingStatusEnum.CONFIRMED,
      dateBooked: new Date().toISOString(),
      passengerName: user.name
    };

    setBookings([newBooking, ...bookings]);
    
    // Reset selection states
    setSelectedFlight(null);
    setSelectedSeat(null);
    
    navigate(AppRoute.BOOKINGS);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  // Render Logic
  const renderContent = () => {
    // If user is not logged in, enforce Auth pages
    if (!user) {
        if (currentRoute === AppRoute.SIGNUP) {
            return <Signup onSignup={(u) => handleLogin(u, true)} onNavigate={handleNavigate} />;
        }
        // Default to login for any other protected route if not logged in
        return <Login onLogin={(u) => handleLogin(u, false)} onNavigate={handleNavigate} />;
    }

    switch (currentRoute) {
      case AppRoute.SEARCH:
        // Double check safeguard
        if (!isProfileComplete(user)) {
           return <Profile user={user} onUpdate={handleUpdateProfile} required={true} />;
        }
        return <FlightSearch onSelectFlight={handleSelectFlight} />;
      case AppRoute.SEATS:
        if (!selectedFlight) {
           // Use setTimeout to avoid render loop warning, but also allow UI to update
           setTimeout(() => navigate(AppRoute.SEARCH), 0);
           return <div className="p-12 text-center text-slate-500">Redirecting to search...</div>;
        }
        return (
          <SeatSelection 
            flight={selectedFlight} 
            user={user} 
            onBook={handleSeatSelected}
            onCancel={() => navigate(AppRoute.SEARCH)}
          />
        );
      case AppRoute.PAYMENT:
          if (!selectedFlight || !selectedSeat) {
             setTimeout(() => navigate(AppRoute.SEARCH), 0);
             return <div className="p-12 text-center text-slate-500">Redirecting...</div>;
          }
          return (
            <Payment 
              flight={selectedFlight}
              seat={selectedSeat}
              onPaymentComplete={handlePaymentSuccess}
              onBack={() => navigate(AppRoute.SEATS)}
            />
          );
      case AppRoute.BOOKINGS:
        return <BookingStatus bookings={bookings} />;
      case AppRoute.PROFILE:
        return <Profile user={user} onUpdate={handleUpdateProfile} required={!isProfileComplete(user)} />;
      case AppRoute.LOGIN:
      case AppRoute.SIGNUP:
          // If logged in and trying to access auth pages, redirect to search
          setTimeout(() => navigate(AppRoute.SEARCH), 0);
          return null;
      default:
        // Fallback for unknown routes
        return <FlightSearch onSelectFlight={handleSelectFlight} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar 
        user={user} 
        currentRoute={currentRoute} 
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <main className="flex-grow animate-fade-in">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;