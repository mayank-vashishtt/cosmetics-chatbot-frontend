import React from 'react';
import { FiUser, FiBell, FiLogOut } from 'react-icons/fi';
import { FaHotel } from 'react-icons/fa';
import './ChatHeader.css';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
  const navigate = useNavigate();

  const goToLandingPage = () => {
    navigate('/');
  };

  return (
    <div className="chat-header">
      <FaHotel className="icon" onClick={goToLandingPage} />
      <div className="header-info">
        <span>ChatBot</span>
        <span></span>
      </div>
      <div className="header-icons">
        <FiBell className="icon" />
        <FiUser className="icon" />
        <FiLogOut className="icon" />
      </div>
    </div>
  );
}

export default ChatHeader;
