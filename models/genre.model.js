module.exports = (mongoose) => {
  const Genre = mongoose.model("genres",mongoose.Schema(
    {
      genreId:Number,
      genre:String
    })
    );
  return Genre;
  };