const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isMobileNumber } = require('../../rulesLogic');

describe('Unit rulesLogic / isMobileNumber', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = '+201550178854';
  const defaultErrorMsg = 'This field should be a valid mobile number';
  const customErrorMsg = 'this is not a valid phone number';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isMobileNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '02054646464+';
    rule.msg = undefined;
    isMobileNumber(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = '+201562';
    isMobileNumber(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is valid input even if has extra spaces', () => {
    userInput = `            ${userInput}             `;
    isMobileNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
