const { json } = require("body-parser");
const PROJECTS = require("../model/projects");
const nodemailer = require('nodemailer');

var pdf = require("pdf-creator-node");
var fs = require("fs");

var html = fs.readFileSync("file.html", "utf8");

module.exports = {
    getProjects : async (req, res, next)=>{
        try {const projects = await PROJECTS.find();
        res.json({
            result : projects.map(res =>{
                return {
                    projectName : res.projectName,
                    year : res.year,
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
        })}catch(err){
            res.json({"message" : "inserted successfully"});
        }
    },
    getProjectsByTeacher : async (req, res, next)=>{
        const projects = await PROJECTS.find({owner : req.params.id});
        res.json({
            result : projects.map(res =>{
                return {
                    projectName : res.projectName,
                    year : res.year,
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

    insertProjects: async (req, res) => {
      try {
        const email = req.params.email;
        console.log(email);
        const project = await new PROJECTS({
          projectName: req.body.projectName,
          year: req.body.year,
          superName: req.body.superName,
          superMark: req.body.superMark,
          presName: req.body.presName,
          presMark: req.body.presMark,
          examName: req.body.examName,
          examMark: req.body.examMark,
          finalMark: req.body.finalMark,
          studentOne: req.body.studentOne,
          studentTwo: req.body.studentTwo,
          studentThree: req.body.studentThree,
          owner: req.body.owner,
        }).save();
    
        var option = {
          format: "A4",
          orientation: "portrait",
          border: "10mm",
        };
    
        var document = {
          html: html,
          data: {
            studentOne: req.body.studentOne,
            studentTwo: req.body.studentTwo,
            studentThree: req.body.studentThree,
            titre: req.body.projectName,
            encadreur: req.body.superName,
            president: req.body.presName,
            examinateur: req.body.examName,
            mark: req.body.finalMark,
          },
          path: "./output.pdf",
          type: "",
        };
    
        pdf
          .create(document, option)
          .then(() => {
            const transporter = nodemailer.createTransport({
              service: "hotmail",
              auth: {
                user: "viva.app@outlook.com",
                pass: "Azerty12",
              },
            });
    
            const options = {
              from: "viva.app@outlook.com",
              to: email,
              subject: "VIVA PROJECT DETAILS",
              text:
                "Dear teacher, here is the result of your insertion" +
                "\n\n" +
                "Examinator name : " +
                req.body.examName +
                "\n" +
                "Examinator mark : " +
                req.body.examMark +
                "\n" +
                "President name : " +
                req.body.presName +
                "\n" +
                "President mark : " +
                req.body.presMark +
                "\n" +
                "Supervisor name : " +
                req.body.superName +
                "\n" +
                "Supervisor mark : " +
                req.body.superMark +
                "\n" +
                "Student one : " +
                req.body.studentOne +
                "\n" +
                "Student two : " +
                req.body.studentTwo +
                "\n" +
                "Student three : " +
                req.body.studentThree +
                "\n" +
                "Final mark : " +
                req.body.finalMark +
                "\n" +
                "Year : " +
                req.body.year +
                "\n",
    
              attachments: [
                {
                  path: "./output.pdf",
                },
              ],
            };
    
            transporter.sendMail(options, function (err, info) {
              if (err) {
                console.log(err);
                return;
              }
              console.log("Sent : " + info.response);
            });
    
            res.json({ message: "inserted successfully", id: project._id });
          })
          .catch((error) => {
            console.error(error);
            return res.json({ error: error });
          });
      } catch (err) {
        res.json({ error: err.errors.name.message });
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