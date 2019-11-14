import Auth from '../controllers/auth';
import validate from 'express-validation';
import {
	signupRules,
	loginRules
} from '../validations';

module.exports = app => {
	app.route('/auth/login').post(validate(loginRules), Auth.login);
	app.route('/auth/signup').post(validate(signupRules), Auth.signup);

	/*** BONUS ***/
	app.route('/auth/forgotPassword').post(Auth.forgotPassword);
};