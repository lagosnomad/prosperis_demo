/**
 * Validators for every endpoint that accepts input (in form of request params or body).
 * Ensures the correctness of the format of the data that is being stored and processed.
 */

const Joi = require('joi');

export const signupRules = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
        username: Joi.string().alphanum().min(4).max(30).required(),
        name: Joi.string().required()
    }
};

export const loginRules = {
    body: {
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
        username: Joi.string().alphanum().min(4).max(30).required()
    }
};

export const createCustomerRules = {
    body: {
        email: Joi.string().email(),
        name: Joi.string().required(),
        number: Joi.number().required(),
        address: Joi.string(),
    }
}

export const updateCustomerRules = {
    params: {
        id: Joi.string().alphanum().required()
    },
    body: {
        email: Joi.string().email(),
        name: Joi.string().required(),
        number: Joi.number().required(),
        address: Joi.string(),
    }
}

export const getCustomerRule = {
    params: {
        id: Joi.string().alphanum().required()
    }
}

export const removeCustomerRule = {
    params: {
        id: Joi.string().alphanum().required()
    }
}