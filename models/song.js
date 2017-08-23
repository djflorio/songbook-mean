var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
    title: {type: String, required: true, max: 250},
    artist: {type: String, required: true, max: 150},
    keywords: [String],
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    sections: [{ lines: [{ chords: String, words: String }] }]
});

const Song = module.exports = mongoose.model('Song', SongSchema);

module.exports.getAllSongs = function(callback) {
    Song.find(callback);
}

module.exports.getSongById = function(id, callback) {
    Song.findById(id, callback);
}

module.exports.getSongsByUserId = function(id, callback) {
    Song.find({user: id}, callback);
}

module.exports.updateSongById = function(id, updatedSong, callback) {
    Song.findByIdAndUpdate(id, updatedSong, callback);
}

module.exports.createSong = function(newSong, callback) {
    newSong.save(callback);
}

module.exports.deleteSongById = function(id, callback) {
    Song.findByIdAndRemove(id, callback);
}