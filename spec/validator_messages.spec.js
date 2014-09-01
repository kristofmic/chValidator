describe('validatorMessages', function() {

  var
    service,
    provider,
    VALIDATION_TYPE;

  beforeEach(module('ch.Validator', function(validatorMessagesProvider) {
    provider = validatorMessagesProvider;
  }));

  beforeEach(inject(function($injector) {
    VALIDATION_TYPE = $injector.get('VALIDATION_TYPE');

    service = $injector.get('validatorMessages');
  }));



  describe('provider', function() {
    it('should exist', function() {
      expect(provider).to.not.be.undefined;
    });

    describe('setMessage()', function() {
      it('should set a message for a validation type', function() {
        expect(service.get(VALIDATION_TYPE.REQUIRED)).to.not.equal('Foobar');

        provider.setMessage(VALIDATION_TYPE.REQUIRED, 'Foobar');

        expect(service.get(VALIDATION_TYPE.REQUIRED)).to.equal('Foobar');
      });

      it('should not set a message for a nonexistent validation type', function() {
        expect(service.get('foo')).to.be.undefined;

        provider.setMessage('foo', 'Foobar');

        expect(service.get('foo')).to.be.undefined;
      });
    });

    describe('setMessages()', function() {
      it('should set multiple messages', function() {
        expect(service.get(VALIDATION_TYPE.REQUIRED)).to.not.equal('Foobar');
        expect(service.get(VALIDATION_TYPE.EMAIL)).to.not.equal('Raboof');

        var messages = {};
        messages[VALIDATION_TYPE.REQUIRED] = 'Foobar';
        messages[VALIDATION_TYPE.EMAIL] = 'Raboof';
        provider.setMessages(messages);

        expect(service.get(VALIDATION_TYPE.REQUIRED)).to.equal('Foobar');
        expect(service.get(VALIDATION_TYPE.EMAIL)).to.equal('Raboof');
      });

    });
  });

  describe('factory', function() {
    it('should exist', function() {
      expect(service).to.not.be.undefined;
    });

    describe('get()', function() {
      it('should return a message for a valid type', function() {
        expect(service.get(VALIDATION_TYPE.REQUIRED).length).to.be.above(0);
        expect(service.get('foobar')).to.be.undefined;
      });
    });
  });
});