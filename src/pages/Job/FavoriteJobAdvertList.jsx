import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Pagination, Select } from "semantic-ui-react";
import FavoriteService from "../../services/favoriteService";
import moment from "moment";
import "moment/locale/tr";

export default function FavoriteJobAdvertList() {
  
  moment.locale("tr");

  const [totalPage, setTotalPage] = useState(1);

  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    let favoriteService = new FavoriteService();
    favoriteService.getByCandidateId(29, pageNo, pageSize).then((result) => {
      setFavorites(result.data.data.content)
      setTotalPage(result.data.data.totalPages)
    });
  }, [pageNo, pageSize]);

  const pageSizeOptions = [
    { key: "1", value: "10", text: "10" },
    { key: "2", value: "20", text: "20" },
    { key: "3", value: "50", text: "50" },
    { key: "4", value: "100", text: "100" },
  ];

  const handlePaginationChange = (pageNo) => {
    setPageNo(pageNo);
  }

  const handleSizeChange = (value) => {
    setPageSize(value)
  }

  return (
    <div>
      <Card fluid color="blue">
        <Card.Header content="FAVORİ İŞ İLANLARIM" style={{fontWeight:"bold", height:"30px", marginTop:"10px", color:"green"}}/>
      </Card>
      <br/>
      <Card.Group>
        {favorites.map((favorite) => (
          <Card fluid color="blue" key={favorite.jobAdvert.id}>
          <Card.Content>
            <Card.Header style={{textAlign: "left", fontWeight: "bold", height: "30px", marginTop: "10px", color: "purple"}}>
              {favorite.jobAdvert?.jobPosition.jobTitle}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>         
           <div style={{textAlign: "left", color: "black"}}>
              <Card.Description>
                <div style={{ marginTop: "10px" }}>
                  <strong style={{color: "green"}}>{favorite.jobAdvert?.employer.companyName}</strong>
                </div>
              </Card.Description>
              <Card.Description>
                <div style={{ marginTop: "10px"}}>
                  {favorite.jobAdvert?.city?.name}
                </div>
              </Card.Description>
              <Card.Description style={{marginTop: "10px"}}>
                  {favorite.jobAdvert?.workTime?.name} 
                <Card.Group style={{float: "right", marginTop: "0px"}}>
                    {moment(favorite.jobAdvert.createdDate)
                            .startOf("day")
                            .fromNow()}
                </Card.Group>
              </Card.Description>
            </div>
           </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button content="Başvur" basic color="red" />
            </div>
          </Card.Content>
        </Card>
        ))}
      </Card.Group>
      <br/>
      <Pagination
         defaultActivePage = {pageNo}
         onPageChange = {(e, data) => handlePaginationChange(data.activePage)}
         totalPages={totalPage}
         pageSize={pageSize}
         siblingRange={1}
      />
      <Select
         style={{ marginLeft: "2em" }}
         options={pageSizeOptions}
         onChange={(e, value) => handleSizeChange(value)}
         placeholder="10"
         compact
      />
    </div>
  );
}
