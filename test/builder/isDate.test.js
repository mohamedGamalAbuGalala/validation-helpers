const { expect } = require('chai');
const { describe, beforeEach, it } = require('mocha');

const { Builder } = require('../..');
const Rules = require('../../rules');

describe('Unit Builder / isDate', () => {
  let msg = 'isDate custome msg';
  const formats = ['member Foo', 'member Blaa'];
  const rule = { type: Rules.IS_DATE, formats, msg };

  beforeEach(() => {
    rule.msg = msg;
  });

  it('should append to rules isDate rule scheme with no msg if no msg passed', () => {
    msg = null;
    rule.msg = null;
    const { rules } = new Builder().isDate(formats);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });

  it('should append to rules isDate rule scheme with msg if msg is passed', () => {
    const { rules } = new Builder().isDate(formats, msg);
    expect(rules.length).to.equal(1);
    expect(rules[0]).to.deep.equal(rule);
  });
});
