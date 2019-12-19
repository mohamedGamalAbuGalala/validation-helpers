const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / max', () => {
  let msg = 'max custome msg';
  const maxValue = 2;
  const rule = { type: Rules.MAX, value: maxValue, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules max rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().max(maxValue);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules max rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().max(maxValue, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
