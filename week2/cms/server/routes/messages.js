const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/message');
var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
    Contact.find().then(messages => {
        res.status(200).json({
            message: 'messages fetched succesfully',
            messages: messages
        }).catch((err) => {
            res.status(500).json({
                message: err
            })
        })
    })
})

router.post('/', (req,res,next)=>{
    const maxDocumentId = sequenceGenerator.nextId("messages");

  const contact = new Contact({
    id: maxcontactId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Document added successfully',
        contact: createdContact
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
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.subject = req.body.subject;
        contact.msgText = req.body.msgText;
        contact.sender = req.body.sender;
  
        Contact.updateOne({ id: req.params.id }, document)
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
          error: { document: 'Contact not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
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
          message: 'Contact not found.',
          error: { document: 'Contact not found'}
        });
      });
  });

module.exports = router; 