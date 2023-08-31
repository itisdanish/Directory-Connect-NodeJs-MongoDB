const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Contact = require('./database/addContact')

const app = new express()

mongoose.connect('mongodb://localhost/contact', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',async (req,res)=>{
    const contacts = await Contact.find({})
    // console.log(contacts)
    res.render('index',{
        contacts
    })
})

app.post('/post/store', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    // console.log('Contact created:', contact);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).send('Error creating contact');
  }
});


app.get('/app', (req,res)=>{
    res.render('app')
})

app.get('/',(req,res)=>{
    res.render('index')
})



// const PORT = process.env || 3500;
app.listen(3000,()=>{
    console.log(`Server is on 3000`)
})