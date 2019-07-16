import {
  faRubleSign,
  faDollarSign,
  faEuroSign,
  faPoundSign,
} from '@fortawesome/free-solid-svg-icons';

export const appConfig = {
  currency_from: 'USD',
  currency_to: 'EUR',
  amount_from: '',
  amount_to: '',
  active_input: 'from',
};

export default {
  EUR: {
    icon: faEuroSign,
    pocket: 10000,
  },
  USD: {
    icon: faDollarSign,
    pocket: 10000,
  },
  GBP: {
    icon: faPoundSign,
    pocket: 10000,
  },
  RUB: {
    icon: faRubleSign,
    pocket: 1000000,
  },
};
