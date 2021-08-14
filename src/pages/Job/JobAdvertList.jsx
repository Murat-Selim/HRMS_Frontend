import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Feed, Pagination, Rating, Select } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";
import {addToFavorite, removeFromFavorite} from "../../store/actions/favoriteActions";
import FavoriteService from "../../services/favoriteService";
import moment from "moment";
import "moment/locale/tr";

export default function JobAdvertList() {

  moment.locale("tr");
  
  const dispatch = useDispatch();

  const filters = useSelector(state => state.filter.filters);
  
  const [favorites, setFavorites] = useState([]);

  const [totalPage, setTotalPage] = useState(1);

  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [jobAdverts, setJobAdverts] = useState([]);
  
  useEffect(() => {
    let favoriteService = new FavoriteService();
    let jobAdvertService = new JobAdvertService();

    jobAdvertService.getByJobAdvertFilter(pageNo, pageSize, filters).then((result) => {
    setJobAdverts(result.data.data.content)
    setTotalPage(result.data.data.totalPages)
    });

    favoriteService.getByCandidateId(29).then((result)=>setFavorites(result.data.data))

  }, [pageNo, pageSize, filters]);

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

  const handleAddToFavorite = (candidateId, jobAdvertId) => {
    let favoriteJobAdvert = {
      candidate: {
        id: candidateId
      },
      jobAdvert: {
        id: jobAdvertId 
      }
    }
     let favoriteService = new FavoriteService();
     favoriteService.add(favoriteJobAdvert)
     dispatch(addToFavorite(favoriteJobAdvert))
  }

  const handleRemoveToFavorite = (candidateId, jobAdvertId) => {
     let favoriteService = new FavoriteService();
     favoriteService.delete(candidateId, jobAdvertId)
     dispatch(removeFromFavorite(jobAdvertId))
     toast.success("Favorilerden kaldırma işlemi başarılı!")
  }

  function handleCheckToFavorite(jobAdvertId){
    for (let i = 0; i < favorites.length; i++) {
      if(favorites[i].jobAdvert?.id === jobAdvertId){
        return true;
      }
    } 
    return false;
  }

  return (
    <div>
      <Card.Group>
      {jobAdverts.map((jobAdvert) => (
      <Card fluid color="blue" key={jobAdvert.id}>
        <Card.Content>
          <Card.Header style={{textAlign: "left", fontWeight: "bold", height: "30px", marginTop: "10px", color: "purple" }}>
            {jobAdvert.jobPosition?.jobTitle}
            <Card.Group style={{float: "right", marginTop: "0px"}}>
              <Feed.Meta >
                <Feed.Like>
                  {handleCheckToFavorite(jobAdvert.id)===true ? (
                            <Rating icon='heart' size="large" onClick={() => handleRemoveToFavorite(29, jobAdvert.id)}/>) :
                            (<Rating icon='heart' size="large" onClick={() => handleAddToFavorite(29, jobAdvert.id)}/>
                            )}
                </Feed.Like>
              </Feed.Meta>
            </Card.Group>
          </Card.Header>
        </Card.Content>
        <Card.Content extra>         
         <div style={{textAlign: "left", color: "black"}}>
            <Card.Description>
              <div style={{ marginTop: "10px" }}>
                <strong style={{color: "green"}}>{jobAdvert.employer?.companyName}</strong>
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px"}}>
                {jobAdvert.city?.name}
              </div>
            </Card.Description>
            <Card.Description style={{marginTop: "10px"}}>
                {jobAdvert.workTime?.name} 
              <Card.Group style={{float: "right", marginTop: "0px"}}>
                  {moment(jobAdvert.createdDate)
                          .startOf("day")
                          .fromNow()}
              </Card.Group>
            </Card.Description>
          </div>
         </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button content="İş İlanına Git" as={NavLink} to={`/jobAdverts/${jobAdvert.id}`} basic color="green" />
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
