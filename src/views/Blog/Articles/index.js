import "./style.css"
import { Link } from "react-router-dom"
import React, { Component } from "react"
import Header from "../../components/Header"
import { Container, Row, Col } from "reactstrap"
import { articles } from './blogData'
import ArticleCard from './ArticleCard'
import headImage from "../../assets/img/blog/blog-header.png";
import bgImage from "../../assets/img/large-background.png";

export default class Articles extends Component {
  render() {
    return (
      <div className="blog" style={{ backgroundImage: `url(${bgImage})` }}>
        <Header/>
        <div className="blog-img" style={{background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${headImage})` }}>
          <h1 className="title">Welcome To <b>Space Tokens Blog</b></h1>
        </div>
        <Container className="articles">
          <Row>
            {articles.map((item, idx) => (
              <Col key={idx}>
                <ArticleCard article={item}/>
              </Col>
            ))}
          </Row>
        </Container>
        <div className="pages">
        </div>
      </div>
    )
  }
}
