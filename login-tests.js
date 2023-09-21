import { Selector } from 'testcafe';

fixture`SDLMS Login`.page`https://demo.guru99.com/test/login.html`;

const usernameInput = Selector('#username');
const passwordInput = Selector('#password');
const loginButton = Selector('button').withText('Login');
const dashboardHeader = Selector('h1').withText('Dashboard');
const errorMessage = Selector('.error-message');

test('Successful Login', async (t) => {
  await t
    .typeText(usernameInput, 'kumarbikash')
    .typeText(passwordInput, '123456')
    .click(loginButton)
    .expect(dashboardHeader.exists)
    .ok()
    .expect(dashboardHeader.innerText)
    .contains('Welcome, Bikash'); 
});

test('Failed Login - Incorrect Password', async (t) => {
  await t
    .typeText(usernameInput, 'kumarbikash')
    .typeText(passwordInput, 'incorrect_password')
    .click(loginButton)
    .expect(errorMessage.innerText)
    .contains('Incorrect password. Please try again.');
});

test('Failed Login - Non-existent User', async (t) => {
  await t
    .typeText(usernameInput, 'non_existent_user')
    .typeText(passwordInput, '123456')
    .click(loginButton)
    .expect(errorMessage.innerText)
    .contains('User not found. Please register.');
});

test('Failed Login - Empty Fields', async (t) => {
  await t
    .click(loginButton)
    .expect(errorMessage.innerText)
    .contains('Both username and password are required.');
});
