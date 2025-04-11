import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { FaHeadset, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Button } from "../components/Button";
import { useNavigate } from 'react-router';

const TopUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ScrollReveal().reveal('.sr', {
      delay: 100,
      distance: '30px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 300,
      reset: true,
    });
  }, []);

  return (
    <>
      <div className='min-h-screen'>
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

        <div className='sr top border rounded-xl font-bold text-2xl w-[400px] h-[200px] flex justify-center flex-col gap-4 p-4'>
          <p>TopUp services are currently on a downtime as your account is under review.</p>
        </div>
      </div>
    </>
  );
}

export default TopUp;
