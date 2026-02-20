import * as columnServices from './column.service.js';

export const createColumn = async(req, res, next) => {
    try {
        const data = await columnServices.createColumnRepo(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const getColumnById = async(req, res, next) => {
    try {
        const data = await columnServices.getColumnByIdRepo(req.params.id);
        res.status(200).json(data);
    }catch (error) {
        next(error);
    }
}