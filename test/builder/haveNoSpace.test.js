const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / haveNoSpace', () => {
  let msg = 'haveNoSpace custome msg';
  const rule = { type: Rules.NO_SPACE, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules haveNoSpace rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().haveNoSpace();
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules haveNoSpace rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().haveNoSpace(msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
