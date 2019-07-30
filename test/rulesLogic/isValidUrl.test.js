const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isValidUrl } = require('../../rulesLogic');

describe('Unit rulesLogic / isValidUrl', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = 'https://www.npmjs.com/package/validation-helpers';
  const customErrorMsg = 'your input is not a valid url';
  const defaultErrorMsg = 'be a valid url';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.value = inputText;
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isValidUrl(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = 'https://w.w.w';
    rule.msg = undefined;
    isValidUrl(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'https://w.w.w';
    isValidUrl(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is valid url', () => {
    isValidUrl(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
