const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isMember } = require('../../rulesLogic');

describe('Unit rulesLogic / isMember', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const shouldBeMemberArray = ['x1', 'x2'];

  const defaultErrorMsg = `be a member of ${shouldBeMemberArray}`;
  const customErrorMsg = 'this field must be an element of array';

  beforeEach(() => {
    userInput = 'x1';
    rule.array = shouldBeMemberArray;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = undefined;
    isMember(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = 'bla';
    rule.msg = undefined;
    isMember(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'bla';
    isMember(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should throw error if rule.array is invalid', () => {
    rule.array = undefined;
    expect(() => isMember(userInput, errors, rule)).to.throw(
      'rule.array must be a valid Array'
    );
  });

  it('should throw error if rule.array is invalid', () => {
    rule.array = 'bla';
    expect(() => isMember(userInput, errors, rule)).to.throw(
      'rule.array must be a valid Array'
    );
  });

  it('should throw error if rule.array is invalid', () => {
    rule.array = { k: 'v' };
    expect(() => isMember(userInput, errors, rule)).to.throw(
      'rule.array must be a valid Array'
    );
  });

  it('should return no errors if userInput is same as expected', () => {
    isMember(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
