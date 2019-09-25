const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { noSpace } = require('../../rulesLogic');

describe('Unit rulesLogic / noSpace', () => {
  let userInput;
  let errors = [];
  const rule = {};
  const inputText = 'sayHello22Times';
  const defaultErrorMsg = 'This field shouldn\'t have any space';
  const customErrorMsg = 'This field should not have spaces';

  beforeEach(() => {
    userInput = inputText;
    errors = [];
    rule.msg = customErrorMsg;
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    noSpace(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it(`should append to errors ${defaultErrorMsg} if input is not valid & no msg passed`, () => {
    userInput = 'hello 22';
    rule.msg = undefined;
    noSpace(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(defaultErrorMsg);
  });

  it(`should append to errors ${customErrorMsg} if input is not valid & msg passed`, () => {
    userInput = 'hello- -22';
    noSpace(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(customErrorMsg);
  });

  it('should return no errors if userInput is valid input even if has extra spaces', () => {
    userInput = `            ${userInput}        `;
    noSpace(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
