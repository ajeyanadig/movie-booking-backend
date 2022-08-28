const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const PORT=8000;



const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const corsOptions={
  origin:"http://localhost:3000"
}
app.use(cors(corsOptions));

const db= require('./models');
db.mongoose.connect(db.url,{
      useNewUrlParser:true,
      useUnifiedTopology:true
}).then(()=>{
  console.log('Connected to Database')
}).catch((err)=>{
  console.log('Cant connect to Database and error : '+err)
  process.exit();
});

let insertRandomUser = () =>{
  const User= db.users;
  let newUser= new User(   {
    "userid": 3,
    "email":"p@q.com", 
    "first_name": "user2", 
    "last_name": "user2", 
    "username":"user", 
    "contact":"9898989898", 
    "password":"user@123",
    "role":"admin", 
    "isLoggedIn": false, 
    "uuid":"", 
    "accesstoken":"",
    "coupens":[
      {
          "id":103,"discountValue": 103 
      },
      {
          "id":104,"discountValue": 104 
      }
    ],
    "bookingRequests":[
      {
          "reference_number":29783,
          "coupon_code":101,"show_id": 1003,"tickets":[1,3]
      },
    {
          "reference_number":19009,
          "coupon_code":201,"show_id": 1002,"tickets":[1]
      }
    ]
  })
  newUser.save().then((data)=>{
    console.log('User inserted successfully');
  }).catch(err=>{
    console.log('couldnt save new User')
  })
}
function insertRandomMovie(){
  const MovieModel= db.movies;
  let newMovie= new MovieModel({
    "movieid":1,
    "title":"The Lodgers",
    "published":true,
    "released": true,
    "poster_url":"https://images-na.ssl-images-amazon.com/images/M/MV5BM2FhM2E1MTktMDYwZi00ODA1LWI0YTYtN2NjZjM3ODFjYmU5XkEyXkFqcGdeQXVyMjY1ODQ3NTA@._V1_SY500_CR0,0,337,500_AL_.jpg",
    "release_date":"1/1/2020",
    "publish_date": "2/2/2020",
    "artists":[
       {"artistid": 1, "first_name": "amitabh", "last_name": "bachchan", "wiki_url":"https://en.wikipedia.org/wiki/Amitabh_Bachchan", "profile_url":"https://wikibio.in/wp-content/uploads/2017/12/Amitabh-Bachchan.jpg", "movies":[]},
       {"artistid": 2, "first_name": "nasiruddin", "last_name": "shah", "wiki_url":"https://en.wikipedia.org/wiki/Naseeruddin_Shah", "profile_url":"https://wikibio.in/wp-content/uploads/2019/06/Naseeruddin-Shah.jpg", "movies":[]},
       {"artistid": 3, "first_name": "rajkumar", "last_name": "rao", "wiki_url":"https://en.wikipedia.org/wiki/Rajkummar_Rao", "profile_url":"https://i1.wp.com/wikifamouspeople.com/wp-content/uploads/2018/09/rajkumar-rao.jpg?fit=768%2C432&ssl=1", "movies":[]},
       {"artistid": 4, "first_name": "shabana", "last_name": "azmi", "wiki_url":"https://en.wikipedia.org/wiki/Shabana_Azmi", "profile_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Shabana_Azmi_SFU_honorary_degree_%28cropped%29.jpg/1200px-Shabana_Azmi_SFU_honorary_degree_%28cropped%29.jpg", "movies":[]},
       {"artistid": 5, "first_name": "pankaj", "last_name": "kapoor", "wiki_url":"https://en.wikipedia.org/wiki/Pankaj_Kapur", "profile_url":"https://upload.wikimedia.org/wikipedia/commons/a/ac/Pankaj_Kapur.jpg", "movies":[]}
    ],
    "genres":["comedy","drama","action","romance","horror"],
    "duration": 200,
    "critic_rating": 3,
    "trailer_url":"https://www.youtube.com/watch?v=ltIcW2xMuzs",
    "wiki_url":"https://en.wikipedia.org/wiki/Main_Page",
    "story_line":"1920, rural Ireland. Anglo Irish twins Rachel and Edward share a strange existence in their crumbling family estate. Each night, the property becomes the domain of a sinister presence (The Lodgers) which enforces three rules upon the twins: they must be in bed by midnight; they may not permit an outsider past the threshold; if one attempts to escape, the life of the other is placed in jeopardy. When troubled war veteran Sean returns to the nearby village, he is immediately drawn to the mysterious Rachel, who in turn begins to break the rules set out by The Lodgers. The consequences pull Rachel into a deadly confrontation with her brother - and with the curse that haunts them.",
    "shows": [
       {
          "id": 1001,
          "theatre":{"name": "CityPride", "city":"Pune"},
          "language":"English",
          "show_timing":"1/1/2021",
          "available_seats":"5",
          "unit_price": 200
       },
       {
          "id": 1002,
          "theatre":{"name": "CityPride", "city":"Mumbai"},
          "language":"Hindi",
          "show_timing":"2/1/2021",
          "available_seats":"20",
          "unit_price": 100
       },
       {
          "id": 1003,
          "theatre":{"name": "ESqaure", "city":"Pune"},
          "language":"Marathi",
          "show_timing":"3/3/2021",
          "available_seats":"20",
          "unit_price": 300
       }
    ]
  })
  newMovie.save().then((data)=>{
    console.log('movie inserted successfully')
  }).catch((e)=>{console.log('movie insertion failure')})
}


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});


require('./routes/movie.routes')(app)
require('./routes/user.routes')(app)
require('./routes/artist.routes')(app)
require('./routes/genre.routes')(app)

// app.get('/',(req,res)=>{res.send('server up and running')})




app.listen(PORT,()=>{
  console.log('Server listening on port : '+PORT)
})