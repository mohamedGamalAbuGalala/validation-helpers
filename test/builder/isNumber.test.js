const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isNumber', () => {
  let msg = 'isNumber custome msg';
  const rule = { type: Rules.IS_NUMBER, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isNumber rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isNumber();
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isNumber rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isNumber(msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
