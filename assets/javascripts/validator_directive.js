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
      scope.$on('$destroy', removeValidationListener);

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
            typeName =  typeArgs.splice(0, 1, ngModel.$viewValue)[0],
            decoratorConfig;

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
              case VALIDATION_TYPE.MINLENGTH:
              case VALIDATION_TYPE.MAXLENGTH:
                isValid = validator[typeName].apply(this, typeArgs);
                decoratorConfig = { n: typeArgs[1] };
                break;
              default:
                isValid = validator[typeName].apply(this, typeArgs);
                break;
            }

            if (!isValid) {
              ngModel.$setValidity(VALIDATION_ERROR[typeName.toUpperCase()], false);
              decorate(typeName, decoratorConfig);
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

      function decorate(type, config) {
        if (!errorElement) {
          elem.parent().addClass('has-error');
          errorElement = elem.after('<p class="text-danger">' + messages.get(type, config) + '</p>').next();
        }
      }

      function clearDecoration() {
        if (errorElement) {
          errorElement.remove();
          elem.parent().removeClass('has-error');
          errorElement = null;
        }
      }

      function removeValidationListener() {
        elem.off('blur', doValidations);
      }

    }
  }
}) (angular);
