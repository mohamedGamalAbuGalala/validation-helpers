const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isEqual', () => {
  let msg = 'isEqual custome msg';
  const isEqualValue = 2;
  const rule = { type: Rules.IS_EQUAL, value: isEqualValue, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isEqual rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isEqual(isEqualValue);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isEqual rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isEqual(isEqualValue, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
