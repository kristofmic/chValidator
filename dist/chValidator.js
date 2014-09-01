
// assets/javascripts/validator_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [

  ];

  angular.module('ch.Validator', dependencies)
    .constant('VALIDATION_TYPE', {
      DIGITS: 'digits',
      TEXT: 'text',
      REQUIRED: 'required',
      EMAIL: 'email',
      PASSWORD: 'password',
      PASSWORDLENGTH: 'passwordLength',
      URL: 'url',
      PHONE: 'phone',
      CONFIRM: 'confirm'
    })
    .constant('VALIDATION_ERROR', {
      DIGITS: 'chDigits',
      TEXT: 'chText',
      REQUIRED: 'chRequired',
      EMAIL: 'chEmail',
      PASSWORD: 'chPassword',
      PASSWORDLENGTH: 'chPassword',
      URL: 'chUrl',
      PHONE: 'chPhone',
      CONFIRM: 'chConfirm'
    })
    .constant('VALIDATION_EVENT', {
      VALIDATE: 'VALIDATE'
    });

})(angular);

// assets/javascripts/validator.js
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
      validPasswordMin = 8,
      validPasswordMax = 20,
      validUrl = (/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/),
      validPhoneNumber = (/^\d{1}[-\.\u0020\d]{6,16}$/);

    self[VALIDATION_TYPE.DIGITS] = validateDigits;
    self[VALIDATION_TYPE.TEXT] = validateText;
    self[VALIDATION_TYPE.REQUIRED] = validateRequired;
    self[VALIDATION_TYPE.EMAIL] = validateEmail;
    self[VALIDATION_TYPE.PASSWORD] = validatePassword;
    self[VALIDATION_TYPE.PASSWORDLENGTH] = validatePasswordLength;
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

    function validatePasswordLength(value) {
      return !!value && value.length >= validPasswordMin && value.length <= validPasswordMax;
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

    function getMessage(type) {
      return messages[type];
    }
  }

})(angular);

// assets/javascripts/validator_directive.js
(function(angular) {

  var
  definitions;

  definitions = [
    'validator',
    'validatorMessages',
    'VALIDATION_ERROR',
    'VALIDATION_EVENT',
    chValidator
  ];

  angular.module('ch.Validator')
    .directive('chValidator', definitions);

  function chValidator(validator, messages, VALIDATION_ERROR, VALIDATION_EVENT) {

    return {
      require: 'ngModel',
      scope: {
        validationType: '@chValidator',
        field: '=chConfirm'
      },
      link: link
    };

    function link(scope, elem, attrs, ngModel) {
      var
        errorElement,
        validationTypes = scope.validationType.split(' ');

      elem.on('blur keyup', doValidations);
      scope.$on(VALIDATION_EVENT.VALIDATE, doValidations);

      function doValidations() {
        for (var i = 0, len = validationTypes.length; i < len; i++) {
          if (!doValidation(validationTypes[i])) {
            break;
          }
        }

        function doValidation(type) {
          if (validator[type]) {
            if (!validator[type](ngModel.$viewValue, scope.field)) {
              ngModel.$setValidity(VALIDATION_ERROR[type.toUpperCase()], false);
              decorate(type);
              return false;
            }
            else {
              ngModel.$setValidity(VALIDATION_ERROR[type.toUpperCase()], true);
              clearDecoration();
              return true;
            }
          }
        }
      }

      function decorate(type) {
        if (!errorElement) {
          elem.parent().addClass('has-error');
          errorElement = elem.after('<p class="text-danger">' + messages.get(type) + '</p>').next();
        }
      }

      function clearDecoration() {
        if (errorElement) {
          errorElement.remove();
          elem.parent().removeClass('has-error');
          errorElement = null;
        }
      }

    }
  }
}) (angular);


// assets/javascripts/validator_messages.js
(function(angular) {

  angular.module('ch.Validator')
    .provider('validatorMessages', validatorMessagesProvider);

  function validatorMessagesProvider() {
    var
      messages = {},
      definitions;

    messages.digits = 'Please only enter numbers';
    messages.text = 'Please only enter letters';
    messages.required = 'This field is required';
    messages.email = 'Please enter a valid email';
    messages.password = 'Password must contain a number, a lowercase letter, and an uppercase letter';
    messages.passwordLength = 'Password must be between 8 and 20 characters in length';
    messages.url = 'Please enter a valid url starting with http://';
    messages.phone = 'Please enter a valid phone number';
    messages.confirm = 'Fields do not match';

    definitions = [
      validatorMessagesFactory
    ];

    return {
      setMessage: setMessage,
      setMessages: setMessages,
      $get: definitions
    };

    function setMessage(type, message) {
      if (messages[type]) {
        messages[type] = message;
      }
    }

    function setMessages(config) {
      for (var i in config) {
        setMessage(i, config[i]);
      }
    }

    function validatorMessagesFactory() {

      return {
        get: get
      };

      function get(type) {
        return messages[type];
      }

    }


  }

})(angular);