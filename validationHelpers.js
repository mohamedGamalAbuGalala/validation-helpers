const {
  isMember,
  isBoolean,
  isArray,
  isRequired,
  noSpace,
  isObjectId,
  isAlpha,
  isMobileNumber,
  isDate,
  isExactMinLength,
  isExactMaxLength,
  isNumber,
  isExactMin,
  isExactMax,
  isValidUrl,
  isEqual,
  isEmail
} = require('./rulesLogic');
const Rules = require('./rules');

module.exports = (userInput = '', rules) => {
  const errors = [];

  rules.forEach(rule => {
    switch (rule.type) {
      case Rules.IS_MEMBER:
        isMember(userInput, rule, errors);
        break;
      case Rules.IS_BOOLEAN:
        isBoolean(userInput, errors, rule);
        break;
      case Rules.IS_ARRAY:
        isArray(userInput, rule, errors);
        break;
      case Rules.REQUIRED:
        isRequired(userInput, errors, rule);
        break;
      case Rules.NO_SPACE:
        noSpace(userInput, errors, rule);
        break;
      case Rules.IS_OBJECT_ID:
        isObjectId(userInput, errors, rule);
        break;
      case Rules.IS_ALPHA:
        isAlpha(userInput, errors, rule);
        break;
      case Rules.IS_MOBILE:
        isMobileNumber(userInput, errors, rule);
        break;
      case Rules.IS_DATE:
        isDate(userInput, errors, rule);
        break;
      case Rules.MIN_LENGTH:
        isExactMinLength(userInput, errors, rule);
        break;
      case Rules.MAX_LENGTH:
        isExactMaxLength(userInput, errors, rule);
        break;
      case Rules.IS_NUMBER:
        isNumber(userInput, errors, rule);
        break;
      case Rules.MIN:
        isExactMin(userInput, errors, rule);
        break;
      case Rules.MAX:
        isExactMax(userInput, errors, rule);
        break;
      case Rules.IS_URL:
        isValidUrl(userInput, errors, rule);
        break;
      case Rules.IS_EQUAL:
        isEqual(userInput, errors, rule);
        break;
      case Rules.IS_EMAIL:
        isEmail(userInput, errors, rule);
        break;

      default:
        break;
    }
  });

  return {
    errors,
    isValid: errors.length === 0
  };
};
