module.exports = (mongoose) => {
  const User = mongoose.model("users",mongoose.Schema(
    {
      userid:{type:Number},
      email:{type:String, required:true},
      first_name:String,
      last_name:String,
      username:String,
      contact:String,
      password:String,
      role:{
        type:String,
        enum:['user','admin'],
        default:'user'
      },
      isLoggedIn:{
        type:Boolean,
        default:false
      },
      uuid:String,
      accesstoken:{
        type:String,
        default:""
      },
      coupens:[{
        id:Number,
        discountValue:Number
      }],
      bookingRequests:[{
        reference_number:Number,
        coupon_code:Number,
        show_id:Number,
        tickets:[{type:Number}]

      }],
    })
    );
  return User;
  };