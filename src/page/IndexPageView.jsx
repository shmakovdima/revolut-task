import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import InfoBlock from '../components/InfoBlock';
import ExchangeItem from '../components/ExchangeItem';

const IndexPageView = ({ startExchange, disabled }) => (
  <PageLayout>
    <ExchangeBlock>
      <LayoutContainer>
        <ExchangeItem
          type="from"
        />
        <InfoBlock />
      </LayoutContainer>
    </ExchangeBlock>
    <ExchangeBlock grey>
      <LayoutContainer>
        <ExchangeItem type="to" />
        <StyledButton
          disabled={disabled}
          onClick={startExchange}
        >
          Exchange
        </StyledButton>
      </LayoutContainer>
    </ExchangeBlock>
  </PageLayout>
);

IndexPageView.propTypes = {
  startExchange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const StyledButton = styled(Button)`
  margin-top: 50px;
  margin-bottom: -20px;
`;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ExchangeBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  padding: 0 20px;
  background: ${props => props.grey && props.theme.grey};
`;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
  height: 100%;
  padding: 10px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(IndexPageView);
