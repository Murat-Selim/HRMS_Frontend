import React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";

export default function Footer() {
  return (
    <div className="footer">
      <Segment textAlign="center" vertical inverted color="black">
       <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment textAlign="center" vertical inverted color="black">
              <p><a style={{color: "white"}} href="/#">Hakkımızda</a></p>
              <p><a style={{color: "white"}} href="/#">İletişim</a></p>
              <p><a style={{color: "white"}} href="/#">Gizlilik Politikası</a></p>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment textAlign="center" vertical inverted color="black">
              <Icon name="envelope outline" />
              murat@gmail.com &nbsp;&nbsp;&nbsp;
              <Icon name="phone" />
              0555 333 11 11 &nbsp;&nbsp;&nbsp;
              <Icon name="map marker alternate" />
              İstanbul/Türkiye &nbsp;&nbsp;&nbsp;
              <br />
              <br />
              ©Copyright 2021 HRMS
            </Segment>
          </Grid.Column>
        </Grid.Row>
       </Grid>
      </Segment>
    </div>
  );
}
