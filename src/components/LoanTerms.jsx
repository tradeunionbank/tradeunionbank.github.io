import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Button } from './Button';
import { FaArrowAltCircleLeft, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const LoanTerms = () => {
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
    <>
    <div className='sr flex justify-between mt-2'>
        <div>
          <Button
            className="flex gap-2 rounded-3xl ml-2 mt-2 font-bold"
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
    <div className="bg-w need min-h-s p-8 rounded-2xl shadow-md max-w-4xl mx-auto my-10 sr">
      <h1 className="text-3xl font-bold text-center mb-6 sr">Loan Request Terms & Conditions</h1>
      <p className="text-sm text-gray-500 text-center mb-10 sr">Effective Date: Dec 14, 2021</p>

      <section className="mb-6 sr">
        <h2 className="text-xl font-semibold mb-2">✅ Eligibility Requirements</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Be at least 18 years old.</li>
          <li>Have a valid government-issued ID.</li>
          <li>Maintain an active account with the bank for at least 6 months.</li>
          <li>Have verified employment or income source.</li>
          <li>No loans currently in default.</li>
          <li className="font-semibold text-red-500">
            Clients with $100,000,000 or more in their account are not eligible for loans.
          </li>
        </ul>
      </section>

      <section className="mb-6 sr">
        <h2 className="text-xl font-semibold mb-2">📋 Loan Application Terms</h2>
        <p className="text-gray-700 mb-2">Applicants must:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Provide accurate and complete personal and financial information.</li>
          <li>Submit requested amount and loan purpose.</li>
          <li>Consent to credit and background checks.</li>
          <li className="text-red-500">Falsified information will result in denial and potential legal action.</li>
        </ul>
      </section>

      <section className="mb-6 sr">
        <h2 className="text-xl font-semibold mb-2">💵 Loan Use Policy</h2>
        <p className="text-gray-700 mb-2 font-semibold">Permitted Uses:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Home purchase or renovation</li>
          <li>Education expenses</li>
          <li>Medical emergencies</li>
          <li>Verified business investment</li>
          <li>Debt consolidation</li>
        </ul>
        <p className="text-gray-700 mb-2 font-semibold text-red-500">Prohibited Uses:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Illegal activities (e.g. fraud, gambling)</li>
          <li>Speculative investments (e.g. cryptocurrency without disclosure)</li>
          <li>Money laundering</li>
          <li>Unapproved third-party transfers</li>
        </ul>
      </section>

      <section className="mb-6 sr">
        <h2 className="text-xl font-semibold mb-2">⏱️ Repayment Terms</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Loans are subject to bank’s interest rates.</li>
          <li>Payments must be made on or before due dates.</li>
          <li>Late or missed payments will result in:
            <ul className="list-disc ml-6">
              <li>Late fees</li>
              <li>Negative credit reporting</li>
              <li>Account restrictions or legal recovery</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6 sr">
        <h2 className="text-xl font-semibold mb-2">📌 Additional Do's & Don'ts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-1">✅ Do:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Stay transparent in financial reporting.</li>
              <li>Update contact/employment info as needed.</li>
              <li>Communicate issues before payment delays.</li>
              <li>Review all agreements carefully.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-red-500">❌ Don’t:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Miss deadlines without reason.</li>
              <li>Submit fake or altered documents.</li>
              <li>Share your loan or account access.</li>
              <li>Bypass eligibility or fraud filters.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sr">
        <h2 className="text-xl font-semibold mb-2">⚠️ Disclaimer</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Trade Union Bank may change loan policies at any time.</li>
          <li>We reserve the right to deny any application without explanation.</li>
          <li>Additional verification may be required if fraud is suspected.</li>
        </ul>
      </section>

      <div className="mt-10 text-center text-sm text-gray-600 sr">
        By applying for a loan, you agree to abide by the terms stated above. For questions or support, please visit <span className="underline cursor-pointer">tradeunioncorporation@yahoo.com</span>.
      </div>
    </div>
    </>
  );
};

export default LoanTerms;
