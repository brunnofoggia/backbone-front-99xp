
/**
 * 
 */
import _ from 'underscore-99xp';
import front from 'front-99xp';
import validate from 'validate-99xp';

var validation = _.clone(validate);
validation.validateAll = false;
validation.validations = function() { return {}; };

export default validation;