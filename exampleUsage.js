const _ = require('lodash');

const { Rules, ValidationHelpers } = require('./');

module.exports = async exampleObject => {
  let error = {};

  const scheme = {
    addressAr: {
      value: exampleObject.addressAr,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.MIN_LENGTH, value: 2 },
        { type: Rules.MAX_LENGTH, value: 75 }
      ]
    },
    employeeNumber: {
      value: exampleObject.employeeNumber,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.IS_NUMBER },
        { type: Rules.MIN, value: 1 },
        { type: Rules.MAX, value: 999999999 }
      ]
    },
    email: {
      value: exampleObject.email,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.IS_EMAIL },
        { type: Rules.MAX_LENGTH, value: 75 }
      ]
    },
    mobileNumber: {
      value: exampleObject.mobileNumber,
      rules: [{ type: Rules.REQUIRED }, { type: Rules.IS_MOBILE }]
    },
    username: {
      value: exampleObject.username,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.NO_SPACE },
        { type: Rules.MIN_LENGTH, value: 2 },
        { type: Rules.MAX_LENGTH, value: 75 }
      ]
    },
    jobDegree: {
      value: exampleObject.jobDegree,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.IS_NUMBER },
        { type: Rules.MIN, value: 1 },
        { type: Rules.MAX, value: 100 }
      ]
    },
    gender: {
      value: exampleObject.gender,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.IS_MEMBER, array: ['f', 'm'] }
      ]
    },
    joinDate: {
      value: exampleObject.joinDate,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.IS_DATE, formats: ['DD-MM-YYYY', 'YYYY-MM-DD'] }
      ]
    },
    birthDate: {
      value: exampleObject.birthDate,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.IS_DATE, formats: ['DD-MM-YYYY', 'YYYY-MM-DD'] }
      ]
    },
    role: {
      value: exampleObject.role,
      rules: [
        { type: Rules.REQUIRED },
        { type: Rules.IS_MEMBER, array: ['employee', 'manager', 'hr'] }
      ]
    }
  };

  Object.keys(scheme).forEach(key => {
    const element = scheme[key];
    const { errors, isValid } = ValidationHelpers(element.value, element.rules);
    if (!isValid) {
      error[key] = errors;
    }
  });

  error = _.isEmpty(error) ? {} : error;

  return { error, exampleObject };
};
