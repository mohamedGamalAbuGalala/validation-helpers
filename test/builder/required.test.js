const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / required', () => {
  let msg = 'required custome msg';
  const rule = { type: Rules.REQUIRED, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules required rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().required();
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules required rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().required(msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
