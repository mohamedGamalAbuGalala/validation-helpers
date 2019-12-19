const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isMember', () => {
  let msg = 'isMember custome msg';
  const array = ['member Foo', 'member Blaa'];
  const rule = { type: Rules.IS_MEMBER, array, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isMember rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isMember(array);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isMember rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isMember(array, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
