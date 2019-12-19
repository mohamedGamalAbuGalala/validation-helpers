const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isArray } = require('../../rulesLogic');

describe('Unit rulesLogic / isArray', () => {
  let userInput;
  let errors = [];
  const rule = { minLength: 2, maxLength: 20 };
  const input = ['x1', 'x2'];

  const defaultErrorMsg = `must be an array with min length of ${rule.minLength} and max length of ${rule.maxLength}`;
  const customErrorMsg = 'this field must be an array with min and max specified';

  beforeEach(() => {
    userInput = input;
    errors = [];
    rule.msg = customErrorMsg;
    rule.minLength = 2;
    rule.maxLength = 20;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = undefined;
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = 'bla';
    rule.msg = undefined;
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'bla';
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid as maxLength & no msg passed`, () => {
    userInput = new Array(21).fill('bla');
    rule.msg = undefined;
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid as maxLength & msg passed`, () => {
    userInput = new Array(21).fill('bla');
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid as minLength & no msg passed`, () => {
    userInput = [];
    rule.msg = undefined;
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid as minLength & msg passed`, () => {
    userInput = [];
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is same as expected', () => {
    isArray(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
