const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isBoolean } = require('../../rulesLogic');

describe('Unit rulesLogic / isBoolean', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = true;
  const defaultErrorMsg = 'be a valid boolean value';
  const customErrorMsg = 'This field should be a valid boolean true/false/0/1';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '-1';
    rule.msg = undefined;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = '+1';
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is valid input', () => {
    userInput = false;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is valid input', () => {
    userInput = +0;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is valid input', () => {
    userInput = -0;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is valid input', () => {
    userInput = 0;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is valid input', () => {
    userInput = 1;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is valid input', () => {
    userInput = +1;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is valid input even if has extra spaces', () => {
    userInput = `            ${userInput}            `;
    isBoolean(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
