import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import FavoriteService from "../services/favoriteService";


export default function FavoriteJobAdvertList() {

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    let favoriteService = new FavoriteService();
    favoriteService.getAll().then((result) => setFavorites(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group>
        {favorites.map((favorite) => (
          <Card fluid color="blue" key={favorite.id}>
            <Card.Content>
              <Card.Header
                style={{
                  fontWeight: "bold",
                  height: "30px",
                  marginTop: "7px",
                  color: "purple",
                }}
                content={favorite.jobAdvert.employerCompanyName}
              />
              <hr />
              <div>
                <Card.Description>
                  <h3>
                    <b>Pozisyon : </b>
                    <strong>{favorite.jobAdvert.jobTitle}</strong>
                  </h3>
                </Card.Description>
                <Card.Description>
                  <div style={{ margin: "10px" }}>
                    <b> Açık Pozisyon : </b> {favorite.jobAdvert.numberOfOpenPosition}
                  </div>
                </Card.Description>
                <Card.Description>
                  <div style={{ margin: "10px" }}>
                    <b> Oluşturma Tarihi : </b> {favorite.jobAdvert.createdDate}
                  </div>
                </Card.Description>
                <Card.Description>
                  <b>Kapanış Tarihi : </b> {favorite.jobAdvert.applicationDeadline}
                </Card.Description>
              </div>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  as={NavLink}
                  to={`/favorites/${favorite.id}`}
                  basic
                  color="green"
                >
                  Detaylar
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
