const mongoose= require("mongoose");

const blogSchema = new mongoose.Schema({
    user_id: String,
    title: String,
    content: String,
    postImage: String,
    likes: Number
});
const blog = mongoose.model('blog', blogSchema);

module.exports= blog;