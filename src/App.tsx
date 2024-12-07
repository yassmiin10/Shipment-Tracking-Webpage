
import React from 'react';
import TrackingSearch from './components/TrackingSearch';
import TrackingDetails from './components/TrackingDetails';
import './App.css';
import Logo from './assets/logo.png';

function App() {
  return (
    <div className="app" dir="rtl">
      <header className="app-header">
        <img src={Logo} alt="Bosta Logo Arabic" className="logo" />
        <nav>
          <ul>
            <li>الرئيسية</li>
            <li>الأسعار</li>
            <li>كلم المبيعات</li>
          </ul>
        </nav>
        <div className="language-switcher">
          <span>ENG</span>
          <span className="active">عربي</span>
        </div>
      </header>
      <main>
        <h1>تتبع شحنتك</h1>
        <TrackingSearch />
        <TrackingDetails />
      </main>
    </div>
  );
}

export default App;


