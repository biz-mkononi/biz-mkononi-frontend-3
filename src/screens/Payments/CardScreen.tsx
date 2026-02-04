import React, { useState } from 'react'

const CardScreen = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  const handlePayment = () => {
    // Add logic to handle card payment
  };
  return (
    <form>
        <label className="block mb-2">Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="border p-2 mb-4"
          required
        />

        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block mb-2">Expiry Month:</label>
            <input
              type="text"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              placeholder="MM"
              maxLength={2}
              className="border p-2"
              required
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block mb-2">Expiry Year:</label>
            <input
              type="text"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              placeholder="YYYY"
              maxLength={4}
              className="border p-2"
              required
            />
          </div>
        </div>

        <label className="block mb-2">CVV:</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
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

export default CardScreen
