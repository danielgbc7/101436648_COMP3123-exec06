const noteModel = require('../models/Notes.js');

// Create a new Note
app.post('/notes', (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    // Create a new note instance
    const note = new noteModel({
        content: req.body.content,
    });

    // Save the note to the database
    note.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the note."
            });
        });
});

// Retrieve all Notes
app.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => {
            res.send(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

// Retrieve a single Note with noteId
app.get('/notes/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
});

// Update a Note with noteId
app.put('/notes/:noteId', (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    noteModel.findByIdAndUpdate(req.params.noteId, { content: req.body.content }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
});

// Delete a Note with noteId
app.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
});
