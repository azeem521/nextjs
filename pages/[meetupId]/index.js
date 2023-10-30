import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId} from "mongodb";

const MeetupDetails = (props) => {
  console.log(props, "<--------------------Inside[]");

  return <MeetupDetail meet={props.meetupData} />;
};

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/nextjs");
  const db = client.db();
  const collection = db.collection("meetup");
  const data = await collection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths:data.map(itm=>({
        params:{
            meetupId:itm._id.toString()
        }
    }))
  
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const objectId = new ObjectId(meetupId)
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/nextjs");
  const db = client.db();
  const collection = db.collection("meetup");
  const data = await collection.findOne({_id:objectId});
  console.log('data');
  return {
    props: {
      meetupData:{
          id:data._id.toString(),
        title:data.title,
        image:data.image,
        address:data.address,
        description:data.description
      }
    },
  };
}

export default MeetupDetails;
