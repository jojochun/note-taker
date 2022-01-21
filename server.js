const express = require('express');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3001;


const app = express();
// parse incoming (POST)data (into key/value pairs that is accessed in req.body object)
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON (POST)data
app.use(express.json());

app.use(express.static('public'));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
