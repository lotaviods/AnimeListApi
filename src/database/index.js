const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://application:qkPYbb26B7iSicm@cluster0.eb9it.mongodb.net/animesdb?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
});


module.exports = mongoose