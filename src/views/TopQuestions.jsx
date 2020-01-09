import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import { Container, Row, Col } from 'react-bootstrap';

function TopQuestions(props) {
    const [questions, setQuestions] = useState([]);

    useEffect (() => {
        let apiURL = "https://api.stackexchange.com/2.2/questions";
        let params = {
            order: "desc",
            sort: "hot",
            site: "stackoverflow",
            filter: "!9Z(-wv328",
        };
        const url = apiURL + "?" + getQueryString(params);
        fetch(url)
            .then(function(response) {
                response.json().then(data => {
                    let tempQuestions = data.items;
                    tempQuestions.sort((a, b) => b.comment_count - a.comment_count);

                    setQuestions(tempQuestions.slice(0, 10));
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    , []);

    function getQueryString (params) {
        return Object.keys(params).map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        ).join("&");
    }

    function openQuestion (id) {
        props.history.push('/question/' + id);
    }

    return (
        <div className="content-area">
            <Container fluid>
                <Row>
                    <Col lg={8} md={12} xs={12} className="colnopad">
                        <div className="headline-section">
                            <h3 className="headline"> Top Questions </h3>
                        </div>
                        <div className="question-list">
                        {
                            questions.map((question) => {
                                return (
                                    <Question 
                                        key={question.question_id} 
                                        onClick={() => openQuestion(question.question_id)}
                                        question={question}
                                    />
                                )
                            })
                        }
                        </div>
                    </Col>
                    <Col lg={4} md={12} xs={12} className="colnopad">
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TopQuestions;