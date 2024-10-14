const mongoose = require('mongoose');

// Create Note Schema
const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true, // Ensure title is required
        trim: true // Removes whitespace from both ends
    },
    noteDescription: {
        type: String,
        required: true, // Ensure description is required
        trim: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'], // Define allowed values for priority
        required: true // Ensure priority is required
    },
    dateAdded: {
        type: Date,
        default: Date.now // Automatically set to current date
    },
    dateUpdated: {
        type: Date
    }
});

// Update dateUpdated field before saving the document
noteSchema.pre('save', function(next) {
    this.dateUpdated = Date.now(); // Set dateUpdated to current date
    next();
});

// Create and export the Note model
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
