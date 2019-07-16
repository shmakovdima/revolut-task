import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({
  className, onClick, disabled, children,
}) => (
  <StyledButton
    disabled={disabled}
    onClick={!disabled ? onClick : null}
    className={className}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = {
  disabled: false,
  className: null,
  onClick: () => {},
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const StyledButton = styled.button`
  outline: none;
  border: none;
  padding: 16px 80px;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => (props.disabled ? props.theme.disabledPink : props.theme.pink)};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  transition: all ${props => props.theme.transitionTime} ease 0s;

  &:hover {
    background: ${props => !props.disabled && props.theme.darkPink};
  }
`;

export default React.memo(Button);
