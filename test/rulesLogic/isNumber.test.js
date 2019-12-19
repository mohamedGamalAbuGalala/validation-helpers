const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isNumber } = require('../../rulesLogic');

describe('Unit rulesLogic / isNumber', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = '-1.050';
  const customErrorMsg = 'Input should be a valid number';
  const defaultErrorMsg = 'This field must be a number';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = undefined;
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '+0+';
    rule.msg = undefined;
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'hello0';
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput = +1.050;
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput = -1.050;
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput = -0;
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput = +0;
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput += '   ';
    isNumber(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
