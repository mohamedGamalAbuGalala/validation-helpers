const { expect } = require('chai');
const { describe, it } = require('mocha');

const { Builder } = require('../..');

describe('Unit Builder / bulk', () => {
  it('should append to rules for each method in chain 4', () => {
    const { rules } = new Builder()
      .required()
      .isNumber()
      .min(1)
      .max(5);
    expect(rules.length).to.equal(4);
  });

  it('should append to rules for each method in chain 7', () => {
    const { rules } = new Builder()
      .required()
      .isAlpha()
      .haveNoSpace()
      .minLength(4)
      .maxLength(9)
      .isEmail()
      .isEqual('FooBla');
    expect(rules.length).to.equal(7);
  });

  it('should append to rules for each method in chain 1', () => {
    const { rules } = new Builder().isURL();
    expect(rules.length).to.equal(1);
  });

  it('should append to rules for each method in chain 2', () => {
    const { rules } = new Builder().isBoolean().isMember([1, 2]);
    expect(rules.length).to.equal(2);
  });

  it('should append to rules for each method in chain 1.1', () => {
    const { rules } = new Builder().isMongoObjectId();
    expect(rules.length).to.equal(1);
  });

  it('should append to rules for each method in chain 3', () => {
    const { rules } = new Builder()
      .isMobile()
      .isDate(['L'])
      .isArray(1, 5);
    expect(rules.length).to.equal(3);
  });

  it('should append to rules for each method in chain 0', () => {
    const { rules } = new Builder();
    expect(rules.length).to.equal(0);
  });
});
