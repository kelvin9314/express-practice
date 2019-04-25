const mongoose = require('mongoose');

const server = 'mp-library-cms-ag6vw.gcp.mongodb.net';
const database = 'test?retryWrites=true';
const user= 'microProgram';
const passsword= '1qaz2wsx';

mongoose.connect(`mongodb+srv://${user}:${passsword}@${server}/${database}`);

let bookSchema = new mongoose.Schema({
    bookID: {
       type: String,
       require: true,
       unique: true
    },
    isbn:{
       type: String,
       require: true,
       unique: true
    } ,
    totalQuantity: {
       type: int,
       require: true,
       unique: true
    },
    availableQuantity: {
       type: int,
       require: true,
       unique: true
    },
    title: {
       type: String,
       require: true,
       unique: true
    },
    author: {
       type: String,
       require: true,
       unique: true
    },
    yearOfPublication: {
       type: String,
       require: true,
       unique: true
    },
    status: {
       type: String,
       require: true,
    }, // Free , Occupied or Disable
    category: {
       type: String,
       require: true,
       unique: true
    }, // UCD, DEV, MNG , ENT, COD, MAG
    currentBorrowerId:  String, //FK && this data only visible by Admin
    donorID: String,  // FK
    remind: String
});

module.exports = mongoose.model('book',bookSchema);