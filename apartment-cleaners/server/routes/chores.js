const sequenceGenerator = require('./sequenceGenerator');
const Chore = require('../models/chores');
var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
    Chore.find()
    .populate('group')
    .then(chores => {
        res.status(200).json({
            message: 'chores fetched succesfully',
            chores: chores
        }).catch((err) => {
            res.status(500).json({
                message: 'an error has occurred',
                error: err
            })
        })
    })
})

router.post('/', (req,res,next)=>{
    const maxChoreId = sequenceGenerator.nextId("chores");

  const chore = new Chore({
    id: maxChoreId,
    name: req.body.name,
    detail: req.body.detail,
    equipment: req.body.equipment,
    jobNum: req.body.jobNum,
  });

  chore.save()
    .then(createdChore => {
      res.status(201).json({
        message: 'Chore added successfully',
        chore: createdChore
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
})

router.put('/:id', (req, res, next) => {
    Chore.findOne({ id: req.params.id })
      .then(chore => {
        chore.name = req.body.name;
        chore.detail = req.body.detail;
        chore.equipment = req.body.equipment;
        chore.jobNum = req.body.jobNum;
  
        Chore.updateOne({ id: req.params.id }, chore)
          .then(result => {
            res.status(204).json({
              message: 'Chore updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Chore not found.',
          error: { chore: 'Chore not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Chore.findOne({ id: req.params.id })
      .then(chore => {
        Chore.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Chore deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Chore not found.',
          error: { chore: 'Chore not found'}
        });
      });
  });

module.exports = router; 