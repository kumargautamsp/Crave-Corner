import React, { useState } from "react";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    message: "",
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending form data to server
    console.log("Form submitted:", formData);
    // Show dialog box
    setShowDialog(true);
  };

  return (
    <div className="bg-sky-400 py-12 w-2/3 m-auto mt-10 rounded-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              className="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:border-blue-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Message"
              rows="4"
              className="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Dialog box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md max-w-md">
            <p className="text-lg font-semibold mb-4">Thank you, {formData.name}!</p>
            <p className="text-gray-700">We have received your message. We will get back to you shortly.</p>
            <button
              onClick={() => setShowDialog(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsForm;
