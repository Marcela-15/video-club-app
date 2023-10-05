const express = require('express');
const {Director} = require('../db');


function create (req, res, next) {
    //res.send('Directors create');
    const name = req.body.name;
    const lastName = req.body.lastName;

    Director.create({
        name : name,
        lastName : lastName
    }).then(object => res.json(object))
    .catch(err => res.send(err));
}

function list (req, res, next) {
    //res.send('Directors list');
    Director.findAll().then(object => res.json(object))
    .catch(err => res.send(err));
}

function index (req, res, next) {
    const id = req.params.id; //pq lo obtenemos del head
    Director.findByPk(id)
        .then(object => res.json(object))
        .catch(err => res.send(err));
}


function replace (req, res, next) {  //se reemplaza completamente si me falta un valor aún así lo pongo en blanco
    const id = req.params.id;
    Director.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name : "";
            const lastName = req.body.lastName ? req.body.lastName : "";
            object.update({
                name : name,
                lastName : lastName
            })
                .then(obj = res.json(obj))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update (req, res, next) {  //el update actualiza si me falta un valor deja el que tiene
    const id = req.params.id;
    Director.findByPk(id)
        .then(object => {
            const name = req.body.name ? req.body.name : object.name;
            const lastName = req.body.lastName ? req.body.lastName : object.lastName;
            object.update({
                name : name,
                lastName : lastName
            })
                .then(obj = res.json(obj))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy (req, res, next) {
    const id = request.params.id;

    //Destroy con sequelize
    Director.destroy({
        where : {id : id}
    })
        .then(object => res.json(object))
        .catch(err => res.send(err));
}

module.exports = {list, index, create, replace, update, destroy};