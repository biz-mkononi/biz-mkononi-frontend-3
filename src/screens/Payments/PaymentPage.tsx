import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Container,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import useInitiatePayment from '../../hooks/payments/useIntiatePayment';

type PaymentMethod = 'card' | 'mpesa';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const { mutateAsync, isLoading } = useInitiatePayment();
  const plan: SubscriptionPlan = {
    id: 'premium',
    name: 'Premium Plan',
    price: 199,
    duration: 'month',
    features: [
      'Unlimited access to all features',
      'Priority customer support',
      'Advanced analytics',
    ],
  };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };

  const handleInitiatePayment = async () => {
    const payment = {
      amount: plan.price,
      method: paymentMethod,
      userId: id,
    };
    await mutateAsync(payment);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: '#3282b8', textTransform: 'none' }}
        >
          Back
        </Button>
      </Box>

      <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
        Complete Your Subscription
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Choose your preferred payment method to continue
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
        }}
      >
        {/* Payment Method Selection */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Payment Method
          </Typography>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <Card
                variant="outlined"
                sx={{
                  mb: 2,
                  cursor: 'pointer',
                  border:
                    paymentMethod === 'card'
                      ? '2px solid #3282b8'
                      : '1px solid #e0e0e0',
                  backgroundColor:
                    paymentMethod === 'card' ? '#f0f7ff' : 'white',
                  transition: 'all 0.2s',
                }}
                onClick={() => setPaymentMethod('card')}
              >
                <CardContent
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <CreditCardIcon sx={{ fontSize: 40, color: '#3282b8' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Card Payment
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pay securely with your debit or credit card
                    </Typography>
                  </Box>
                  <FormControlLabel
                    value="card"
                    control={
                      <Radio
                        sx={{
                          color: '#3282b8',
                          '&.Mui-checked': { color: '#3282b8' },
                        }}
                      />
                    }
                    label=""
                    sx={{ m: 0 }}
                  />
                </CardContent>
              </Card>

              <Card
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  border:
                    paymentMethod === 'mpesa'
                      ? '2px solid #3282b8'
                      : '1px solid #e0e0e0',
                  backgroundColor:
                    paymentMethod === 'mpesa' ? '#f0f7ff' : 'white',
                  transition: 'all 0.2s',
                }}
                onClick={() => setPaymentMethod('mpesa')}
              >
                <CardContent
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <PhoneAndroidIcon sx={{ fontSize: 40, color: '#3282b8' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Mobile Money
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pay with M-Pesa or other mobile money services
                    </Typography>
                  </Box>
                  <FormControlLabel
                    value="mpesa"
                    control={
                      <Radio
                        sx={{
                          color: '#3282b8',
                          '&.Mui-checked': { color: '#3282b8' },
                        }}
                      />
                    }
                    label=""
                    sx={{ m: 0 }}
                  />
                </CardContent>
              </Card>
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleInitiatePayment}
              disabled={isLoading}
              sx={{
                backgroundColor: '#3282b8',
                textTransform: 'none',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#2a6a96',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                `Proceed to Payment`
              )}
            </Button>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mt: 2, textAlign: 'center' }}
            >
              Secure payment powered by Paystack
            </Typography>
          </Box>
        </Paper>

        {/* Order Summary */}
        <Paper elevation={2} sx={{ p: 3, height: 'fit-content' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Order Summary
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {plan.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Billed {plan.duration}ly
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              {plan.features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <CheckCircleIcon
                    sx={{ fontSize: 16, color: '#4caf50', mt: 0.3 }}
                  />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">
                KES {plan.price.toLocaleString()}
              </Typography>
            </Box>

            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant="body2">Tax</Typography>
              <Typography variant="body2">KES 0</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: '#3282b8' }}
              >
                KES {plan.price.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PaymentPage;
