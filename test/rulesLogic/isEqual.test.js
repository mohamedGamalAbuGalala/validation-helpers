const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isEqual } = require('../../rulesLogic');

describe('Unit rulesLogic / isEqual', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = 'example user input';
  const customErrorMsg = 'your input is not valid';
  const defaultErrorMsg = `be match with ${inputText}`;

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.value = inputText;
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isEqual(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = 'another example user input';
    rule.msg = undefined;
    isEqual(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'another example user input';
    isEqual(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected', () => {
    isEqual(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
