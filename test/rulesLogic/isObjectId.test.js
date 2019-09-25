const { ObjectId } = require('mongoose').Types;
const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isObjectId } = require('../../rulesLogic');

describe('Unit rulesLogic / isObjectId', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = new ObjectId();
  const defaultErrorMsg = 'This field must be a valid ObjectId';
  const customErrorMsg = 'Invalid ObjectId';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isObjectId(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = `${new ObjectId().toHexString()}hello`;
    rule.msg = undefined;
    isObjectId(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = `${new ObjectId().toHexString()}hello`;
    isObjectId(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is valid input even if has extra spaces', () => {
    userInput = `            ${userInput}        `;
    isObjectId(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
