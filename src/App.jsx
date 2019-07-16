import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from './theme';
import store from './store/store';

import IndexPage from './page';

// Load Roboto typeface
require('typeface-roboto');

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <IndexPage />
    </ThemeProvider>
    <GlobalStyle theme={theme} />
  </Provider>
);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: black;
    font-size: ${theme.fontSize};
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }
`;

export default React.memo(App);
