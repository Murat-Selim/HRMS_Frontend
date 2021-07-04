import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import FavoriteSummary from "../FavoriteSummary";
import { useSelector } from "react-redux";

export default function Navi() {

  const favorites = useSelector(state => state.favorite)

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
          <Menu.Item icon="braille" name="HRMS" />

          <Menu.Item as={NavLink} to="/jobAdvertList" name="Ana Sayfa" icon="home" />
          <Menu.Item name="Cvler" as={NavLink} to="/cvList" />

          
          
          <Menu.Menu position="right">
          {favorites.length>0&&<FavoriteSummary/>}
          <Menu.Item>
            <Button basic inverted as={NavLink} to="/jobAdvertAdd" content="İş ilani Yayınla" icon="add"/>
          </Menu.Item>
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
