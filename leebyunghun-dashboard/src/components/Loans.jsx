import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeadset, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Button } from '../components/Button';
import ScrollReveal from 'scrollreveal';

const Loans = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ScrollReveal().reveal('.sr', {
      delay: 100,
      distance: '30px',
      duration: 900,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 200,
      reset: true,
    });
  }, []);

  return (
    <div className="min-h-screen p-4 sr">
      <div className="flex justify-between items-center mb-6 sr">
        <Button
          className="flex gap-2 rounded-3xl mt-2 font-bold"
          onClick={() => navigate(-1)}
        >
          <FaArrowAltCircleLeft className="mt-1" />
          Back
        </Button>

        <div className="need border-transparent grid grid-cols-2 gap-1 items-center rounded-3xl p-2 sr">
          <p className="font-semibold">Need <span>help?</span></p>
          <div className="butt flex justify-center p-2 rounded-full sr">
            <button onClick={() => navigate('/customercare')} className="flex items-center">
              <FaHeadset />
            </button>
          </div>
        </div>
      </div>

      <div className="top query border rounded-xl font-bold text-xl w-full max-w-md mx-auto h-auto flex flex-col justify-center gap-4 p-6 text-center shadow sr">
        <p>You have exceeded the maximum amount required for a customer to be eligible for loans.</p>
        <span>Kindly contact customer service for more information or</span>
        <Button onClick={() => navigate('/loanterms')} className="mx-auto mt-2">
          Click Here
        </Button>
      </div>
    </div>
  );
};

export default Loans;
