const fs = require('fs');

// Path to your data file
const dataFilePath = '../utils/data.js';

// Function to update the data in the file
function updateData(data) {
  fs.writeFileSync(dataFilePath, `module.exports = ${JSON.stringify(data, null, 2)};`, 'utf-8');
}

module.exports = {
  updateData,
};