import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCurrencyIcon, getCurrencyTypes } from '../../utils';

const ExchangeItemView = ({
  type,
  balance,
  currency,
  amount,
  changeCurrency,
  options,
  onInput,
  disabled,
}) => {
  const isFromCurrency = type === 'from';
  const disabledInFrom = disabled && isFromCurrency;

  return (
    <StyledContainer>
      <StyledRow>
        <StyledSelect
          className="currency-select"
          classNamePrefix="cs"
          options={options}
          value={{ value: currency, label: currency }}
          onChange={e => changeCurrency(e.value, type)}
          placeholder=""
        />
        <StyledInput
          placeholder={isFromCurrency ? '– 0' : '+ 0'}
          allowNegative={false}
          thousandSeparator=" "
          decimalScale={2}
          prefix={isFromCurrency ? '– ' : '+ '}
          value={amount}
          error={disabledInFrom ? 1 : 0}
          maxLength={16}
          onInput={e => onInput(e.target.value)}
        />
      </StyledRow>
      <StyledRow>
        <BalanceText>
          {'Balance:'}
          <StyledIcon icon={getCurrencyIcon(currency)} size="1x" />
          {balance}
        </BalanceText>
        {disabledInFrom && <ErrorText>You can&#39;t afford it</ErrorText>}
      </StyledRow>
    </StyledContainer>
  );
};


ExchangeItemView.propTypes = {
  type: PropTypes.oneOf(['to', 'from']).isRequired,
  currency: PropTypes.oneOf(getCurrencyTypes()).isRequired,
  balance: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }.isRequired),
  ).isRequired,
  onInput: PropTypes.func.isRequired,
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BalanceText = styled.span`
  display: flex;
  align-items: center;
  color: ${props => props.theme.textGrey};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 1px 0 4px;

  path {
    fill: ${props => props.theme.textGrey};
  }
`;

const StyledSelect = styled(Select)`
  .cs__control {
    border: none;
    min-width: 125px;
    background: transparent;
    box-shadow: none;
  }

  .cs__value-container {
    padding-left: 0;
    color: black;
    font-size: 40px;
    cursor: pointer;
  }

  .cs__single-value {
    margin-left: 0;
    text-overflow: none;
    overflow: none;
  }

  .cs__indicator {
    color: black;
  }

  .cs__indicator-separator {
    display: none;
  }

  .cs__menu {
    z-index: 2;
  }
`;

const StyledInput = styled(NumberFormat)`
  outline: none;
  border: none;
  background: transparent;
  text-align: right;
  font-size: 3rem;
  color: ${props => (props.error ? props.theme.textGrey : 'black')};
`;

const ErrorText = styled.span`
  color: ${props => props.theme.red};
  font-weight: bold;
`;

export default React.memo(ExchangeItemView);
