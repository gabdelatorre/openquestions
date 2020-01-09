import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Question(props) {

    function decodeHTMLString(text) {
        if (text === undefined || text === "") {
            return "";
        }
        
        var dom = new DOMParser().parseFromString(text, "text/html");
        let decodedString = dom.body.textContent;
        decodedString = decodedString.replace("&quot;", '"');

        return decodedString;
    }

    return (
        <div className="question-card">
            <div className="question-stats">
                <div className="comment-counts"> {props.question.comment_count} </div>
                <div>comments</div>
            </div>
            <div className="question-content">
                <Container fluid>
                    <Row>
                        <Col lg={12} className="colnopad"> 
                            <Link to={"/question/" + props.question.question_id}> {decodeHTMLString(props.question.title)} </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} xs={12} className="colnopad"> 
                            <div className="question-tags">
                                {
                                    props.question.tags.map((tag) => {
                                        return (
                                            <span key={tag} className="question-tag"> {tag} </span>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                        <Col lg={6} xs={12} className="colnopad"> 
                            <div className="question-info"> by <span className="question-user"> {props.question.owner.display_name} </span> </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Question;