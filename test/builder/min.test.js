const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / min', () => {
  let msg = 'min custome msg';
  const minValue = 2;
  const rule = { type: Rules.MIN, value: minValue, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules min rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().min(minValue);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules min rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().min(minValue, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
