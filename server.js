const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Function to save contact data
const saveContactData = (contactData) => {
  const dataFilePath = path.join(__dirname, 'contacts.json'); // Path to JSON file
  let existingData = [];
  if (fs.existsSync(dataFilePath)) {
    const rawData = fs.readFileSync(dataFilePath);
    existingData = JSON.parse(rawData);
  }
  existingData.push(contactData);

  // Write updated data back to the JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
};

// Handle form submission
app.post('/submit-form', (req, res) => {
  const contactData = req.body;

  // Save contact data to contacts.json
  try {
    saveContactData(contactData);
    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).send('An error occurred while submitting the form.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
