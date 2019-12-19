const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isURL', () => {
  let msg = 'isURL custome msg';
  const rule = { type: Rules.IS_URL, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isURL rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isURL();
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isURL rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isURL(msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
