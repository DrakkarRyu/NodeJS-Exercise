const express = require('express');

const { db } = require('./database/database');

const { usersRouter } = require('./routes/users.routes');
const { repairRouter } = require('./routes/repairs.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairRouter);

db.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(err => console.log(err));

db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

const PORT = 9666;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
