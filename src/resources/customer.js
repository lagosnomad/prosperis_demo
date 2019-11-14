import validateRule from 'express-validation';

import {
    validateToken
} from '../utils/token';
import Customer from '../controllers/customer';
import {
    createCustomerRules,
    updateCustomerRules,
    removeCustomerRule,
    getCustomerRule
} from '../validations';
/**
 * 
 * 
 */
module.exports = app => {
    app.route('/customer').post(validateRule(createCustomerRules), validateToken, Customer.create);
    app.route('/customer/all').get(validateToken, Customer.all);
    app.route('/customer/:id').get(validateRule(getCustomerRule), validateToken, Customer.get);
    app.route('/customer/:id').put(validateRule(updateCustomerRules), validateToken, Customer.update);
    app.route('/customer/:id').delete(validateRule(removeCustomerRule), validateToken, Customer.remove);
};