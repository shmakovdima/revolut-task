import get from 'lodash.get';
import mapValues from 'lodash.mapvalues';
import { Decimal } from 'decimal.js';

import { DECIMAL_PLACES } from './constants';
import config from './config';

export const getCurrencyIcon = currency => get(config, `${currency}.icon`);
export const getCurrencyTypes = Object.keys(config);
export const getPocketValues = () => mapValues(config, item => new Decimal(item.pocket));

export const roundDecimal = (decimal, afterDot = DECIMAL_PLACES) => decimal
  .times(10 ** afterDot)
  .floor()
  .dividedBy(10 ** afterDot);

export const formatAndRound = (
  decimal,
  afterDot = DECIMAL_PLACES,
) => (Decimal.isDecimal(decimal) ? roundDecimal(decimal, afterDot)
  .toString()
  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ') : decimal);
