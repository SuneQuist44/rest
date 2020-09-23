const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors())

const users = [
    { id: 1, name: 'Jimmy' },
    { id: 2, name: 'Sune' },
    { id: 3, name: 'Lukas' }
]

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    !user ? res.status(404).send('The user does not exist') : res.send(user);
})

app.delete('/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    !user ? res.status(404).send('The user does not exist') : res.send(user);

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user)
})

app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }
    users.push(user)
    res.send(user)
})

const port = process.env.PORT || 1600;
app.listen(port, () => console.log(`Port live on ${port}`))

