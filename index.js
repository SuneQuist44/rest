const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// Mongoose basket
const Basket = require('./modal')

app.use(express.json())
app.use(cors())

// Connect to MongoDB
const mongoURL = 'mongodb+srv://sune:passwordidk@cluster0.voqv4.mongodb.net/user?retryWrites=true&w=majority';
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(result => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error: ', err))


app.post('/basket/post', (req, res) => {
    const basket = new Basket({
        item: req.body.itemId,
        id: req.body.id,
        qty: req.body.qty,
    })

    basket.save()
        .then(result => console.log(result, ' was succefully added to the basket'))
        .catch(err => console.log('Error: ', err))
})

app.get('/basket/get', (req, res) => {
    Basket.find()
        .then(result => res.send(result))
        .catch(err => console.log('Error: ', err))
})

app.delete('/basket/get/:id', (req, res) => {
    const id = req.params.id;
    Basket.findByIdAndDelete(id)
        .then(result => res.json({ redirect: '/' }))
        .catch(err => console.log('Error: ', err))
})

app.put('/basket/get/:id', (req, res) => {
    const id = req.params.id;
    const qty = { qty: req.body.qty }
    Basket.findOneAndUpdate(qty, { qty: req.body.qty })
        .then(result => res.json({ redirect: '/' }))
        .catch(err => console.log('Error: ', err))
})

const port = process.env.PORT || 1600;
app.listen(port, () => console.log(`Port live on ${port}`))

