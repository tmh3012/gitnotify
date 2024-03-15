'use strict'
import 'dotenv/config';
import _ from 'lodash';

const fetchApi = async (url, options) => {
    return (await fetch(url, options)).json();
}
const env = (envKey, defaultVal = '') => {
    return process.env[envKey] || defaultVal
};
const getDataInFields = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}
module.exports = {
    fetchApi,
    env,
    getDataInFields
}