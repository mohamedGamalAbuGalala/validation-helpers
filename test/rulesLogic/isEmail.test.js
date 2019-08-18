const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isEmail } = require('../../rulesLogic');

describe('Unit rulesLogic / isEmail', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = 'mohamed.abugalala@gmail.com';
  const defaultErrorMsg = 'be a valid email';
  const customErrorMsg = 'this is not a valid mail';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = 'not.a.valid.mail';
    rule.msg = undefined;
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'not.a.valid.mail';
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is valid mail even if has extra spaces', () => {
    userInput += '    ';
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
