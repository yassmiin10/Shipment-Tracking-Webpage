import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTracking } from '../store/trackingSlice';
import { FaSearch } from "react-icons/fa"; 
import './TrackingSearch.css';

const TrackingSearch: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      dispatch(fetchTracking(trackingNumber) as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tracking-search">
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="رقم التتبع"
        className="tracking-input"
      />
      <button type="submit" className="search-button">
      <FaSearch size={20} color="white" />
      </button>
    </form>
  );
};

export default TrackingSearch;


