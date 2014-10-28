(function(angular) {

  var
  definitions;

  definitions = [
    chNoBlur
  ];

  angular.module('ch.Validator')
    .directive('chNoBlur', definitions);

  function chNoBlur() {

    return {
      scope: false,
      link: link
    };

    function link(scope, elem, attrs) {
      elem.off('blur');

    }
  }
}) (angular);
