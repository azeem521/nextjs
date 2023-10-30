import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_LIST = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2003_Mazda_6_%28GG%29_Classic_hatchback_01.jpg/1920px-2003_Mazda_6_%28GG%29_Classic_hatchback_01.jpg",
    address: "some adress dummy first",
    description: "A dummy description",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2003_Mazda_6_%28GG%29_Classic_hatchback_01.jpg/1920px-2003_Mazda_6_%28GG%29_Classic_hatchback_01.jpg",
    address: "some adress dummy Second",
    description: "A dummy description second",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export async function getServerSideProps() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/nextjs");
  const db = client.db();
  const collection = db.collection("meetup");
  const data =await collection.find().toArray();
  client.close();
  // console.log(data);

  // const response = await fetch('/api/meetups');
  // const data = await response.json();
  console.log(data);
  return {
    props: {
      meetups: data.map((item) => ({
        title: item.title,
        address: item.address,
        image: item.image,
        id: item._id.toString(),
      })),
      revalidate:1,
    },
  };
}

// export async function getStaticProps(){
//   return {
//     props : {
//       meetups : DUMMY_LIST
//     },
//     revalidate:1
//   }
// }

export default HomePage;
