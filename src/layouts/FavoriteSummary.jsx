import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'

export default function FavoriteSummary() {
   
    const favorites = useSelector(state => state.favorite.favorites)

    return (
        <div>
          <Menu.Item>
            <Dropdown pointing="top-left" item fluid text="Favoriler">
              <Dropdown.Menu>
                {
                  favorites.map((favorite)=>(
                    <Dropdown.Item key={favorite.jobAdvert?.id}>
                      {favorite.jobAdvert?.jobPosition?.jobTitle}
                    </Dropdown.Item>

                  ))
                }
                <Dropdown.Divider/>
                <Dropdown.Item as={NavLink} to="/favorites">Favorilere git</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Menu.Item>
        </div>
    )
}
