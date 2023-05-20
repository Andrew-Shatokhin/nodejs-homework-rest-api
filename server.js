const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Andrew:SDBrYQpePbTFjK1R@cluster0.hycmx6x.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST).then(() => {
  app.listen(3000, () => {
    console.log("Database connection successful");
  });
  
}).catch(error => {
  console.log(error.message);
  process.exit(1);
});

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// Andrew
// SDBrYQpePbTFjK1R