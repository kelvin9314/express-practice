const mongoose = require('mongoose');

const server = 'mp-library-cms-ag6vw.gcp.mongodb.net';
const database = 'test?retryWrites=true';
const user= 'microProgram';
const passsword= '1qaz2wsx';

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${user}:${passsword}@${server}/${database}`,{ useNewUrlParser: true });


let booksSchema = new mongoose.Schema({
   //  bookID: {
   //     type: String,
   //    //  require: true,
   //    //  unique: true
   //  },
    isbn:{
       type: String,
       require: true,
       unique: true,
       trim: true 
    } ,
    totalQuantity: {
       type: Number,
       require: true,
       default: 1
    },
    availableQuantity: {
       type: Number,
       require: true,
       default: 1
    },
    title: {
       type: String,
       require: true,
       unique: true,
       trim: true 
    },
    author: {
       type: String,
       unique: true,
       trim: true 
    },
    yearOfPublication: {
       type: String,
       unique: true,
       trim: true ,
       minlength: 4,
       maxlength: 4
    },
    status: {
       type: String,
       trim: true 
    }, // Free , Occupied or Disable
    category: {
       type: String,
       trim: true 
    }, // UCD, DEV, MNG , ENT, COD, MAG
    currentBorrowerId:  String, //FK && this data only visible by Admin
    donorID: String,  // FK
    remind: String
});



module.exports = mongoose.model('books',booksSchema);