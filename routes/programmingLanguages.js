const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});


router.post('/create', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.create(req.body));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }
  });


//POST CLIENT 
router.post('/create/client', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.createClient(req.body));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }
  }); 

//GET LISTAR CLIENT 

router.get('/list/client', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultipleClient(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}); 

router.post('/delete/client', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getDeleteClient(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}); 


//GET lista plan 
router.get('/listplan', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.getMultiplePlan(req.query.page));
    } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
    }
  });  

module.exports = router;