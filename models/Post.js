const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    nomeC: { type: String, required: true },
    emailC: { type: String, required: true },
    foneC: { type: String, required: true },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
