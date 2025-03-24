import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tabs from './Tabs';

import Dashboard from './moduls/Dashboard';
import Banking from './moduls/Banking';
import Telefonie from './moduls/Telefonie';
import Accounting from './moduls/Accounting';
import Verkauf from './moduls/Verkauf';
import PostOffice from './moduls/PostOffice';
import Statistik from './moduls/Statistik';
import Administration from './moduls/Administration';
import Help from './moduls/Help';
import Warenbestand from './moduls/Warenbestand';
import Auswahllisten from './moduls/Auswahllisten';
import Einkauf from './moduls/Einkauf';
import Rechn from './moduls/Rechn';

import './App.css';

// test git

function App() {
  return (
    <Router>
      <div>
        <Tabs />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Banking" element={<Banking />} />
          <Route path="/Telefonie" element={<Telefonie />} />
          <Route path="/Accounting" element={<Accounting />} />
          <Route path="/Verkauf" element={<Verkauf />} />
          <Route path="/Post-Office" element={<PostOffice />} />
          <Route path="/Statistik" element={<Statistik />} />
          <Route path="/Administration" element={<Administration />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Warenbestand" element={<Warenbestand />} />
          <Route path="/Auswahllisten" element={<Auswahllisten />} />
          <Route path="/Einkauf" element={<Einkauf />} />
          <Route path="/Rechn" element={<Rechn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
