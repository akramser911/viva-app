const express = require ('express');
const { getProjects, insertProjects, deleteProjects, getProj, getProjectsByTeacher} = require('../logic/projects');
const router = express.Router();

router.get('/teacher/:id', getProjectsByTeacher);
router.get('/', getProjects);
router.post('/:email', insertProjects);
router.delete('/:id', deleteProjects);
router.get('/:id', getProj);

module.exports = router;