import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider from your AuthContext file
import './App.css';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/Signup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import StaffDashboard from './components/StaffDashboard.jsx';
import StaffMain from './components/StaffMain.jsx';
import AdminStaffInfo from './components/AdminStaffInfo.jsx';
import AdminReport from './components/AdminReport.jsx';
import Profile from './components/Profile.jsx';
import AddRoom from './components/AddRoom'
import Rooms from './components/Rooms';

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
            <Route path='/AdminReport' element={<AdminReport />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Rooms' element={<Rooms />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
