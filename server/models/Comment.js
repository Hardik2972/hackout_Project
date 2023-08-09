const mongoose= require("mongoose");

const commentSchema = new mongoose.Schema({
    post_id: String,
    user_id: String,
    comment: String,
});
const comment = mongoose.model('comment', commentSchema);

module.exports= comment;