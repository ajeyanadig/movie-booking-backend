module.exports = (mongoose) => {
  const Artist = mongoose.model("artists",mongoose.Schema(
    {
      artistid:Number,
      first_name:String,
      last_name:String,
      wiki_url:String,
      profile_url:String,
      movies:[{type:String}]
    })
    );
  return Artist;
  };