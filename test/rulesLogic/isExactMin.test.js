const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isExactMin } = require('../../rulesLogic');

describe('Unit rulesLogic / isExactMin', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = '1';
  const minLimit = 0;
  const customErrorMsg = `Input should be a number with minimum ${minLimit}`;
  const defaultMinErrorMsg = `be number and minimum ${minLimit}`;
  const defaultNumberErrorMsg = 'This field must be a number';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.value = minLimit;
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = {};
    isExactMin(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultMinErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '-1';
    rule.msg = undefined;
    isExactMin(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultMinErrorMsg);
  });

  it(`should append to errors ${defaultNumberErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '+0+';
    rule.msg = undefined;
    isExactMin(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultNumberErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = '-1';
    isExactMin(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput += '   ';
    isExactMin(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
