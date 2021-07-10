import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Pagination, Select } from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";
import {addToFavorite} from "../store/actions/favoriteActions";
import FavoriteService from "../services/favoriteService";
import moment from "moment";

export default function JobAdvertList() {

  moment.locale("tr");
  
  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(8);
  
  const dispatch = useDispatch();

  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdverts = new JobAdvertService();
    jobAdverts.getByIsActive(pageNo, pageSize).then((result) => setJobAdverts(result.data.data));
  }, [pageNo, pageSize]);

  const handleAddToFavorite = (jobAdvert) => {
     let addFavorite = new FavoriteService()
     addFavorite.add(jobAdvert)
     dispatch(addToFavorite(jobAdvert))
     toast.success(`${jobAdvert.jobTitle} favorilere eklendi!`)
  }

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
      <Card.Group>
      {jobAdverts.map((jobAdvert) => (
      <Card fluid color="blue" key={jobAdvert.id}>
       
        <Card.Content>
          <Card.Header
            style={{fontWeight: "bold", height: "30px", marginTop: "7px", color: "purple" }}
            content={jobAdvert.employerCompanyName}
          />
          <hr/>
          <div>
            <Card.Description>
              <h3>
                <b>Pozisyon : </b> 
                <strong>{jobAdvert.jobTitle}</strong>
              </h3>
            </Card.Description>
            <Card.Description>
              <div style={{ margin: "10px" }}>
                <b> Açık Pozisyon : </b> {jobAdvert.numberOfOpenPosition}
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ margin: "10px" }}>
                <b> Oluşturma Tarihi : </b> {moment(jobAdvert.createdDate)
                          .startOf("day")
                          .fromNow()}
              </div>
            </Card.Description>
            <Card.Description>
              <b>Kapanış Tarihi : </b> {moment(jobAdvert.applicationDeadline)
                          .endOf("day")
                          .fromNow()}
            </Card.Description>
          </div>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button as={NavLink} to={`/jobAdverts/${jobAdvert.id}`} basic color="green">
              İş İlanına Git
            </Button>
            <Button basic color="red" onClick={() => handleAddToFavorite(jobAdvert)}>
              Favorilere Ekle
            </Button>
          </div>
         </Card.Content>
         </Card>
        ))}
      </Card.Group>
      <br/>
      <Pagination
         defaultActivePage = {pageNo}
         onPageChange = {(e, data) => handlePaginationChange(data.activePage)}
         totalPages={10}
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
