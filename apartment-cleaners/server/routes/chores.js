const Chore = require('../models/chores');
var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
    Contact.find()
    .populate('group')
    .then(contacts => {
        res.status(200).json({
            message: 'contacts fetched succesfully',
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
    const maxDocumentId = sequenceGenerator.nextId("chores");

  const chore = new Chore({
    id: maxcontactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  chore.save()
    .then(createdChore => {
      res.status(201).json({
        message: 'Contact added successfully',
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
        chore.email = req.body.email;
        chore.imageUrl = req.body.imageUrl;
        chore.phone = req.body.phone;
        chore.group = req.body.group;
  
        Contact.updateOne({ id: req.params.id }, chore)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
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
          message: 'Contact not found.',
          error: { chore: 'Contact not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(chore => {
        Chore.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
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