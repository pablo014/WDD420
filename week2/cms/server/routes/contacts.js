const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
    Contact.find()
    .populate('group')
    .then(contacts => {
        res.status(200).json({
            message: 'contacts fetched succesfully',
            contacts: contacts
        }).catch((err) => {
            res.status(500).json({
                message: 'an error has occurred',
                error: err
            })
        })
    })
})

router.post('/', (req,res,next)=>{
    const maxDocumentId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxcontactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
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
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.imageUrl = req.body.imageUrl;
        contact.phone = req.body.phone;
        contact.group = req.body.group;
  
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