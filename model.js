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
/**
 * SYNG ALREADY EXIT DATA. 
 * It work like it delete the exist data on ES then redindex.
 * So it can help you reindex all data. But if your data is big then it may be a problem.
 * YOU  can delete this block.
 * 
 */
const stream = Post.synchronize()
let count = 0;
stream.on('data', function(err, doc){
  if(err) throw err;
  console.log(doc);
  
  count++;
});
stream.on('close', function(){
  console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
  console.log(err);
});
// END SYNC ALREADY EXIST DATA.
module.exports = Post;