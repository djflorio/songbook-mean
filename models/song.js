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


/*
D                            G          A       D       G    A
Early in the morning too hungover to go back to sleep
D                         G              A    D       G    A
Every sound is amplified, every light so dizzying
G                         A
Listen for a while to the neighbors having sex
G                             A
Wishing I could lay my aching head upon your breast
        G      G/F#   A
Can't I dream another dream?
        G                                A
Can't I close my eyes and wander back to sleep?

        D            G    Bm
But I'm daydreaming about you
A                   G
   I know that it's wrong
         D            G    Bm
That I'm daydreaming about you
    A                                  G  G/F#  A  D
And I've been daydreaming for so long
*/

/*
"D|||||    G   |||A||D|   G|   A"
"Early|in|the|morning|too|hungover|to|go|back|to|sleep||"
"D||||G|||A    D|   G|   A"
*/