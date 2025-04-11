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
  const [showMessage, setShowMessage] = useState(false);

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

      // Show message after 5 seconds
      setTimeout(() => {
        setIsLoading(false);
        setShowMessage(true);
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
      <header className="sr relative mb-10 flex items-center justify-start">
        <Button
          className="flex gap-2 rounded-3xl mt-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowAltCircleLeft className="mt-1" />
          Back
        </Button>

        <p className="sr tlb absolute left-1/2 transform ml-2 -translate-x-1/2 font-semibold">
          Transfer to Local Banks
        </p>
      </header>

      <div className="sr bg-white p-4 container rounded-2xl mb-8">
        <div className="balance p-4 rounded-lg flex items-center justify-center gap-2">
          <h2 className="bal font-bold text-3xl">$200,052,938.34</h2>
        </div>
        <div className="ab flex justify-center font-bold border-b rounded mt-2 tracking-widest">
          <p>Available Balance</p>
        </div>
      </div>

      <form className="sr form flex flex-col gap-6 p-16 border rounded-3xl">
        <div className="flex flex-col justify-center w-full">
          <input
            type="text"
            placeholder="Bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="inp w-full text-xl border-transparent rounded-full text-start m-4 p-4"
          />
          {errors.bank && (
            <span className="text-red-500 text-sm ml-4 mt-[-1rem]">{errors.bank}</span>
          )}
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
            {errors.accountNumber && (
              <span className="text-red-500 text-sm ml-4 mt-[-1rem]">{errors.accountNumber}</span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <input
              type="number"
              placeholder="Routing Number"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              className="inp font-bold text-xl border-transparent rounded-full text-start m-4 p-4"
            />
            {errors.routingNumber && (
              <span className="text-red-500 text-sm ml-4 mt-[-1rem]">{errors.routingNumber}</span>
            )}
          </div>
        </div>
      </form>

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

      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform gap-4 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-xl text-center w-[300px] shadow-lg">
          <p>Your account is under review, can't process this at the moment.</p>
          <span>Contact our customer support below for account reactivation.</span>
        </div>
      )}

      {showMessage && (
        <div className="butt flex justify-center p-2 border-transparent rounded-full absolute bottom-6 right-6">
          <button onClick={() => navigate('/customercare')} className="flex items-center">
            <FaHeadset className="text-xl text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Transfers;
