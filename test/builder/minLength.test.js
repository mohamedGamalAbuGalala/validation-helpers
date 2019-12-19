const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / minLength', () => {
  let msg = 'minLength custome msg';
  const minLengthValue = 2;
  const rule = { type: Rules.MIN_LENGTH, value: minLengthValue, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules minLength rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().minLength(minLengthValue);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules minLength rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().minLength(minLengthValue, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
