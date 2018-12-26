const mongoose = require('mongoose');
const app = require('./app');

const { PORT } = process.env;

mongoose.Promise = global.Promise;

(async () => {
  try {
    await mongoose.connect(process.env.MLAB, { useNewUrlParser: true });
    app.listen(PORT, () => console.log(`El servidor ha empezado en http://localhost:${PORT}`));
  } catch (error) {
    console.log(error.errmsg)
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  }
})();
