const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const db = require('../models')

const getAll = async (tableName) => {
    const [results, metadata] = await db.sequelize.query(`SELECT * from "${tableName}"`);
    return results;
};

module.exports = {
    getAll
};
