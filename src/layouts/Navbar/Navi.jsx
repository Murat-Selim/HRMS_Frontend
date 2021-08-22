import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Dropdown, Header, Icon, Menu } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import FavoriteSummary from "../FavoriteSummary";
import { useSelector } from "react-redux";

export default function Navi() {

  const favorites = useSelector(state => state.favorite.favorites);

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
      <Menu size="large" fixed="top" fluid inverted>
        <Container >
          <Menu.Item>
             <Header as="h3" inverted>
                  <Icon name="braille" />
                  <Header.Content
                      as={NavLink}
                      to="/"
                      style={{color: "white"}}
                      >
                      HRMS
                  </Header.Content>
              </Header>
          </Menu.Item>

          <Menu.Item style={{color: "white"}} as={NavLink} to="/jobAdvertList" name="Ana Sayfa" icon="home" />
          
          <Menu.Item>
            <Dropdown style={{color: "white"}} item text="Profil">
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/candidateCv/29">
                  Cv
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/favorites/29">
                  Favoriler
                </Dropdown.Item>                
                <Dropdown.Item as={NavLink} to="/admin">
                  Admin
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/employerList">
                  Employer
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/candidateList">
                  Candidate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Menu color="green" position="right">
            {favorites.length>0&&<FavoriteSummary/>}
            <Menu.Item>
              <Button color="violet" as={NavLink} to="/jobAdvertAdd" content="İş İlanı Yayınla" icon="add"/>
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
