import User from '../entities/user';
import logger from '../utils/logger';
import { generateToken } from '../utils/token';

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = (req, res) => {
	const { username, password } = req.body;

	User.findOne({ username: username })
		.then(user => {
			user.verifyPassword(password)
				.then(isValidPassword => {
					if (isValidPassword) {
						const userData = {
							username: username,
							token: generateToken(username)
						};

						res.status(200).json({ status: 'success', data: userData });
					} else {
						res.status(401).json({ status: 'error', message: "Invalid username or password. Please try again" })
					}
				})
				.catch(err => {
					logger.error("Couldn't validate user auth details.")
					logger.error(err);
					throw error;
				})
		})
		.catch(err => {
			logger.error(err);
			res.status(401).json({ status: 'error', message: "Sorry, we couldn't log you in. Kindly try again later" })
		})

};
/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token 
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = (req, res) => {
	const userData = {
		email: req.body.email,
		username: req.body.username,
		name: req.body.name,
		password: req.body.password
	};

	User.create(userData)
		.then(user => {
			delete userData.password;
			userData.token = generateToken(userData.username);

			res.status(201).json({ status: 'success', data: userData });
		})
		.catch(err => {
			logger.error(`Error occurred while creating user ${err}`);
			res.status(401).json({ status: 'error', message: 'An error occurred while creating your user. Please try again' });
		})
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	res.status(404).json({ err: "not implemented" })
};

export default {
	login,
	signup,
	forgotPassword
}