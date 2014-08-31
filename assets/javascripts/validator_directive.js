(function(angular) {

  var
  definitions;

  definitions = [
    'validator',
    'VALIDATION_MESSAGE',
    'VALIDATION_ERROR',
    'VALIDATION_EVENT',
    chValidator
  ];

  angular.module('ch.Validator')
    .directive('chValidator', definitions);

  function chValidator(validator, VALIDATION_MESSAGE, VALIDATION_ERROR, VALIDATION_EVENT) {

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
          doValidation(validationTypes[i]);
        }

        function doValidation(type) {
          if (validator[type]) {
            if (!validator[type](ngModel.$viewValue, scope.field)) {
              ngModel.$setValidity(VALIDATION_ERROR[type.toUpperCase()], false);
              decorate(type.toUpperCase());
            }
            else {
              ngModel.$setValidity(VALIDATION_ERROR[type.toUpperCase()], true);
              clearDecoration();
            }
          }
        }
      }

      function decorate(type) {
        if (!errorElement) {
          elem.parent().addClass('has-error');
          errorElement = elem.after('<p class="text-danger">' + VALIDATION_MESSAGE[type] + '</p>').next();
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
