import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'

export default function FavoriteSummary() {
   
    const {favorites} = useSelector(state => state.favorite)
    
    return (
        <div>
            <Dropdown item text="Favorileriniz">
              <Dropdown.Menu>
                {
                  favorites.map((favorite)=>(
                    <Dropdown.Item key={favorite.id}>
                      {favorite.jobAdvert.jobTitle}
                    </Dropdown.Item>

                  ))
                }
                
                <Dropdown.Divider/>
                <Dropdown.Item as={NavLink} to="/favorites">Favorilere git</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
