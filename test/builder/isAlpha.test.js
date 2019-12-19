const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isAlpha', () => {
  let msg = 'isAlpha custome msg';
  const locals = ['ar', 'en-US'];
  const rule = { type: Rules.IS_ALPHA, msg, locals };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isAlpha rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isAlpha(locals);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isAlpha rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isAlpha(locals, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
