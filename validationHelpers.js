const Validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const moment = require('moment');

const isEmpty = require('./isEmpty');
const Rules = require('./rules');

module.exports = (userInput = '', rules) => {
  const errors = [];

  rules.forEach(rule => {
    if (rule.type === Rules.IS_MEMBER) {
      // ! must pass rule.array
      if (
        !rule.array
          .map(v =>
            v
              .toString()
              .toLowerCase()
              .trim()
          )
          .includes(
            userInput
              .toString()
              .toLowerCase()
              .trim()
          )
      )
        errors.push(rule.msg ? rule.msg : 'be a member of select provided');
    }
    // ! must pass rule.type
    if (rule.type === Rules.IS_BOOLEAN) {
      const userInputTrimmed = userInput.toString().trim();
      if (!Validator.isBoolean(userInputTrimmed))
        errors.push(rule.msg ? rule.msg : 'be a valid boolean value');
    }

    // ! must pass rule.type && rule.minLength && rule.maxLength
    if (rule.type === Rules.IS_ARRAY) {
      if (
        !Array.isArray(userInput)
        || userInput.length < rule.minLength
        || userInput.length > rule.maxLength
      )
        errors.push(
          rule.msg
            ? rule.msg
            : `must be an array with min length of ${
              rule.minLength
            } and max length of ${rule.maxLength}`
        );
    }
    // ! must pass rule.type
    if (rule.type === Rules.REQUIRED) {
      const userInputTrimmed = isEmpty(userInput)
        ? ''
        : userInput.toString().trim();
      if (Validator.isEmpty(userInputTrimmed, { ignore_whitespace: true }))
        errors.push(rule.msg ? rule.msg : 'This field is required');
    }

    // ! must pass rule.type
    if (rule.type === Rules.NO_SPACE) {
      const userInputTrimmed = isEmpty(userInput)
        ? ''
        : userInput.toString().trim();
      const spaces = userInputTrimmed.split(' ');
      if (spaces.length > 1)
        errors.push(
          rule.msg ? rule.msg : "This field shouldn't have any space"
        );
    }

    // ! must pass rule.type
    if (rule.type === Rules.IS_OBJECT_ID) {
      const userInputTrimmed = userInput.toString().trim();
      if (!ObjectId.isValid(userInputTrimmed))
        errors.push(
          rule.msg ? rule.msg : 'This field must be a valid ObjectId'
        );
    }

    // ! must pass rule.type
    if (rule.type === Rules.IS_ALPHA) {
      const userInputTrimmed = userInput.toString().trim();
      if (
        !Validator.isAlpha(userInputTrimmed)
        && !Validator.isAlpha(userInputTrimmed, ['ar'])
      )
        errors.push(
          rule.msg ? rule.msg : 'This field should consist of alphabets only'
        );
    }

    // ! must pass rule.type
    if (rule.type === Rules.IS_MOBILE) {
      const userInputTrimmed = userInput.toString().trim();
      if (!Validator.isMobilePhone(userInputTrimmed))
        errors.push(
          rule.msg ? rule.msg : 'This field should be a valid mobile number'
        );
    }

    // ! must pass rule.type && rule.formats []
    if (rule.type === Rules.IS_DATE) {
      const userInputTrimmed = userInput.toString().trim();
      if (!moment(userInputTrimmed, rule.formats, true).isValid())
        errors.push(
          rule.msg
            ? rule.msg
            : `This field should be a valid date with format ${rule.formats}`
        );
    }

    // ! must pass rule.type && rule.value
    if (rule.type === Rules.MIN_LENGTH) {
      const userInputTrimmed = userInput.toString().trim();
      if (!Validator.isLength(userInputTrimmed, { min: rule.value }))
        errors.push(
          rule.msg
            ? rule.msg
            : `This Field must be at least ${rule.value} characters`
        );
    }

    // ! must pass rule.type && rule.value
    if (rule.type === Rules.MAX_LENGTH) {
      const userInputTrimmed = userInput.toString().trim();
      if (!Validator.isLength(userInputTrimmed, { max: rule.value }))
        errors.push(
          rule.msg
            ? rule.msg
            : `This Field must be at most ${rule.value} characters`
        );
    }

    // ! must pass rule.type
    if (rule.type === Rules.IS_NUMBER) {
      const userInputTrimmed = userInput.toString().trim();
      if (!Validator.isNumeric(userInputTrimmed))
        errors.push(rule.msg ? rule.msg : 'This field must be a number');
    }

    // ! must pass rule.type && rule.value
    if (rule.type === Rules.MIN) {
      const userInputTrimmed = userInput.toString().trim();
      if (
        Validator.isNumeric(userInputTrimmed)
        && +userInputTrimmed < rule.value
      )
        errors.push(
          rule.msg ? rule.msg : `be number and minimum ${rule.value}`
        );
    }

    // ! must pass rule.type && rule.value
    if (rule.type === Rules.MAX) {
      const userInputTrimmed = userInput.toString().trim();
      if (
        Validator.isNumeric(userInputTrimmed)
        && +userInputTrimmed > rule.value
      )
        errors.push(
          rule.msg ? rule.msg : `be number and maximum ${rule.value}`
        );
    }

    // ! must pass rule.type
    if (rule.type === Rules.IS_URL) {
      const userInputTrimmed = userInput.toString().trim();
      if (!Validator.isURL(userInputTrimmed))
        errors.push(rule.msg ? rule.msg : 'be a valid url');
    }

    // ! must pass rule.type && rule.value
    if (rule.type === Rules.IS_EQUAL) {
      const userInputTrimmed = userInput.toString().trim();
      if (!userInputTrimmed !== rule.value.toString().trim())
        errors.push(rule.msg ? rule.msg : `be match with ${rule.value}`);
    }

    // ! must pass rule.type
    if (rule.type === Rules.IS_EMAIL) {
      const userInputTrimmed = userInput.toString().trim();
      if (!Validator.isEmail(userInputTrimmed))
        errors.push(rule.msg ? rule.msg : 'be a valid email');
    }
  });

  return {
    errors,
    isValid: errors.length === 0
  };
};
