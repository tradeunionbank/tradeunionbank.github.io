// Transfer.jsx
import React, { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Button } from './Button';
import { FaArrowAltCircleLeft, FaArrowAltCircleUp, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Transfers = () => {
  const navigate = useNavigate();

  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(localStorage.getItem('accountBlocked') === 'true');

  const [errors, setErrors] = useState({
    bank: '',
    accountNumber: '',
    routingNumber: '',
  });

  const handlePay = () => {
    const newErrors = {
      bank: bank ? '' : 'Bank name is required.',
      accountNumber: accountNumber ? '' : 'Account number is required.',
      routingNumber: routingNumber ? '' : 'Routing number is required.',
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === '');

    if (isValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowMessage(true);
        localStorage.setItem('accountBlocked', 'true');
      }, 5000);
    }
  };

  useEffect(() => {
    ScrollReveal().reveal('.sr', {
      delay: 100,
      distance: '30px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 300,
      reset: false,
    });
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sr relative mb-10 flex items-center justify-start">
        <Button className="flex gap-2 rounded-3xl mt-2" onClick={() => navigate(-1)}>
          <FaArrowAltCircleLeft className="mt-1" />
          Back
        </Button>
        <p className="sr tlb absolute left-1/2 transform ml-2 -translate-x-1/2 font-semibold">
          Transfer to Local / International Banks
        </p>
      </header>

      {/* Balance */}
      <div className="sr bg-white p-4 container rounded-2xl mb-8">
        <div className="balance p-4 rounded-lg flex items-center justify-center gap-2">
          <h2 className="bal font-bold text-3xl">$200,052,938.34</h2>
        </div>
        <div className="ab flex justify-center font-bold border-b rounded mt-2 tracking-widest">
          <p>Available Balance</p>
        </div>
      </div>

      {/* Form */}
      <form className="sr form flex flex-col gap-6 p-16 border rounded-3xl">
        <div className="flex flex-col justify-center w-full">
          <input
            type="text"
            placeholder="Bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="inp w-full text-xl border-transparent rounded-full text-start m-4 p-4"
          />
          {errors.bank && <span className="text-red-500 text-sm ml-4 mt-[-1rem]">{errors.bank}</span>}
        </div>

        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-full">
            <input
              type="number"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="inp font-bold text-xl border-transparent rounded-full text-start m-4 p-4"
            />
            {errors.accountNumber && <span className="text-red-500 text-sm ml-4 mt-[-1rem]">{errors.accountNumber}</span>}
          </div>

          <div className="flex flex-col w-full">
            <input
              type="number"
              placeholder="Routing Number"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              className="inp font-bold text-xl border-transparent rounded-full text-start m-4 p-4"
            />
            {errors.routingNumber && <span className="text-red-500 text-sm ml-4 mt-[-1rem]">{errors.routingNumber}</span>}
          </div>
        </div>
      </form>

      {/* Pay Button */}
      <div className="sr flex flex-row justify-center mt-6">
        <Button
          className="w-full flex justify-center items-center gap-2 mb-4 rounded-3xl m-6"
          onClick={handlePay}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin"></div>
          ) : (
            <>
              <FaArrowAltCircleUp className="mt-1" />
              Pay
            </>
          )}
        </Button>
      </div>

      {/* Block Message */}
      {showMessage && (
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
    </div>
  );
};

export default Transfers;
