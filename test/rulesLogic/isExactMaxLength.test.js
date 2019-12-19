const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isExactMaxLength } = require('../../rulesLogic');

describe('Unit rulesLogic / isExactMaxLength', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = '1'.repeat(100);
  const maxLimit = 100;
  const customErrorMsg = `Input should be with maximum ${maxLimit}`;
  const defaultErrorMsg = `This Field must be at most ${maxLimit} characters`;

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.value = maxLimit;
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = {};
    isExactMaxLength(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '1'.repeat(101);
    rule.msg = undefined;
    isExactMaxLength(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = '1'.repeat(101);
    isExactMaxLength(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected even with extra spaces', () => {
    userInput = `    ${userInput}   `;
    isExactMaxLength(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
