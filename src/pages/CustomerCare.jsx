import React, { useState } from 'react';

const CustomerCare = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full sm:max-w-md md:max-w-lg mx-auto p-4 mt-10 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Contact Us</h2>

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
          Thank you for reaching out! We’ll get back to you soon.
        </div>
      )}

      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="space-y-4"
        onSubmit={() => setSubmitted(true)}
      >
        {/* Required Hidden Fields */}
        <input type="hidden" name="access_key" value="1562a354-70ff-46b1-9734-28726a7c7cec" />
        <input type="hidden" name="subject" value="New Customer Care Message" />
        <input type="hidden" name="from_name" value="Customer Care Form" />
        <input type="hidden" name="redirect" value="" />

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default CustomerCare;
