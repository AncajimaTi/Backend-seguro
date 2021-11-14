const db = require('./db');
const helper = require('../helpers');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * from prueba LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(programmingLanguage) {
    const result = await db.query(
        `INSERT INTO prueba 
      (edad, nombre,apellido) 
      VALUES 
      (?, ?, ?)`,
        [
            programmingLanguage.edad, programmingLanguage.nombre,
            programmingLanguage.apellido
        ]
    );

    let message = 'Error in creating programming language';

    if (result.affectedRows) {
        message = 'Programming language created successfully';
    }

    return { message };
}


async function createClient(programmingLanguage) {
    const result = await db.query(
        `INSERT INTO cliente 
      (idplan, nombre,doc_number,apellido_paterno,apellido_materno,fecha_nacimiento,genero,segura) 
      VALUES 
      (?,?,?,?,?,?,?,?)`,
        [
            programmingLanguage.idplan, programmingLanguage.nombre,programmingLanguage.doc_number, programmingLanguage.apellido_paterno, programmingLanguage.apellido_materno, programmingLanguage.fecha_nacimiento,
            programmingLanguage.genero, programmingLanguage.segura
        ]
    );

    let message = 'Error in creating programming language';

    if (result.affectedRows) {
        message = 'Guardado con exito';
    }

    return { message };
}



async function getMultiplePlan(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * from plan LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getMultipleClient(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT c.idcliente,c.idplan,c.nombre,c.apellido_paterno,c.apellido_materno,c.fecha_nacimiento,c.genero,c.segura,c.doc_number,p.name_plan,p.cobertura
        FROM cliente AS c INNER JOIN plan AS p ON c.idplan=p.idplan LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}




async function getDeleteClient(programmingLanguage) {
    const result = await db.query(
        `DELETE FROM cliente WHERE cliente.idcliente=?`,
        [programmingLanguage.idcliente]
    );
    let message = 'Error in creating programming language';

    if (result.affectedRows) {
        message = 'Eliminado con exito';
    }

    return { message };
}

module.exports = {
    getMultiple,
    create,
    getMultiplePlan,
    createClient,
    getMultipleClient,
    getDeleteClient
}