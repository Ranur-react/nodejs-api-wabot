const { error } = require('console');
const { Op } = require('sequelize');
const ConfigApp = require('../models/ConfigApp');

const create = async (content) => {
    try {
        const result = await ConfigApp.create(content);
        return result;
    } catch (error) {
        throw new Error(`Error creating data: ${error.message}`);
    }
}
const get = async () => {
    try {
        const result = await ConfigApp.findAll();
        return result;
    } catch (error) {
        throw new Error(`Error fetching ConfigApp: ${error.message}`);
    }
}
const getByPk = async (id) => {
    try {
        const result = await ConfigApp.findByPk(id);
        return result;
    } catch (error) {
        throw new Error(`Error fetching ConfigApp: ${error.message}`);
    }
}
const deleteByPK = async (id) => {
    try {
        const result = await ConfigApp.findByPk(id)
        if (!result) throw new Error("data not found");
        await result.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error fetching ConfigApp: ${error.message}`);
    }
}
const getByConfigName = async (param) => {
    try {
        const result = await ConfigApp.findAll({
            where: {
                configName: {
                    [Op.like]: `%${param}%`
                }
            }
        });
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching config: ${error.message}`);
    }
}

module.exports = {
    get,
     create,
    deleteByPK,
    getByPk,
    getByConfigName
}