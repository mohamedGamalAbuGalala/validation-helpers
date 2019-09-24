const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isDate } = require('../../rulesLogic');

describe('Unit rulesLogic / isDate', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const formats = ['L'];
  const inputText = '04/09/1986';
  const customErrorMsg = 'Input should be a valid date';
  const defaultErrorMsg = `This field should be a valid date with format ${formats}`;

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
    rule.formats = formats;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = undefined;
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not a valid date & no msg passed`, () => {
    userInput = '+0+';
    rule.msg = undefined;
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not a valid date & msg passed`, () => {
    userInput = '-0-';
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not a valid date & msg passed`, () => {
    rule.formats = undefined;
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected', () => {
    userInput += '   ';
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is same as expected', () => {
    rule.formats = undefined;
    userInput = '29-06-1995';
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is same as expected', () => {
    rule.formats = undefined;
    userInput = '06-29-1995';
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it('should return no errors if userInput is same as expected', () => {
    rule.formats = undefined;
    userInput = '1995-06-29';
    isDate(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
