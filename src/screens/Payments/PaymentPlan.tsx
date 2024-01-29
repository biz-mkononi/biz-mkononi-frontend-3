import React from 'react'
import PaymentCard from './PaymentCard';
import logo from '../../Assets/logo.png'
const PaymentPlan = () => {
  const paymentOptions = [
    {
      title: 'Free Trial',
      price: 0,
      benefits: ['One month free', 'All features in the system', 'Analysis tools'],
    },
    {
      title: 'Premium Plan',
      price: 199,
      benefits: ['All Basic Plan features', 'Premium Support', 'AI powered analytics'],
    },
  ];
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-24">
      <div className='flex mb-4 space-x-3 items-center'>
            <img src={logo} className="img-fluid banner-logo" alt="..." />
            <h5
              className="  font-medium leading-tight text-xl mt-0 mb-2 "
              >
              BizMkononi
            </h5>
          </div>
      <h1 className="text-4xl text-bizBlue font-bold mb-4">Plans and pricing</h1>
      <h1 className="text-lg text-center">Choose the right plan for your <br/> business and needs</h1>
      <div className="flex space-x-4 mt-16">
        {paymentOptions.map((option, index) => (
          <PaymentCard key={index} {...option} />
        ))}
      </div>
    </div>
  )
}

export default PaymentPlan
