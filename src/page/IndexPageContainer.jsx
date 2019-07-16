import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startCurrencyFetchingAction } from '../store/actions/exchangeRate';
import { startExchangeAction } from '../store/actions/pocket';

import { isDisabled } from '../store/selectors/pocket';

import IndexPageView from './IndexPageView';

const IndexPage = ({ loadCurrency, ...props }) => {
  useEffect(() => {
    loadCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IndexPageView {...props} />
  );
};

IndexPage.propTypes = {
  loadCurrency: PropTypes.func.isRequired,
  startExchange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  disabled: isDisabled(state),
});

const mapDispatchToProps = dispatch => ({
  loadCurrency: () => dispatch(startCurrencyFetchingAction()),
  startExchange: () => dispatch(startExchangeAction()),
});

export { IndexPage };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(IndexPage));
