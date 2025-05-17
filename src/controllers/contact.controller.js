const contactModel = require('../models/contact.models');
const tsModel = require('../models/ts.usermodel');


const contact = async (req, res) => {
    const { fullname, email, message } = req.body;
  
 
    try {
      const newContact = new contactModel({ fullname, email, message });
      await newContact.save();
      res.status(201).json({ message: 'Message received successfully!' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ message: 'Server error while saving message' });
    }
  }


const teacher = async (req, res) => {
  try {
    const { fullname, email, area, message } = req.body;

    console.log(fullname, email, area, message);
    

   

    // Create and save new entry
    const newContact = new tsModel({ fullname, email, area, message });
    await newContact.save();

    return res.status(201).json({ message: 'Message received successfully!' });

  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ message: 'Server error while saving message' });
  }
};




const student = async (req, res) => {  
  const { fullname, email, subject, message } = req.body;

  console.log(fullname, email, subject, message);

  try {
    const newContact = new tsModel({ fullname, email, subject, message });
    await newContact.save();
    res.status(201).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Server error while saving message' });
  }
};

module.exports = student;

  module.exports= {contact,teacher,student};