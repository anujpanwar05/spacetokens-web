import React from "react";
import "./style.css";
import headImage from "../../../assets/img/blog/blog-header.png";
import bgImage from "../../../assets/img/large-background.png";
import Header from "../../../components/Header"
import { Container, Row, Col } from "reactstrap"

function Article({ article, style }) {
  return (
    <>
      <Col md={2}>
        <Row>
          <Col style={{textAlign: 'center', width: 100, marginTop: 5}}>
            <img src={article.authorImg} alt={"authorImage"} height={60} />
            <h5 style={{marginTop: 10}}><b>{article.author}</b></h5>
            <h6 style={{paddingLeft: 2}}>{article.date}</h6>
          </Col>
        </Row>
      </Col>
      <Col md={8}>
        <h2 className="article-title">{article.title}</h2>
        <p className="body">{article.body}</p>
        <div className="divider" style={{marginTop: 30}}/>
      </Col>
      <Col md={2}></Col>
    </>
  );
}

export default Article;
