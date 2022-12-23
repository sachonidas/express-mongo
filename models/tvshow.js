exports = module.exports = function(app, mongoose) {

    const tvshowSchema = new mongoose.Schema({
        title: {type: String},
        year: {type: Number},
        country: {type: String},
        poster: {type: String},
        seasons: {type: Number},
        genre: {
            type: String,
            enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
        },
        summary: {type: String}
    });

    mongoose.model('TVShow', tvshowSchema);

};
