import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaHeadset } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Button } from "../components/Button";
import { transferHistory } from "../transferHistory";
import ScrollReveal from "scrollreveal";

const DashBoard = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showBlockMessage, setShowBlockMessage] = useState(localStorage.getItem('accountBlocked') === 'true');

  const visibleTransfers = showAll ? transferHistory : transferHistory.slice(0, 7);

  const newDate = new Date();
  const hour = newDate.getHours();
  const greeting =
    hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" :
    "Good Evening";

  useEffect(() => {
    ScrollReveal().reveal('.sr', {
      delay: 100,
      distance: '30px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 300,
      reset: false
    });
  }, []);

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.setItem('accountBlocked', 'false'); // Reset block status when logging out
      navigate('/');
    }, 1000);
  };

  const handleChequesAndCardsClick = () => {
    setTimeout(() => {
      setComingSoonMessage("Can't process this at the moment!");
    }, 1000);
  };

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  return (
    <div className="min-h-screen">
      {/* Blocked Message */}
      {showBlockMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center gap-4 text-white p-6 text-center">
          <p>Unrecognized IP Address. This account has been blocked</p>
          <span>Contact our customer support below for account reactivation.</span>

          <div className="butt flex justify-center p-2 border-transparent rounded-full absolute bottom-6 right-6">
            <button onClick={() => navigate('/customercare')} className="flex items-center">
              <FaHeadset className="text-xl text-white" />
            </button>
          </div>
        </div>
      )}

      <div className='sr flex justify-between mt-2 px-4'>
        {/* Profile Image & Toggle */}
        <div className="relative flex items-start">
          <button
            className="mt-2 img-dv"
            onClick={toggleProfile}
          >
            <img src="public/leebyunghun.jpg" alt="lee" className='w-10 h-10 rounded-full' />
          </button>

          {showProfile && (
            <div className="sr profile absolute left-full top-0 ml-4 border h-[170px] p-4 shadow-lg rounded-xl ">
              <div className="gap-2 -mt-2 p-1">
                <p className="pee font-bold mb-2 text-center">Lee Byung Hun</p>
                <p className="pee font-bold mb-2 text-center"> 78035589212</p>
                <p className="pee font-bold mb-2 text-center"> 382994526</p>
              </div>
            </div>
          )}
        </div>

        {/* Customer Care */}
        <div className="sr border-transparent grid grid-col-2 mt-1 rounded-3xl m-2 p-2 gap-1">
          <div className='flex justify-center p-2 border-transparent rounded-full'>
            <button onClick={() => navigate('/customercare')} className="flex items-center">
              <FaHeadset />
            </button>
          </div>
        </div>
      </div>

      {/* Greeting */}
      {!showProfile && (
        <div className="sr greeting font-bold text-2xl mb-4 px-4">
          <h1>{greeting}, <br /> Lee!</h1>
        </div>
      )}

      {/* Balance */}
      <div className={`sr bg-white p-4 container rounded-2xl mb-8 mx-4 transition-all duration-300 ${showProfile ? 'mt-28' : ''}`}>
        <div className="balance p-4 rounded-lg flex items-center justify-center gap-2">
          <h2 className="bal font-bold text-3xl">$200,052,938.34</h2>
        </div>
        <div className="ab flex justify-center font-bold border-b rounded mt-2 tracking-widest">
          <p>Available Balance</p>
        </div>
      </div>

      {/* Main Buttons */}
      <div className="sr bg-white p-12 rounded-2xl shadow col-span flex flex-col gap-4 mb-6 border-t mx-4">
        <div className="grid p-4 grid-cols-2 gap-8">
          {["TopUp", "Transfers", "Loans", "Investments"].map((action, index) => (
            <Button key={index} className="w-full font-bold" onClick={() => navigate(`/${action.toLowerCase()}`)}>
              {action}
            </Button>
          ))}
        </div>

        <div className='cc font-bold flex justify-center border-transparent rounded-full mb-4'>
          <Button onClick={handleChequesAndCardsClick}>
            <p>Cheques & Cards</p>
          </Button>
        </div>

        {/* Coming Soon Message */}
        {comingSoonMessage && (
          <div className="absolute top-8 left-1/2 transform gap-4 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-xl text-center w-[300px] shadow-lg">
            {comingSoonMessage}
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="sr tf p-4 rounded-2xl shadow flex-col mx-4 bg-white">
        <h2 className="quick border-transparent font-bold text-2xl flex justify-center rounded-full p-2 mb-4">
          Transaction History
        </h2>
        <ul className="space-y-2">
          {visibleTransfers.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center border-b rounded-xl border-gray-400 pb-2">
              <div className="px-4 mr-4 mb-2">
                <p className="li font-bold">{tx.name}</p>
                <small className="text-gray-300">{tx.date}</small>
              </div>
              <span className={`font-semibold ${tx.amount.startsWith('+') ? 'text-green-300' : 'text-red-300'}`}>
                {tx.amount}
              </span>
            </li>
          ))}
        </ul>

        {transferHistory.length > 5 && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => navigate("/transferhistorypage")}
              className="text-sm text-white border-transparent font-bold rounded-lg px-4 py-2"
            >
              See More
            </Button>
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="sr flex justify-center p-4">
        <Button onClick={handleLogout} variant="destructive" className="flex items-center font-bold gap-2">
          <MdLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashBoard;
