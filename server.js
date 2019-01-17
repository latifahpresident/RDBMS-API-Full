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

server.get(`${url}:id`, async(req, res) => {
    const { id } = req.params;
    try{
        const results = await db('cohorts').where({id})
        console.log(results)
        if(results === 0) {
            res.status(404).json(`{error: 'That ID was not found'}`)
        } else {
            res.status(200).json(results)
        }
    }catch(err){
        res.status(500).json(`{error: 'User information could not be found'}`)
    }
});


server.post(url, async(req, res) => {
    const {id} =req.params;
    const { name } = req.body;
    try{
        if (!name) {
            res.status(404).json(`{error: 'Please enter name'}`)
        } else {
            const results = await db('cohorts').where({id}).insert(req.body)
            res.status(201).json(results)
        }
    }catch(err){
        res.status(500).json(`{error: 'data not created'}`)
    }
});

server.put(`${url}:id`, async(req, res) => {
    const data = req.body;
    const { name } = req.body
    try{
        const results = await db('cohorts').where({ id: req.params.id}).update(data)
        if(!name){
            res.status(404).json(`{error: 'Please enter cohorts name}`)
        } else {
            res.status(200).json(results)
        }
    }catch(err){
        res.status(500).json(err)
    }
});

server.delete(`${url}:id`, async(req, res) => {

    const { id } = req.params;
    db(id)
    try{
        const data = await db('cohorts')
            .where({ id: req.params.id }).del()
            if(data) {
                res.status(204).json(data)
            } else {
                res.status(404).json(`{error: 'That ID was  not found'}`)
            }
    }catch(err){
        res.status(500).json(err)
    }
});

//STUDENTS ROUTES
server.get(studentsurl, async(req, res) => {
    try{
        const data = await db('students')
        res.status(200).json(data)
    } catch(err) {
        res.status(500).json(`{error: 'This route does not exsi'}`)
    }
});

server.get(`${studentsurl}:id`, async(req, res) => {
    const { id } = req.params;
    try{
        const data = await db('students').where({id})
        if(data === 0) {
            res.status(404).json(`{error: 'That ID was not found'}`)
        } else {
            res.status(200).json(data)
        }
    }catch(err){
        res.status(500).json(`{error: 'User information could not be found'}`)
    }
});

server.post(studentsurl, async(req, res) => {
    const {id} =req.params;
    const { name } = req.body;
    try{
        if (!name) {
            res.status(404).json(`{error: 'Please enter name'}`)
        } else {
            const results = await db('students').where({id}).insert(req.body)
            res.status(201).json(results)
        }
    }catch(err){
        res.status(500).json(`{error: 'data not created'}`)
    }
});

server.put(`${studentsurl}:id`, async(req, res) => {
    const data = req.body;
    const { name } = req.body
    try{
        const results = await db('students').where({ id: req.params.id}).update(data)
        if(!name){
            res.status(404).json(`{error: 'Please enter student's name}`)
        } else {
            res.status(200).json(results)
        }
    }catch(err){
        res.status(500).json(err)
    }
});

server.delete(`${studentsurl}:id`, async(req, res) => {

    const { id } = req.params;
    db(id)
    try{
        const data = await db('students')
            .where({ id: req.params.id }).del()
            if(data) {
                res.status(204).json(data)
            } else {
                res.status(404).json(`{error: 'That ID was  not found'}`)
            }
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = server