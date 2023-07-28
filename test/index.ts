import * as LoginTests from './login';

describe('Login Page', () => {
  const keys = Object.keys(LoginTests);

  keys.forEach((testCase) => {
    (LoginTests as Record<string, Function>)[testCase]('chrome');
  });
});
