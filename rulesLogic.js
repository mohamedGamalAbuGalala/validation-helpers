const { ObjectId } = require('mongoose').Types;
const Validator = require('validator');
const moment = require('moment');
const isEmpty = require('./isEmpty');

const isExist = userInput => {
  const userInputTrimmed = isEmpty(userInput)
    ? ''
    : userInput.toString().trim();
  return !Validator.isEmpty(userInputTrimmed, { ignore_whitespace: true });
};

const isEmail = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isEmail(userInputTrimmed))
    errors.push(rule.msg ? rule.msg : 'be a valid email');
};
exports.isEmail = isEmail;

const isEqual = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (userInputTrimmed !== rule.value.toString().trim())
    errors.push(rule.msg ? rule.msg : `be match with ${rule.value}`);
};
exports.isEqual = isEqual;

const isValidUrl = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isURL(userInputTrimmed))
    errors.push(rule.msg ? rule.msg : 'be a valid url');
};
exports.isValidUrl = isValidUrl;

const isExactMax = (userInput, rule, errors) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (Validator.isNumeric(userInputTrimmed) && +userInputTrimmed > rule.value)
    errors.push(rule.msg ? rule.msg : `be number and maximum ${rule.value}`);
};
exports.isExactMax = isExactMax;

const isExactMin = (userInput, rule, errors) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (Validator.isNumeric(userInputTrimmed) && +userInputTrimmed < rule.value)
    errors.push(rule.msg ? rule.msg : `be number and minimum ${rule.value}`);
};
exports.isExactMin = isExactMin;

const isNumber = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isNumeric(userInputTrimmed))
    errors.push(rule.msg ? rule.msg : 'This field must be a number');
};
exports.isNumber = isNumber;

const isExactMaxLength = (userInput, rule, errors) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isLength(userInputTrimmed, { max: rule.value }))
    errors.push(
      rule.msg
        ? rule.msg
        : `This Field must be at most ${rule.value} characters`
    );
};
exports.isExactMaxLength = isExactMaxLength;

const isExactMinLength = (userInput, rule, errors) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isLength(userInputTrimmed, { min: rule.value }))
    errors.push(
      rule.msg
        ? rule.msg
        : `This Field must be at least ${rule.value} characters`
    );
};
exports.isExactMinLength = isExactMinLength;

const isDate = (userInput, rule, errors) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!moment(userInputTrimmed, rule.formats, true).isValid())
    errors.push(
      rule.msg
        ? rule.msg
        : `This field should be a valid date with format ${rule.formats}`
    );
};
exports.isDate = isDate;

const isMobileNumber = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isMobilePhone(userInputTrimmed))
    errors.push(
      rule.msg ? rule.msg : 'This field should be a valid mobile number'
    );
};
exports.isMobileNumber = isMobileNumber;

const isAlpha = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (
    !Validator.isAlpha(userInputTrimmed)
    && !Validator.isAlpha(userInputTrimmed, ['ar'])
  )
    errors.push(
      rule.msg ? rule.msg : 'This field should consist of alphabets only'
    );
};
exports.isAlpha = isAlpha;

const isObjectId = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!ObjectId.isValid(userInputTrimmed))
    errors.push(rule.msg ? rule.msg : 'This field must be a valid ObjectId');
};
exports.isObjectId = isObjectId;

const NoSpace = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  const spaces = userInputTrimmed.split(' ');
  if (spaces.length > 1)
    errors.push(rule.msg ? rule.msg : "This field shouldn't have any space");
};
exports.NoSpace = NoSpace;

const isRequired = (userInput, errors, rule) => {
  if (!isExist(userInput))
    errors.push(rule.msg ? rule.msg : 'This field is required');
};
exports.isRequired = isRequired;

const isArray = (userInput, rule, errors) => {
  if (!isExist(userInput)) return;
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
};
exports.isArray = isArray;

const isBoolean = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isBoolean(userInputTrimmed))
    errors.push(rule.msg ? rule.msg : 'be a valid boolean value');
};
exports.isBoolean = isBoolean;

const isMember = (userInput, rule, errors) => {
  if (!isExist(userInput)) return;
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
};
exports.isMember = isMember;
