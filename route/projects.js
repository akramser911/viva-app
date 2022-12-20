const express = require ('express');
const { getProjects, insertProjects, deleteProjects, getProj } = require('../logic/projects');
const router = express.Router();

router.get('/', getProjects);
router.post('/', insertProjects);
router.delete('/:id', deleteProjects);
router.get('/:id', getProj);

module.exports = router;