import get from 'lodash.get';
import mapValues from 'lodash.mapvalues';
import { Decimal } from 'decimal.js';

import config from './config';

export const getCurrencyIcon = currency => get(config, `${currency}.icon`);
export const getCurrencyTypes = () => Object.keys(config);
export const getPocketValues = () => mapValues(config, item => new Decimal(item.pocket));

export const formatAndRound = (decimal, afterDot) => (Decimal.isDecimal(decimal) ? decimal
  .times(10 ** afterDot)
  .floor()
  .dividedBy(10 ** afterDot)
  .toDecimalPlaces(afterDot)
  .toString()
  .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ') : decimal);
