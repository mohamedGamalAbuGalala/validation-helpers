const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { isEmail } = require('../../rulesLogic');

describe('Unit rulesLogic / isEmail', () => {
  let userInput;
  let errors = [];
  const rule = {};

  beforeEach(() => {
    userInput = 'mohamed.abugalala@gmail.com';
    errors = [];
    rule.msg = 'this is not a valid mail';
  });

  it('should not do anything if userInput is empty', () => {
    userInput = '';
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });

  it("should append to errors 'be a valid email' if no msg passed", () => {
    userInput = 'not.a.valid.mail';
    rule.msg = undefined;
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal('be a valid email');
  });

  it("should append to errors 'this is not a valid mail' if msg passed", () => {
    userInput = 'not.a.valid.mail';
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal(rule.msg);
  });

  it('should return no errors if userInput is valid mail', () => {
    isEmail(userInput, errors, rule);
    expect(errors.length).to.equal(0);
  });
});
