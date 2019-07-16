import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faChartLine, faSync } from '@fortawesome/free-solid-svg-icons';

import { getCurrencyIcon, getCurrencyTypes } from '../../utils';

const InfoBlockView = ({
  currencyFrom,
  currencyTo,
  costOne,
  isFetching,
  isError,
  swapCurrency,
  setHovered,
  hovered,
}) => {
  const currencyFromIcon = getCurrencyIcon(currencyFrom);
  const currencyToIcon = getCurrencyIcon(currencyTo);

  return (
    <StyledBlock>
      <ChangeButton
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={swapCurrency}
      >
        <FontAwesomeIcon
          icon={faExchangeAlt}
          spin={hovered}
          size="lg"
        />
      </ChangeButton>
      <RateInfo>
        {
          isFetching && (
            <FetchIcon
              icon={faSync}
              size="lg"
              spin
            />
          )
        }

        {
          isError && (
            <ErrorText>Error!!!</ErrorText>
          )
        }

        {
          !isFetching && !isError && (
            <>
              <ChartIcon
                icon={faChartLine}
                size="1x"
              />
              <SignIcon
                icon={currencyFromIcon}
                size="sm"
              />
              {'1 = '}
              <SignIcon
                icon={currencyToIcon}
                size="sm"
              />
              {costOne}
            </>
          )
        }
      </RateInfo>
    </StyledBlock>
  );
};

InfoBlockView.propTypes = {
  costOne: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  currencyFrom: PropTypes.oneOf(getCurrencyTypes()).isRequired,
  currencyTo: PropTypes.oneOf(getCurrencyTypes()).isRequired,
  swapCurrency: PropTypes.func.isRequired,
  setHovered: PropTypes.func.isRequired,
  hovered: PropTypes.bool.isRequired,
};

const StyledBlock = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -15px;
  z-index: 1;
  width: 100%;
`;

const ChangeButton = styled.button`
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  outline: none;
  border-radius: 100%;
  border: 3px solid ${props => props.theme.grey};
  transform: rotate(90deg);
  cursor: pointer;

  path {
    fill: ${props => props.theme.blue};
  }
`;

const RateInfo = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius};
  border: 3px solid ${props => props.theme.grey};
  padding: 0px 10px;
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${props => props.theme.blue};
`;

const ErrorText = styled.span`
  font-size: 20px;
  padding: 2px;
  color: ${props => props.theme.red};
`;

const ChartIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const FetchIcon = styled(FontAwesomeIcon)`
  padding: 2px;

  path {
    fill: ${props => props.theme.red};
  }
`;

const SignIcon = styled(FontAwesomeIcon)`
  margin: auto 3px;
`;

export default React.memo(InfoBlockView);
