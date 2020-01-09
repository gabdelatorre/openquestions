import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

function QuestionView() {
    let { questionId } = useParams();
    const [questionData, setQuestionData] = useState({});
    const [comments, setComments] = useState([]);

    useEffect (() => {
        let apiURL = "https://api.stackexchange.com/2.2/questions/" + questionId;
        let params = {
            order: "desc",
            sort: "activity",
            site: "stackoverflow",
            filter: "!b1MMES7QHL2nSN",
        };
        const url = apiURL + "?" + getQueryString(params);
        fetch(url)
            .then(function(response) {
                response.json().then(data => {
                    setQuestionData(data.items[0]);
                    setComments(data.items[0].comments);
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
        <div className="content-area">
            <Container fluid>
                <Row>
                    <Col lg={12} md={12} xs={12} className="colnopad">
                        <div className="headline-section">
                            <h3 className="headline">  {decodeHTMLString(questionData.title)} </h3>
                            {
                                questionData.creation_date &&
                                <div>
                                    <span className="headline-stat"> 
                                        {'Asked '} <span className="headline-stat-val"> <Moment fromNow unix date={questionData.creation_date}/>  </span>
                                    </span>
                                    <span className="headline-stat"> 
                                        {'Viewed '} <span className="headline-stat-val"> {questionData.view_count} </span> {' times'}
                                    </span>
                                </div>
                            }
                        </div>
                        
                        <div className="question-body">
                            <div dangerouslySetInnerHTML={{ __html: questionData.body }} />
                            {
                                questionData.tags &&
                                <div className="question-tags">
                                {
                                    questionData.tags.map((tag) => {
                                        return (
                                            <span key={tag} className="question-tag"> {tag} </span>
                                        )
                                    })
                                }
                                </div>
                            }

                            <div className="user-info-section">
                            {
                                questionData.owner &&
                                <div className="user-info">
                                    <div className="user-postdate">
                                        {'asked '} <Moment unix format="MMM DD 'YY" date={questionData.creation_date}/> {' at '} <Moment unix format="HH:mm" date={questionData.creation_date}/>
                                    </div>
                                    <div className="user-avatar">
                                        <img src={questionData.owner.profile_image} alt="" width="32" height="32" className="bar-sm"/>
                                    </div>
                                    <div className="user-details">
                                        <span className="question-user">{questionData.owner.display_name}</span>
                                        <div className="-flair">
                                            <span className="reputation-score" title="reputation score ">{questionData.owner.reputation}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>

                        <div className="comments-list">
                                {
                                    comments.map((comment) => {
                                        return (
                                            <div key={comment.comment_id} className="comment-entry">
                                                {decodeHTMLString(comment.body) + ' – '}
                                                <span className="question-user"> {comment.owner.display_name} </span> <span className="comment-date"> <Moment unix date={comment.creation_date}/> </span> 
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default QuestionView;