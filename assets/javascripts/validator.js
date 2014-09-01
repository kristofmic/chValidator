(function(angular) {

  var
    definitions;

  definitions = [
    'VALIDATION_TYPE',
    validator
  ];

  angular.module('ch.Validator')
    .factory('validator', definitions);

  function validator(VALIDATION_TYPE) {
    var
      self = {},
      validDigits = (/^\d+$/),
      invalidText = (/\d/),
      validEmail = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      validPassword = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/),
      validUrl = (/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/),
      validPhoneNumber = (/^\d{1}[-\.\u0020\d]{6,16}$/);

    self[VALIDATION_TYPE.DIGITS] = validateDigits;
    self[VALIDATION_TYPE.TEXT] = validateText;
    self[VALIDATION_TYPE.REQUIRED] = validateRequired;
    self[VALIDATION_TYPE.EMAIL] = validateEmail;
    self[VALIDATION_TYPE.PASSWORD] = validatePassword;
    self[VALIDATION_TYPE.MINLENGTH] = validateMinLength;
    self[VALIDATION_TYPE.MAXLENGTH] = validateMaxLength;
    self[VALIDATION_TYPE.URL] = validateUrl;
    self[VALIDATION_TYPE.PHONE] = validatePhoneNumber;
    self[VALIDATION_TYPE.CONFIRM] = validateConfirm;

    return self;

    function validateDigits(value) {
      return validDigits.test(value);
    }

    function validateText(value) {
      return !!value && !invalidText.test(value);
    }

    function validateRequired(value) {
      return !!value;
    }

    function validateEmail(value) {
      return validEmail.test(value);
    }

    function validatePassword(value) {
      return validPassword.test(value);
    }

    function validateMinLength(value, length) {
      if (typeof length === 'string') {
        length = parseInt(length, 10);
      }
      return !!value && value.length >= length;
    }

    function validateMaxLength(value, length) {
      if (typeof length === 'string') {
        length = parseInt(length, 10);
      }
      return !!value && value.length <= length;
    }

    function validateUrl(value) {
      return validUrl.test(value);
    }

    function validatePhoneNumber(value) {
      return validPhoneNumber.test(value);
    }

    function validateConfirm(value1, value2) {
      return (!value1 && !value2) || value1 === value2;
    }
  }

})(angular);