const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isExactMax } = require('../../rulesLogic');

describe('Unit rulesLogic / isExactMax', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = '1';
  const maxLimit = 100;
  const customErrorMsg = `Input should be a number and less than ${maxLimit}`;
  const defaultErrorMsg = `be number and maximum ${maxLimit}`;

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.value = maxLimit;
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isExactMax(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = '101';
    rule.msg = undefined;
    isExactMax(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = '101';
    isExactMax(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput += '   ';
    isExactMax(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
