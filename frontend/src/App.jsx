import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider from your AuthContext file
import './App.css';
import Home from './components/Homepage/Home.jsx';
import SignIn from './components/Auth/SignIn.jsx';
import SignUp from './components/Auth/Signup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import StaffDashboard from './components/StaffDashboard.jsx';
import StaffMain from './components/StaffMain.jsx';
import AdminStaffInfo from './components/AdminStaffInfo.jsx';
import Profile from './components/Profile.jsx';
import AddRoom from './components/AddRoom'
import Rooms from './components/Rooms';
import DashboardStats from './components/DashboardStats';

function App() {
  return (
    <div className="App">
      <AuthProvider> 
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/StaffMain' element={<StaffMain />} />
            <Route path='/add-room' element={<AddRoom/>} />
            <Route path='/AdminDashboard' element={<AdminDashboard />} />
            <Route path='/StaffDashboard' element={<StaffDashboard />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/Signup' element={<SignUp />} />
            <Route path='/AdminStaffInfo' element={<AdminStaffInfo />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Rooms' element={<Rooms />} />
            <Route path='/employees' element={<AdminStaffInfo />} />
            <Route path='/dashboardstats' element={<DashboardStats />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
