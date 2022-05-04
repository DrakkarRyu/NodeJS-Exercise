const { app } = require('./app');

//models
const { Repair } = require('./models/repair.model');
const { User } = require('./models/user.model');

//utils
const { db } = require('./database/database');

//Authentication process
db.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch(err => console.log(err));

//Estableshing relations Users--->Repairs
User.hasMany(Repair);
Repair.belongsTo(User);

//Sync
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//Port conection
const PORT = process.env.PORT || 4000;

//conection message
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
