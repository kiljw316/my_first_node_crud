const mongoose = require('mongoose');

const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const postsSchema = new Schema({
    postNum: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    author: {
        type: String,
        required: true,
        maxlength: 10,
    },
    title: {
        type: String,
        required: true,
        maxlength: 20,
    },
    description: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

postsSchema.plugin(autoIncrement.plugin, {
    model: 'Posts',
    field: 'postNum',
    startAt: 1,
    increment: 1
})

module.exports = mongoose.model('Posts', postsSchema);
