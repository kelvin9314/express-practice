const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const server = 'mp-library-cms-ag6vw.gcp.mongodb.net';
const database = 'test?retryWrites=true';
const user= 'microProgram';
const passsword= '1qaz2wsx';

const url = `mongodb+srv://${user}:${passsword}@${server}/${database}`;
const mongoOptions = { useNewUrlParser: true };

const state = {
  db : null
};

const conncet = (callback) =>{
  if(state.db){
    callback();
  }
  else{
    MongoClient.connect(url,mongoOptions,(err,client)=>{
      if(err)
        callback(err);
      else{
        state.db = client.db(database)
        callback();
      }
    });
  }
}

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}

const getDB = () => {
  return state.db;
}

module.exports = {getDB,conncet,getPrimaryKey}