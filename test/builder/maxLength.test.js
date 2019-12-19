const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / maxLength', () => {
  let msg = 'maxLength custome msg';
  const maxLengthValue = 2;
  const rule = { type: Rules.MAX_LENGTH, value: maxLengthValue, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules maxLength rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().maxLength(maxLengthValue);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules maxLength rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().maxLength(maxLengthValue, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
