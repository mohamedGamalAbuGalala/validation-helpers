const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isAlpha } = require('../../rulesLogic');

describe('Unit rulesLogic / isAlpha', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = 'say        Hello        ';
  const userInputAr = '                     أهلا           بكم  ';
  const defaultErrorMsg = 'This field should consist of alphabets only';
  const customErrorMsg = 'This field should consist of en alphabets only';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
    // default
    rule.locals = 'en-US';
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = 'hello 22 -';
    rule.msg = undefined;
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'hello  22';
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid in locals & no msg passed`, () => {
    userInput = 'hello';
    rule.msg = undefined;
    rule.locals = ['ar'];
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid in locals & msg passed`, () => {
    userInput = 'hello';
    rule.msg = undefined;
    rule.locals = ['ar'];
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid in locals & no msg passed`, () => {
    userInput = 'اهلا';
    rule.msg = undefined;
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid in locals & msg passed`, () => {
    userInput = 'اهلا';
    rule.msg = undefined;
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it('should return no errors if userInput is valid input even if has extra spaces', () => {
    userInput = `            ${userInput}        `;
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is valid input even if has extra spaces', () => {
    userInput = `            ${userInputAr}        `;
    rule.locals = ['ar'];
    isAlpha(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
