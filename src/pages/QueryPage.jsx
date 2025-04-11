import React, { useEffect } from 'react';
import { FaHeadset, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router';
import ScrollReveal from 'scrollreveal';

const QueryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ScrollReveal().reveal('.sr', {
      delay: 100,
      distance: '30px',
      duration: 800,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 100,
      reset: false,
    });
  }, []);

  return (
    <div className="min-h-screen sr">
      <div className='sr flex justify-between mt-2'>
        <div>
          <Button
            className="flex gap-2 rounded-3xl mt-2 font-bold"
            onClick={() => navigate(-1)}
          >
          <FaArrowAltCircleLeft className="mt-1" />
            Back
              </Button>
        </div>
      
        <div className="sr need border-transparent grid grid-col-2 mt-1 rounded-3xl m-2 p-2 gap-1">
          <div className=''>
            <p className="font-semibold">Need <span>help?</span></p>
          </div>
      
          <div className='butt flex justify-center p-2 border-transparent rounded-full'>
            <button onClick={() => navigate('/customercare')} className="flex items-center">
              <FaHeadset />
                </button>
          </div>
        </div>
      </div>

      <div className="top query border rounded-xl font-bold text-2xl w-[400px] h-[150px] flex justify-center flex-col gap-4 p-4 sr">
        <p>Sorry, you currently can't initiate transfer at the moment.</p>
        <span>Contact customer care for support and assistance.</span>
      </div>
    </div>
  );
};

export default QueryPage;
