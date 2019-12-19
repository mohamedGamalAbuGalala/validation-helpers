const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isArray', () => {
  let msg = 'isArray custome msg';
  const minLength = 2;
  const maxLength = 100;
  const rule = {
    type: Rules.IS_ARRAY,
    minLength,
    maxLength,
    msg
  };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isArray rule scheme with default minLength/maxLength/msg', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isArray();
    expect(rules.length).to.equal(1);
    expect(rules[0].minLength).not.to.equal(minLength);
    expect(rules[0].maxLength).not.to.equal(maxLength);
  });

  it('should append to rules isArray rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isArray(minLength, maxLength);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isArray rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isArray(minLength, maxLength, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
