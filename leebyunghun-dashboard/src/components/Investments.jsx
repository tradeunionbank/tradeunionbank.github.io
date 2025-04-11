import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { FaArrowAltCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const investmentPlatforms = [
  {
    name: 'BlackRock',
    description: 'Global investment management corporation.',
    link: '#',
  },
  {
    name: 'Vanguard',
    description: 'Investment funds, ETFs and retirement solutions.',
    link: '#',
  },
  {
    name: 'Fidelity Investments',
    description: 'Comprehensive wealth management services.',
    link: '#',
  },
  {
    name: 'Charles Schwab',
    description: 'Brokerage and investment advisory services.',
    link: '#',
  },
  {
    name: 'Robinhood',
    description: 'Commission-free trading platform.',
    link: '#',
  },
];

const Investments = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ScrollReveal().reveal('.sr', {
      delay: 100,
      distance: '30px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 300,
      reset: true, // change to true if you want replay on every scroll
    });
  }, []);

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <Button onClick={() => navigate(-1)} className="flex gap-2 rounded-3xl">
          <FaArrowAltCircleLeft className="mt-1" />
          Back
        </Button>
        <h2 className="ab font-bold text-2xl text-center flex-1">Investment Platforms</h2>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {investmentPlatforms.map((platform, index) => (
          <div
            key={index}
            className="sr border rounded-xl p-6 bg-white shadow hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
            <p className="mb-4 text-yellow-500">{platform.description}</p>
            <a
              href={platform.link}
              className="ab flex items-center font-semibold text-yellow-800 hover:text-yellow-900 transition"
            >
              Learn More <FaArrowCircleRight className="ml-2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investments;
