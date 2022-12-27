const { json } = require("body-parser");
const PROJECTS = require("../model/projects");

module.exports = {
    getProjects : async (req, res, next)=>{
        const projects = await PROJECTS.find();
        res.json({
            result : projects.map(res =>{
                return {
                    id : res.id,
                    superName : res.superName,
                    superMark : res.superMark,
                    presName : res.presName,
                    presMark : res.presMark,
                    examName : res.examName,
                    examMark : res.examMark,
                    finalMark : res.finalMark,
                    studentOne : res.studentOne,
                    studentTwo : res.studentTwo,
                    studentThree : res.studentThree,
                    owner : req.body.owner
                }
            })
        })
    },
    getProjectsByTeacher : async (req, res, next)=>{
        const projects = await PROJECTS.find({owner : req.params.id});
        res.json({
            result : projects.map(res =>{
                return {
                    id : res.id,
                    superName : res.superName,
                    superMark : res.superMark,
                    presName : res.presName,
                    presMark : res.presMark,
                    examName : res.examName,
                    examMark : res.examMark,
                    finalMark : res.finalMark,
                    studentOne : res.studentOne,
                    studentTwo : res.studentTwo,
                    studentThree : res.studentThree,
                    owner : req.body.owner
                }
            })
        })
    },

    insertProjects : async (req, res)=>{
        try {const project = await new PROJECTS ({
                    superName : req.body.superName,
                    superMark : req.body.superMark,
                    presName : req.body.presName,
                    presMark : req.body.presMark,
                    examName : req.body.examName,
                    examMark : req.body.examMark,
                    finalMark : req.body.finalMark,
                    studentOne : req.body.studentOne,
                    studentTwo : req.body.studentTwo,
                    studentThree : req.body.studentThree,
                    owner : req.body.owner

        }).save()
        res.json({"message" : "inserted successfully",
                    id : project.id
        
        })}catch(err) {
                res.json({error : err.errors.name.message});
            }
    },

    deleteProjects : async (req, res)=> {
        const id = req.params.id;
        const del = await PROJECTS.findByIdAndRemove(id);
        res.json({"delete" : del});
    },

    getProj : async (req, res)=> {
        const id = req.params.id;
        const project = await PROJECTS.findById(id);
        res.json({project});
    }
}