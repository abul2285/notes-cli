#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const NOTES_FILE = path.join(process.cwd(), 'notes.json');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(NOTES_FILE);
    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return []; // Return an empty array if notes cannot be loaded
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
};

// Centralized logging function
const logMessage = (message, type = 'info') => {
  const prefix = type === 'error' ? 'Error: ' : '';
  console.log(`${prefix}${message}`);
};

// Input validation for index
const validateIndex = (index, notesLength) => {
  const noteIndex = parseInt(index) - 1; // Convert index to zero-based
  return noteIndex >= 0 && noteIndex < notesLength ? noteIndex : null;
};

// Add a new note
const addNote = (options) => {
  if (!options.title || !options.content) {
    logMessage('Both --title and --content are required.', 'error');
    return;
  }

  const notes = loadNotes();
  notes.push({ title: options.title, content: options.content });
  saveNotes(notes);
  logMessage('Note added successfully!');
};

program
  .command('add')
  .description('Add a new note with optional --title and --content')
  .option('--title <title>', 'Title of the note')
  .option('--content <content>', 'Content of the note')
  .action(addNote);

// List all note titles
program
  .command('list')
  .description('List all note titles')
  .action(() => {
    const notes = loadNotes();
    if (notes.length === 0) {
      logMessage('No notes found.', 'error');
    } else {
      notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title}`);
      });
    }
  });

// Show a single note by its index
program
  .command('show <index>')
  .description('Show a note by its index')
  .action((index) => {
    const notes = loadNotes();
    const noteIndex = validateIndex(index, notes.length);

    if (noteIndex !== null) {
      console.log(`# ${notes[noteIndex].title}\n\n${notes[noteIndex].content}`);
    } else {
      logMessage('Note not found.', 'error');
    }
  });

// Edit a note
const editNote = (index, options) => {
  const notes = loadNotes();
  const noteIndex = validateIndex(index, notes.length);

  if (noteIndex !== null) {
    if (options.title) notes[noteIndex].title = options.title;
    if (options.content) notes[noteIndex].content = options.content;

    saveNotes(notes);
    logMessage('Note updated successfully!');
  } else {
    logMessage('Note not found.', 'error');
  }
};

program
  .command('edit <index>')
  .description('Edit a note by specifying what to change')
  .option('--title <newTitle>', 'New title of the note')
  .option('--content <newContent>', 'New content of the note')
  .action(editNote);

// Delete a note
program
  .command('delete <index>')
  .description('Delete a note')
  .action((index) => {
    const notes = loadNotes();
    const noteIndex = validateIndex(index, notes.length);

    if (noteIndex !== null) {
      notes.splice(noteIndex, 1);
      saveNotes(notes);
      logMessage('Note deleted successfully!');
    } else {
      logMessage('Note not found.', 'error');
    }
  });

// Clear all notes
program
  .command('clear')
  .description('Delete all notes')
  .action(() => {
    saveNotes([]); // Save an empty array to clear all notes
    logMessage('All notes have been deleted!');
  });

program.parse(process.argv);
