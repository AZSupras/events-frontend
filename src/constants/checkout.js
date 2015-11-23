import { createConstants } from '../utils';

export default createConstants(
  'STRIPE_GET_TOKEN',
  'STRIPE_GOT_TOKEN',
  'PAYMENT_PROCESS',
  'PAYMENT_PROCESSED',
  'PAYMENT_FAILED'
);
