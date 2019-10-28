const Rules = require('./rules');

class Builder {
  constructor() {
    this.value = [];
  }

  required(msg = null) {
    this.value.push({ type: Rules.REQUIRED, msg });
    return this;
  }

  min(value, msg = null) {
    this.value.push({ type: Rules.MIN, value, msg });
    return this;
  }

  max(value, msg = null) {
    this.value.push({ type: Rules.MAX, value, msg });
    return this;
  }

  minLength(value, msg = null) {
    this.value.push({ type: Rules.MIN_LENGTH, value, msg });
    return this;
  }

  maxLength(value, msg = null) {
    this.value.push({ type: Rules.MAX_LENGTH, value, msg });
    return this;
  }

  isEmail(msg = null) {
    this.value.push({ type: Rules.IS_EMAIL, msg });
    return this;
  }

  isNumber(msg = null) {
    this.value.push({ type: Rules.IS_NUMBER, msg });
    return this;
  }

  isEqual(value, msg = null) {
    this.value.push({ type: Rules.IS_EQUAL, value, msg });
    return this;
  }

  isURL(msg = null) {
    this.value.push({ type: Rules.IS_URL, msg });
    return this;
  }

  isAlpha(msg = null, locals = []) {
    this.value.push({ type: Rules.IS_ALPHA, msg, locals });
    return this;
  }

  isBoolean(msg = null) {
    this.value.push({ type: Rules.IS_BOOLEAN, msg });
    return this;
  }

  isMember(array, msg = null) {
    this.value.push({ type: Rules.IS_MEMBER, array, msg });
    return this;
  }

  isMongoObjectId(msg = null) {
    this.value.push({ type: Rules.IS_OBJECT_ID, msg });
    return this;
  }

  isArray(minLength = 1, maxLength = 10000, msg = null) {
    this.value.push({
      type: Rules.IS_ARRAY,
      minLength,
      maxLength,
      msg
    });
    return this;
  }

  isMobile(msg = null) {
    this.value.push({ type: Rules.IS_MOBILE, msg });
    return this;
  }

  isDate(formats, msg = null) {
    this.value.push({ type: Rules.IS_DATE, formats, msg });
    return this;
  }

  haveNoSpace(msg = null) {
    this.value.push({ type: Rules.NO_SPACE, msg });
    return this;
  }
}
module.exports = Builder;
