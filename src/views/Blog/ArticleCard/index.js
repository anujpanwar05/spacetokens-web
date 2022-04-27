import React from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, span, Button
} from 'reactstrap';
import "./style.css";
import cardImg from "../../../assets/img/blog/no-img.png";
import authorImg from "../../../assets/img/blog/no-author-img.png";

function ArticleCard(props) {
  return (
    <Card className="article-card" onClick={()=>{window.location.href=props.article.link ? props.article.link : "/notfound"}}>
        <CardImg className="card-image" src={cardImg} alt="Card image cap"/>
        <CardBody className="article-card">
          <div className="card-info">
            <img className="rounded-circle icon mx-auto, author-img" src={props.article.authorImg ? props.article.authorImg : authorImg} width="42" height="42"/>
            <span className="author-name">{props.article.author ? props.article.author : "Unknown"}</span>
            <div className="filler"></div>
            <span className="date">{props.article.date ? props.article.date : "Unknown"}</span>
          </div>
          <CardTitle tag="h5">{props.article.title ? props.article.title : 'Article'}</CardTitle>
        </CardBody>
      </Card>
  );
}

export default ArticleCard;
