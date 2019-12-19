const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isEmail', () => {
  let msg = 'isEmail custome msg';
  const rule = { type: Rules.IS_EMAIL, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isEmail rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isEmail();
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isEmail rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isEmail(msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
