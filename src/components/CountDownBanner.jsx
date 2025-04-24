import React, { useState, useEffect } from 'react';

const CountdownBanner = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-04-28T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isExpired = Object.keys(timeLeft).length === 0;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-yellow-500 text-black py-4 px-6 shadow-md">
      <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:justify-between sm:items-center max-w-5xl mx-auto">
        {isExpired ? (
          <p className="text-base sm:text-2xl font-semibold">
            🎉 The wait is over! It’s April 28!
          </p>
        ) : (
          <>
            <p className="text-base sm:text-xl font-semibold mb-2 sm:mb-0">
              Countdown to April 28:
            </p>
            <div className="flex gap-3 text-2xl sm:text-2xl font-mono">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownBanner;
