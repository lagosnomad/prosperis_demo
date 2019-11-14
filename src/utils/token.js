import jwt from 'jsonwebtoken';
import config from '../config';

/**
 * Validates the header token.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export function validateToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          message: 'Supplied token is invalid. Kindly log in to get a new token'
        });
      } else {
        req.decoded = decodedToken;
        next();
      }
    });
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Kindly supply an auth token.'
    });
  }
};

/**
 * Generates new authentication token.
 * @param {String} username 
 * @returns {String} token [Authenticated token string]
 */
export function generateToken(username) {
  const token = jwt.sign({ username: username }, config.secret, { expiresIn: '2h' });

  return token;
}