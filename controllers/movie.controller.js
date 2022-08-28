const e = require('express');
const db=require('../models');
const Movie=db.movies;

exports.findAllMovies=(req,res)=>{
  if(Object.keys(req.query).length===0)
  {console.log('Empty Query Obj')}
  else{
    handleFindMoviesWithQeuryParams(req,res);
    return;
  }
  
  Movie.find({}).then((data)=>{res.send(data)})
  .catch(err=>{res.status(500).send('Error retrieving data')})
  
}

exports.findOne=(req,res)=>{
  let movieID= req.params.movieId;
  Movie.find({movieid:movieID}).then((data)=>{
    res.send(data)
  })
  .catch(err=>{res.status(500).send('Error retrieving shows')})
}

exports.findShows=(req,res)=>{
  let movieID= req.params.movieId;
  Movie.findOne({movieid:movieID}).then((data)=>{
    res.send(data.shows)
  })
  .catch(err=>{res.status(500).send('Error retrieving shows')})
}

let handleFindMoviesWithQeuryParams=(req,res)=>{
  let queryObj= req.query;

  if(Object.keys(queryObj).length===1&&Object.keys(queryObj)[0]=='status'){

    if(queryObj.status==='PUBLISHED'){

      Movie.find({published:true})
      .then((data)=>{
        res.send({movies:data})
        return;
      })
      .catch(err=>{res.status(500).send('Error retrieving data')})
      // Movie.find({
      //   genres:{"$all":["drama","romance"]}
      // })
      // .then((data)=>{res.send({movies:data})})
      // .catch(err=>{res.status(500).send('Error retrieving data')})


    }
    else if(queryObj.status==='RELEASED'){
      Movie.find({released:true})
      .then((data)=>{
        res.send({movies:data});
        return;
      })
      .catch(err=>{res.status(500).send('Error retrieving data')})
    } 
    else{
      console.log('wrong status query param value')
    }
  }

  else if(Object.keys(queryObj).length>1&&Object.keys(queryObj)[0]=='status'){
    //queryobj :: object with query params and values
    let filters={}; //new Obj with correct filters Key Value Pairs
    console.log(queryObj);


    if(queryObj.status==='RELEASED')
      filters.released=true;
    
    let objKeys= Object.keys(queryObj); //arr, with biggest query string :: 
    // status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}
    for(let i =1;i<objKeys.length;i++){
      filters[objKeys[i]]=queryObj[objKeys[i]];
    }
    
    if(filters.genres){
      filters.genres=filters.genres.split(",");
      let x={"$all":filters.genres};
      filters.genres=x;
    }

    if(filters.artists){
      let arrFullNames=filters.artists.split(","); //get all names
      let arrFirstNames= arrFullNames.map(ele=>{
                              let splitElement= ele.split(' ');
                              let firstName=splitElement[0];
                              return firstName;
                        });

      //now I have all first names in arrFirstNames
      //filters.artists=arrFirstNames;
      
      let nameBuilder= arrFirstNames.map(ele=>{
        return {"artists.first_name":ele}
      })
      let myFilter={"$and":nameBuilder}; // this independently works
      delete filters.artists; //not to be passed in actual db query
      Movie.find(filters).find(myFilter)
      .then((data)=>{
        console.log('Gonna send movie with artist filter');
        res.send({movies:data});
        return;
      })
      .catch(err=>{
        console.log("Couldn't fetch data at find movie with artist")
        
      })


    }
    if(queryObj.artists==undefined){
        Movie.find(filters)
        .then((data)=>{
          console.log(data);
          res.send({movies:data});
        })  
        .catch(err=>{console.log(err)})
      }
    console.log(filters);

    

  }
  
}
