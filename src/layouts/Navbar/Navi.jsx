import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {Container, Menu} from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const history = useHistory();

  function handleSignOut() {
    setIsAuthenticated(false);
    history.push("/");
  }

  function handleSignIn() {
    setIsAuthenticated(true);
  }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item name="HRMS" />
          
          <Menu.Item as={NavLink} to="/jobPositionList" name="Ana Sayfa" icon="home"/>
          <Menu.Item as={NavLink} to="/jobAdvertList" name="İş ilanlari" />
          <Menu.Item name="Cvler" />

          <Menu.Menu position="right">
            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
