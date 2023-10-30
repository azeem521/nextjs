import React, { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
    console.log(props);
  return (
    <section className={classes.detail}>
      <img src={props.meet.image} alt="Image of meetup" />
      <h1>{props.meet.title}</h1>
      <address>{props.meet.address}</address>
      <p>{props.meet.description}</p>
    </section>
  );
};



export default MeetupDetail;
