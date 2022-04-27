import "./style.css"
import React, { Component } from "react"
import Header from "../../components/Header"
import { Container, Row, Col } from "reactstrap"
import { connect } from "react-redux";
import { articles } from './blogData'
import Article from './Article'
import headImage from "../../assets/img/blog/blog-header.png";
import showcaseBanner from "../../assets/img/blog/showcase-banner.jpg";
import bgImage from "../../assets/img/large-background.png";

class Blog extends Component {
  render() {
    return (
      <>
        <Header component={'blog'}/> 
        <div className="blog" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="blog-header" style={{background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${showcaseBanner})` }}>
            <div style={{textAlign: 'center'}}>
              <h1 className="header-title"><b>Space Tokens Blog</b></h1>
              <h4 className="sub-title">Read about News and Upcoming Features.</h4>
            </div>
          </div>
          <Container className="articles">
            {articles.map((item, idx) => (
              <Row md={12} key={`article-` + idx} className="article">
                <Article article={item}/>
              </Row>
            ))}
          </Container>
        </div>
      </>
    )
  }
}

export default connect()(Blog);
