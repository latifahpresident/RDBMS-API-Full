const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

const url = '/api/cohorts/';
const studentsurl = '/api/students/';

server.get(url, async(req, res) => {
    try{
        const data = await db('cohorts')
        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(`{error: 'This route does not exsi'}`)
    }
});

server.get(studentsurl, async(req, res) => {
    try{
        const data = await db('students')
        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(`{error: 'This route does not exsi'}`)
    }
});

module.exports = server