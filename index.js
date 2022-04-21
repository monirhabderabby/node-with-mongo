const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//use midelware 
app.use(cors());
app.use(express.json())

//user: monirdb1
//password: VY89usma7jvAjYch



const uri = "mongodb+srv://monirdb1:VY89usma7jvAjYch@cluster0.o0lwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const userCollection = client.db("foodExpress").collection("users");
        
        //Get user from db
        app.get('/user', async (req, res) => {
            const query = {};
            const cursior = userCollection.find(query);
            const users = await cursior.toArray();
            res.send(users)
        })

        //Post user in db
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('Information is:', newUser);
            const result = await userCollection.insertOne(newUser)
            res.send(result)
        })

        //Delete user from db
        app.delete('/user/:id', async(req, res)=> {
            const id = req.params;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir)


app.get('/' , (req, res) => {
    res.send('My Node server is Running')
})


app.listen(port, ()=>{
    console.log('crud server is running');
})