// PaymentCard.tsx
import React, { useContext } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DataContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
interface PaymentCardProps {
  title: string;
  price: number;
  benefits: string[];
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  price,
  benefits,
}) => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(DataContext);
  const handleSubscriptionType = () => {
    setFormData({ ...formData, ['subscriptionType']: 'free-trial' });
    navigate('/auth/sign-up');
  };
  return (
    <div className="bg-white rounded-lg w-full  shadow p-6 mb-4">
      <div className="h-72 w-full">
        <h2 className="text-xl text-bizBlue font-bold mb-2">{title}</h2>
        <p className=" text-black text-sm font-bold mb-4">
          Kshs{` ${price}`} per month
        </p>
        <ul className="list-disc list-inside">
          {benefits.map((benefit, index) => (
            <>
              <p key={index}>
                <VerifiedIcon className="text-bizBlue text-lg mr-3" />
                {benefit}
              </p>
            </>
          ))}
        </ul>
      </div>
      {price === 0 ? (
        <button
          onClick={handleSubscriptionType}
          className="w-full bg-bizBlue text-white py-2 px-2 rounded-lg mt-4"
        >
          Get Started <ArrowForwardIcon className="text-white text-lg ml-3" />
        </button>
      ) : (
        <button className="w-full bg-bizBlue text-white py-2 px-2 rounded-lg mt-4">
          Get Started <ArrowForwardIcon className="text-white text-lg ml-3" />
        </button>
      )}
    </div>
  );
};

export default PaymentCard;
