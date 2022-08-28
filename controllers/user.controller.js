const db=require('../models');
const b2a=require('b2a');
const TokenGenerator=require('uuid-token-generator');
const {uuid}=require('uuidv4');
const tokgen= new TokenGenerator();
const User=db.users;


exports.findAllUsers=(req,res)=>{
  console.log("reaching user controller")
}

//ALL USER LOGIN/LOGOUT/SIGNUP CODE


exports.signUp=(req,res)=>{
  if(!req.body.email_address||!req.body.password){
    res.status(400).send("Email OR Password isn't provided sir/madame");
    return;
  }
  User.findOne({email:req.body.email},(err,user)=>{
    console.log(user);
    if(user===null){
      console.log('No existing user with same email :: valid signup :: mongoose\'s save function will now be executed');
      let newSignUpToken= tokgen.generate();
      console.log('NEW UUID IS : '+newSignUpToken)
      let user= new User({
        email:req.body.email_address,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        username:req.body.first_name+req.body.last_name,
        contact:req.body.mobile_number,
        password:req.body.password,
        role:"user",
        uuid:newSignUpToken
        
      });
      user.save()
        .then((data)=>{res.send(data)})
        .catch(e=>res.status(500).send('cant enter new user in signup '+e))
    }
    else{
      console.log('User already exists, invalid signup, go to login page');
      res.status(400).send('User already exists ');
      return;
    }
  })
}


exports.login=(req,res)=>{
  let b64string= req.headers.authorization.substring(6);
  let cleanString=b2a.atob(b64string);
  let [username,password]=cleanString.split(':');
  console.log('Username and Password we got :: '+username,password);
  //I can now verify and match with database. This is simple encryption, bcrypt was better;
  User.find({username:username,password:password}).then((data)=>{
    console.log('User data after match on login function :: '+data[0]);
    
    let uuid= data[0].uuid; // send this to DBase, reason in notes, meant to be saved
    let newToken= tokgen.generate();// send this to DBase, meant to be saved, accesstoken for every new session is now maintained
    //put isLoggenIn true in DBase for user AND 
    User.findOneAndUpdate({username:username,password:password},{accesstoken:newToken,isLoggedIn:true})
    .then((data)=>{
      console.log(`logged in user with username ${username} has inserted token and isLoggedIn set to true `);
    })
    .catch(e=>{
      console.log(`trouble inserting token and isLoggedIn value into database`);
    })
    let dataToSend={
      id:uuid,
      'access-token':newToken,
      bro:"DATA GO PLEASE"
    }
    console.log(dataToSend)
    res.send(dataToSend);
  }
  ).catch(err=>console.log(err));
}


exports.logout=(req,res)=>{
  //token should be removed
  console.log('Request body on logout :: '+req.body);
  User.findOneAndUpdate({uuid:req.body.uuid},{accesstoken:"",isLoggedIn:false},{new:true})
  .then(data=>{
    console.log('User with uuid : '+req.body.uuid+' has been logged out, and user data is \n'+data);
    res.send({message:"Logged Out successfully."});
  }).catch(err=>{
    console.log('Logout unsuccessfull, err msg :: \n'+err);
  })
  
}


//GET COUPON CODES

exports.getCouponCode=(req,res)=>{
  let accesstoken= req.headers.authorization.substring(7);
  console.log(accesstoken);
 
  console.log(req.query);
  let coupCode = req.query['code'];
  User.findOne({accesstoken:accesstoken,coupens:{"$elemMatch":{"id":coupCode}}}).then(data=>{
    if(data!==null){
      console.log('DAMN I GOT MY COUPON')
      let result= data.coupens.filter(ele=>{
        if(ele.id==coupCode)
          return ele.discountValue;
      })
      console.log(result[0].discountValue);
      res.send({discountValue:result[0].discountValue*0.1});
    }
  })
  // User.findOne({accesstoken:accesstoken}).then(user=>{
  //   if(user!==null){
  //     console.log('Well User is found');
  //     console.log(user)
  //   }
  // })
  // .catch(e=>console.log(e))


}

exports.bookShow=(req,res)=>{
  //IM GETTING IN REQ BODY
  // {
  //   customerUuid: 'J2hRKWnqPB1W4nJwGw3QxZ',
  //   bookingRequest: { coupon_code: '101', show_id: 1001, tickets: [ '3' ] }
  // }
  let custUUID= req.body.customerUuid;

  let reference_number=Math.trunc(Math.random()*100000);

  let objToAdd={
    reference_number:reference_number,
    ...req.body.bookingRequest,

  }
  
  User.findOneAndUpdate({uuid:custUUID},{$push:{bookingRequests:objToAdd}},{new:true})
  .then(data=>{
    console.log(data);
    res.send({reference_number:reference_number})
  })
  .catch(err=>{
    console.log(err)
  })
  

}