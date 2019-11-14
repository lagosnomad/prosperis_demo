/**
 * A simple CRUD controller for customers
 * Create the necessary controller methods 
 */

import Customer from '../entities/customer';
import logger from '../utils/logger';

/**
 * Fetch all customers.
 * @param {*} req 
 * @param {*} res 
 */
const all = (req, res) => {
    Customer.find({
            owner: req.decoded.username,
            status: 'active'
        })
        .then(customers => {
            res.status(200).json({
                status: 'success',
                data: customers || {}
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(400).json({
                status: 'error',
                message: 'An error occurred while fetching customers. Please try again'
            })
        })
}


/**
 * Creates a new customer
 * @param {*} req 
 * @param {*} res 
 */
const create = (req, res) => {
    const customerData = req.body;
    customerData.owner = req.decoded.username;
    customerData.status = 'active';

    Customer.create(customerData)
        .then(customer => {
            res.status(201).json({
                status: 'success',
                data: customer
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(400).json({
                status: 'error',
                message: 'An error occurred while creating customer. Please try again'
            })
        })

}

/**
 * Fetch specific customer information using its id
 * @param {*} req 
 * @param {*} res 
 */
const get = (req, res) => {
    Customer.findOne({
            owner: req.decoded.username,
            status: 'active',
            _id: req.params.id
        })
        .then(customer => {
            res.status(201).json({
                status: 'success',
                data: customer || {}
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(400).json({
                status: 'error',
                message: 'Unable to find customer. Please try again'
            })
        })
}

/**
 * Update specific customer information for authenticated user.
 * @param {*} req 
 * @param {*} res 
 */
const update = (req, res) => {
    const query = {
        owner: req.decoded.username,
        _id: req.params.id
    };
    Customer.findOneAndUpdate(query, req.body, {
            new: true
        })
        .then(customer => {
            res.status(201).json({
                status: 'success',
                data: customer
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(400).json({
                status: 'error',
                message: 'Unable to update customer. Please try again'
            })
        })
}

/**
 * "Deletes" specified customer information by modifying the status to inactive so it's not returned as a response
 * @param {*} req 
 * @param {*} res 
 */
const remove = (req, res) => {
    const query = {
        owner: req.decoded.username,
        _id: req.params.id
    };

    Customer.findOneAndUpdate(query, {
            status: 'inactive'
        }, {
            new: true
        })
        .then(customer => {
            res.status(201).json({
                status: 'success',
                data: {}
            });
        })
        .catch(err => {
            logger.error(err);
            res.status(400).json({
                status: 'error',
                message: 'Unable to remove customer. Please try again'
            })
        })
}

export default {
    // get all customers 
    all,
    // get a single customer
    get,
    // create a single customer
    create,
    // update a single customer
    update,
    // remove a single customer
    remove
}