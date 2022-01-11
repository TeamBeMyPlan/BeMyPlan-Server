import express, { Request, Response } from 'express';
import { db } from '../models';

const getUser = async (req, res) => {
    const { userId } = req.params;
    
    const result = db.User.findOne({
        where: { id: userId },
    });
    console.log(result);
}

export {
    getUser,
};