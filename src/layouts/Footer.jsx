import React from "react";
import { Icon, Segment } from "semantic-ui-react";

export default function Footer() {
  return (
    <div className="footer">
      <Segment textAlign="center" vertical inverted color="black">
        <Icon name="envelope outline" />
        murat@gmail.com &nbsp;&nbsp;&nbsp;
        <Icon name="phone" />
        0555 333 11 11 &nbsp;&nbsp;&nbsp;
        <Icon name="map marker alternate" />
        Istanbul/Türkiye &nbsp;&nbsp;&nbsp;
        <br></br>
        <br></br>
        ©Copyright 2021
      </Segment>
    </div>
  );
}
