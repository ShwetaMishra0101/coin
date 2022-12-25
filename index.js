const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {MongoClient} = require ("mongodb");
const app = express();
app.use(cors());
app.use(express.json());
const client = new MongoClient("mongodb+srv://Shweta:shweta123@cluster0.cui9tcw.mongodb.net/coinetab?retryWrites=true&w=majority")
mongoose.set("strictQuery", false);

const Schema = new mongoose.Schema({
  gender:String,
  name:{
    first:String,
    last:String,
    title:String
  },
  picture:{
    large:String
  },
  email:String,
  location:{
    city:String,
    country:String,
    state:String,
  }
});

const Data = mongoose.model("Details", Schema);

app.get("/showDetails",async(req,res)=>{
    const data =await Data.find()
    res.send(data)
})

app.delete("/delete",async(req,res)=>{
  const data = await client.db("persons");
  const abc = data.collection("details")
  console.log(abc)
  abc.drop()
  res.send("deleted")
})

app.post("/sendData", async (req, res) => {
  // console.log(req.body);
  const {gender,name,picture,email,location} = req.body;
  const post = await Data.create({gender,name,picture,email,location});
  console.log("Data", post);
  await post.save();
  res.send("successful");
});

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Shweta:shweta123@cluster0.cui9tcw.mongodb.net/coinetab?retryWrites=true&w=majority"
    );
    console.log("connected to mongodb");
  } catch (err) {
    throw err;
  }
};

app.listen(3001, () => {
  connect();
  console.log("listening on port  3001");
});
