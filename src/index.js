const express = require('express');
const crypto = require('node:crypto');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = [];

// CREATE a user
app.post('/users', (req, res) => {
    const { name, email } = req.body || {};

    if (!name || !email) {
        return res.sendStatus(400);
    }

    const user = { 
        id: crypto.randomUUID(), name, email 
    };

    users.push(user);
    return res.status(201).json(user);
});

// RETRIEVE a user
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.sendStatus(404);
    }

    return res.status(200).json(user);
});

// UPDATE a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body || {};
    const i = users.findIndex(u => u.id === id);

    if (i === -1) {
        return res.sendStatus(404);
    }
    if (!name || !email) {
        return res.sendStatus(400);
    }

    users[i].name = name;
    users[i].email = email;

    return res.status(200).json(users[i]);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const i = users.findIndex(u => u.id === id);

    if (i === -1) {
        return res.sendStatus(404);
    }

    users.splice(i, 1);

    return res.sendStatus(204);
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing