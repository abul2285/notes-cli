# Note Taking CLI Tool

A simple command-line interface (CLI) tool for creating, editing, deleting, and managing notes. This tool allows you to quickly manage your notes directly from your terminal.

## Features

- **Add notes** with a title and content.
- **List all notes** by title.
- **View a single note** by its index.
- **Edit notes** to update the title or content.
- **Delete notes** by index.
- **Clear all notes** at once.

## Installation

To use this tool, you'll need to have Node.js installed on your machine. Once Node.js is set up, you can install the CLI globally or clone the repository.

### Clone the repository

```bash
git clone https://github.com/yourusername/note-taking-cli.git
cd note-taking-cli
```

### Install Dependencies

```bash
npm install
```

### Link the CLI

To make the CLI available globally, run the following command in the project directory:

```bash
npm link
```

## Usage

After installation, you can use the CLI with the following commands:

### Add a Note

To add a new note with a title and content:

```bash
note add --title "My Note Title" --content "This is the content of my note."
```

### List All Notes

To list all note titles:

```bash
note list
```

### Show a Note

To show a note by its index:

```bash
note show <index>
```

Replace <index> with the note number you want to view.

### Edit a Note

To edit an existing note:

```bash
note edit <index> --title "New Title" --content "Updated content."
```

### Delete a Note

To delete a note by its index:

```bash
note delete <index>
```

### Clear All Notes

To delete all notes:

```bash
note clear
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create your feature branch: git checkout -b feature/YourFeature.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature/YourFeature.
5. Open a pull request.

## Author

Abul Hossain
[GitHub](https://github.com/abul2285)
