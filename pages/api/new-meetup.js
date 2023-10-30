import { MongoClient } from "mongodb";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const client = await MongoClient.connect(
        "mongodb://127.0.0.1:27017/nextjs"
      );
      const db = client.db();
      const collection =  db.collection("meetup");
      const result = await collection.insertOne(req.body);
      client.close();
      res.status(200).json({ sucess: true,result });
    }
    client.close();
    res.status(200).json({ sucess: false });
  } catch (error) {
    console.log("error");
    res.status(200).json({ sucess: false, error });
  }
}
export default handler;
