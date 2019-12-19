const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isRequired } = require('../../rulesLogic');

describe('Unit rulesLogic / isRequired', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = 'Have a good value';
  const defaultErrorMsg = 'This field is required';
  const customErrorMsg = 'This field should not be empty';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '                                 ';
    rule.msg = undefined;
    isRequired(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = undefined;
    isRequired(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = null;
    isRequired(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = {};
    isRequired(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is valid input even if has extra spaces', () => {
    userInput = `            ${userInput}        `;
    isRequired(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
