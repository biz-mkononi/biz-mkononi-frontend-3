import React, { useState } from 'react'

const MpesaScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const handlePayment = () => {
    // Add logic to handle card payment
  };
  return (
      <form>
        <label className="block mb-2">Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 mb-4"
          required
        />

        <div className="mt-4">
<button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
          onClick={handlePayment}
        >
          Submit Payment
        </button>
        </div>


      </form>
  )
}

export default MpesaScreen
