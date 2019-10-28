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

const isExactMax = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  isNumber(userInput, errors, rule);
  const userInputTrimmed = userInput.toString().trim();
  if (Validator.isNumeric(userInputTrimmed) && +userInputTrimmed > rule.value)
    errors.push(rule.msg ? rule.msg : `be number and maximum ${rule.value}`);
};
exports.isExactMax = isExactMax;

const isExactMin = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  isNumber(userInput, errors, rule);
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

const isExactMaxLength = (userInput, errors, rule) => {
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

const isExactMinLength = (userInput, errors, rule) => {
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

/**
 *
 * @param {String} userInput input to be check it's validity
 * @param {array} errors push to it an error message if this rule fails
 * @param {Object} rule is an object have a rule instructions
 * @param {Array[String]} rule.formats Any moment valid format
 * @param {String} rule.msg Custom message for this rule
 */
const isDate = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!rule.formats || !rule.formats.length)
    // eslint-disable-next-line no-param-reassign
    rule.formats = ['MM-DD-YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY'];
  const userDate = moment(userInputTrimmed, rule.formats, true);
  if (!userDate.isValid())
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
  let hasError = false;
  userInput
    .toString()
    .trim()
    .split(' ')
    .forEach(userInputSplitted => {
      if (
        userInputSplitted
        && !Validator.isAlpha(userInputSplitted, rule.locals)
      )
        hasError = true;
    });
  if (hasError)
    errors.push(
      rule.msg ? rule.msg : 'This field should consist of alphabets only'
    );
};
exports.isAlpha = isAlpha;

const isObjectId = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isMongoId(userInputTrimmed))
    errors.push(rule.msg ? rule.msg : 'This field must be a valid ObjectId');
};
exports.isObjectId = isObjectId;

const noSpace = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  const spaces = userInputTrimmed.split(' ');
  if (spaces.length > 1)
    errors.push(rule.msg ? rule.msg : "This field shouldn't have any space");
};
exports.noSpace = noSpace;

const isRequired = (userInput, errors, rule) => {
  if (!isExist(userInput))
    errors.push(rule.msg ? rule.msg : 'This field is required');
};
exports.isRequired = isRequired;

const isBoolean = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  const userInputTrimmed = userInput.toString().trim();
  if (!Validator.isBoolean(userInputTrimmed))
    errors.push(rule.msg ? rule.msg : 'be a valid boolean value');
};
exports.isBoolean = isBoolean;

const isArray = (userInput, errors, rule) => {
  if (
    userInput === undefined
    || userInput === null
    || (typeof userInput === 'string' && userInput.trim().length === 0)
  )
    return;
  if (
    !Array.isArray(userInput)
    || userInput.length < rule.minLength
    || userInput.length > rule.maxLength
  )
    errors.push(
      rule.msg
        ? rule.msg
        : `must be an array with min length of ${rule.minLength} and max length of ${rule.maxLength}`
    );
};
exports.isArray = isArray;

const isMember = (userInput, errors, rule) => {
  if (!isExist(userInput)) return;
  if (!rule.array || !Array.isArray(rule.array)) throw new Error('rule.array must be a valid Array');
  const userInputTrimmed = userInput
    .toString()
    .toLowerCase()
    .trim();
  if (
    !rule.array
      .map(v =>
        v
          .toString()
          .toLowerCase()
          .trim()
      )
      .includes(userInputTrimmed)
  )
    errors.push(rule.msg ? rule.msg : `be a member of ${rule.array}`);
};
exports.isMember = isMember;

// TODO: Add isString
