import React, { useState } from 'react';

const CustomerCare = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset(); // Clear form
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Submission failed. Check your internet connection.");
    }
  };

  return (
    <div className="w-full sm:max-w-md md:max-w-lg mx-auto p-4 mt-10 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Contact Us</h2>

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
          Thank you for reaching out! We’ll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Hidden Fields */}
        <input type="hidden" name="access_key" value="1562a354-70ff-46b1-9734-28726a7c7cec" />
        <input type="hidden" name="subject" value="New Customer Care Message" />
        <input type="hidden" name="from_name" value="Customer Care Form" />

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="w-full px-4 py-2 border rounded-md focus:outline-none text-black"
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
