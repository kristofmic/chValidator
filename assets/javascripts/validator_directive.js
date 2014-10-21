(function(angular) {

  var
  definitions;

  definitions = [
    'validator',
    'validatorMessages',
    'VALIDATION_TYPE',
    'VALIDATION_ERROR',
    'VALIDATION_EVENT',
    chValidator
  ];

  angular.module('ch.Validator')
    .directive('chValidator', definitions);

  function chValidator(validator, messages, VALIDATION_TYPE, VALIDATION_ERROR, VALIDATION_EVENT) {

    return {
      require: 'ngModel',
      scope: false,
      link: link
    };

    function link(scope, elem, attrs, ngModel) {
      var
        errorElement,
        validationTypes = attrs.chValidator.split(' ');

      elem.on('blur', doValidations);
      scope.$on(VALIDATION_EVENT.VALIDATE, doValidations);

      function doValidations() {
        for (var i = 0, len = validationTypes.length; i < len; i++) {
          if (validationTypes[i] && !doValidation(validationTypes[i])) {
            break;
          }
        }

        function doValidation(type) {
          var
            isValid = true,
            typeArgs = type.split(':'),
            typeName =  typeArgs.splice(0, 1, ngModel.$viewValue)[0];

          if (validator[typeName]) {
            switch(typeName) {
              case VALIDATION_TYPE.CONFIRM:
                var
                  scopeProperty,
                  scopeValue;

                if (typeArgs[1]) {
                  scopeProperty = typeArgs[1].split('.');

                  for (var i = 0, len = scopeProperty.length; i < len; i++) {
                    if (i) {
                     scopeValue = scopeValue[scopeProperty[i]];
                    }
                    else {
                      scopeValue = scope[scopeProperty[i]];
                    }
                  }

                  typeArgs[1] = scopeValue;
                  isValid = validator[typeName].apply(this, typeArgs);
                }
                break;
              default:
                isValid = validator[typeName].apply(this, typeArgs);
                break;
            }

            if (!isValid) {
              ngModel.$setValidity(VALIDATION_ERROR[typeName.toUpperCase()], false);
              decorate(typeName);
              return false;
            }
            else {
              ngModel.$setValidity(VALIDATION_ERROR[typeName.toUpperCase()], true);
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
