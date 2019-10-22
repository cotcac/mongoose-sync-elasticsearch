const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');

mongoose.connect('mongodb://localhost:27017/mongosync',{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false });
 
var PostSchema = new mongoose.Schema({
    title: String
  , content: String
});

PostSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

var Post = mongoose.model('post', PostSchema);
module.exports = Post;