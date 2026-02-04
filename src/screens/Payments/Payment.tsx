import React, { useState } from 'react';
import MpesaScreen from './MpesaScreen';
import CardScreen from './CardScreen';
const Payment = () => {
  const [active, setActive] = useState(true);
  const toggleMpesa = () => {
    setActive(true);
  };
  const toggleCard = () => {
    setActive(false);
  };
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-24">
      <div className="bg-white rounded-lg w-6/12 shadow p-6 mb-4">
        <div className="flex justify-around">
          <div onClick={toggleMpesa} className="flex space-x-1 items-center">
            <h1
              className={`text-2xl p-2 ${
                active && 'relative'
              } text-bizBlue font-bold`}
            >
              M-pesa
              <div className="absolute bottom-0 left-0 w-full h-1 mt-8 bg-blue-500"></div>
            </h1>
          </div>
          <div onClick={toggleCard} className="flex space-x-1 items-center">
            <h1
              className={`text-2xl p-2 ${
                !active && 'relative'
              } text-bizBlue font-bold`}
            >
              Card
              <div className="absolute bottom-0 left-0 w-full h-1 mt-8 bg-blue-500"></div>
            </h1>
          </div>
        </div>
        <div className="flex flex-col mt-12 justify-center items-center p-4">
          {active ? <MpesaScreen /> : <CardScreen />}
        </div>
      </div>
    </div>
  );
};

export default Payment;
