const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isExactMinLength } = require('../../rulesLogic');

describe('Unit rulesLogic / isExactMinLength', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = '1'.repeat(20);
  const minLimit = 20;
  const customErrorMsg = `Input should be with maximum ${minLimit}`;
  const defaultErrorMsg = `This Field must be at least ${minLimit} characters`;

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.value = minLimit;
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = {};
    isExactMinLength(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '1'.repeat(19);
    rule.msg = undefined;
    isExactMinLength(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = '1'.repeat(19);
    isExactMinLength(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid even with spaces & msg passed`, () => {
    userInput = `    ${'1'.repeat(19)}   `;
    isExactMinLength(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput = `    ${userInput}   `;
    isExactMinLength(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
