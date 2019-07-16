import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getExchangeRateFetching,
  getExchangeRateError,
  getExchangeRateByOne,
} from '../../store/selectors/exchangeRate';

import { swapCurrencyAction } from '../../store/actions/userInputs';

import { getCurrencyFrom, getCurrencyTo } from '../../store/selectors/userInputs';

import { getCurrencyTypes } from '../../utils';

import InfoBlockView from './InfoBlockView';

const InfoBlock = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <InfoBlockView
      {...props}
      hovered={hovered}
      setHovered={setHovered}
    />
  );
};

InfoBlock.propTypes = {
  costOne: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  currencyFrom: PropTypes.oneOf(getCurrencyTypes).isRequired,
  currencyTo: PropTypes.oneOf(getCurrencyTypes).isRequired,
  swapCurrency: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isFetching: getExchangeRateFetching(state),
  isError: getExchangeRateError(state),
  costOne: getExchangeRateByOne(state),
  currencyFrom: getCurrencyFrom(state),
  currencyTo: getCurrencyTo(state),
});

const mapDispatchToProps = dispatch => ({
  swapCurrency: () => dispatch(swapCurrencyAction()),
});

export { InfoBlock };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(InfoBlock));
