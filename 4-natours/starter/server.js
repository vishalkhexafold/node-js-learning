// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose'); // Add this line to require mongoose

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
// Connect to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {}).then(() => {
  console.log('Connected to database');
});
console.log(app.get('env'));
// START SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
