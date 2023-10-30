import { MongoClient } from "mongodb"


const handler = async (req,res)=>{
    try {
    //  if(req.method === 'GET'){
        const client = await MongoClient.connect('mongodb:127.0.0.1://27017/nextjs');
        const db = client.db();
        const collection = db.collection('meetup');
        const data = collection.find();
        client.close();
       return res.status(200).json({success:true,data});
    //  }
    //  res.status(404).json({success:false});

    } catch (error) {
        res.status(404).json({success:false,error});
    }
}

export default handler;