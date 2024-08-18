# Note Taker
  
## Description
 This is an application called Note Taker that can to used to write and saved notes. It employs an Express.js back end that saves and retrieves notes from a JSON file.

## Table of contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  
## Installation
No installation is required as this is an deployed application via render.com.  
  
## Usage
The application can be accessed at: https://expressjs-notetaker.onrender.com/

Use of the application is very simple. Per the image below, there are a list of notes on the left hand side bar. You can select any of the notes to view the full note text. After selecting a note, there is also an option of creating a New Note - via a button on the upper right hand side of page. Clicking on the button will give you an empty note - to which you can enter a title and some elaborating text. Provided that both a title and text are supplied, a red colored button should appear alongside the New Note button to allow you to save your note. Once the Save button is clicked, the new note will appear on the left side bar below all the other notes. Alongside each note is also a symbol of a red rubbish bin. You can delete your note by clickon this, whereby it will be removed from the note list (and subsequently from the JSON file hosting the note data).

![Screenshot 2024-08-18 at 12 28 29 pm](https://github.com/user-attachments/assets/bfbec1c9-a975-4ef7-8c05-eb52cac6c7d9)


As the application was developed using express.js, employing API end-points, the application will accept GET, POST and DELETE requests via API development tools which can supply the appropriately formed requests like Insomnia, Postman, etc.
- A GET request for https://expressjs-notetaker.onrender.com/api/notes  will suppply a JSON list of notes
- A PUT request for https://expressjs-notetaker.onrender.com/api/notes with along with JSON formatted body like { "title": "test note", "text": "test text" } would create a new note
- A DELETE request for https://expressjs-notetaker.onrender.com/<note_id> will delete the note with a corresponding ID.

## Contributing
All backend express.js code either written or refactored by Warren Shan. Front end starter code supplied by GIT user: Xandromus. Custom Middleware and helpers code taken directly from the Express Mini project (activity 28) solution.
  
## License
None
