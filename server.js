const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const simpleGit = require('simple-git');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('data')); // Serve the data folder

// Folder to save user details
const DATA_FOLDER = './data';

// Ensure the `data` folder exists
if (!fs.existsSync(DATA_FOLDER)) {
  fs.mkdirSync(DATA_FOLDER);
}

// Endpoint to save user data
app.post('/saveUser', (req, res) => {
  const { name, dateOfBirth, phoneNumber, photo } = req.body;

  if (!name || !dateOfBirth || !phoneNumber || !photo) {
    return res.status(400).send('All fields are required.');
  }

  const fileName = `${name.replace(/\s+/g, '_')}.json`; // Use name for the file
  const filePath = `${DATA_FOLDER}/${fileName}`;

  const userData = {
    name,
    dateOfBirth,
    phoneNumber,
    photo,
  };

  // Write the data to a JSON file
  fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error('Error saving user data:', err);
      return res.status(500).send('Error saving user data.');
    }

    // Commit and push the changes to GitHub
    const git = simpleGit();
    git.add('./data')
      .commit(`Added ${fileName}`)
      .push()
      .then(() => res.send('User data saved and pushed to GitHub.'))
      .catch((gitErr) => {
        console.error('Error pushing to GitHub:', gitErr);
        res.status(500).send('Error pushing to GitHub.');
      });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});