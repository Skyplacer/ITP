import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie';
import { setUsername } from "../../Exam Platform and Leaderboard/actions/username_actions";
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import { 
    FaFileAlt,
    FaUsers,
    FaBars,
    FaSignOutAlt ,
    FaRegChartBar,
    FaCommentAlt,
    FaBook,
    FaUserCircle,
    FaQuestionCircle,
    FaCalendarAlt,
    FaBullhorn,
    FaUserCheck
 } from 'react-icons/fa';
import SideNavbar from "../component/SideNavbar";

const THome = () => {
    const [authenticated, setAuthenticated] =useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {

        const email = Cookies.get("email");
        if (!email) {
            return;
        }

        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/teacher/find-by-email/${email}`);
                const { firstName, lastName } = response.data.teacher; // Extract firstName and lastName from response

                // Combine firstName and lastName into a single string
                const fullName = `${firstName} ${lastName}`;

                // Dispatch setUsername action with the combined fullName
                dispatch(setUsername(fullName));
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeacherData();
    }, [dispatch]);

    useEffect(() => {
        // Check if the user has a valid token ....
        const token = localStorage.getItem('token');

        if (token) {
            // User is authenticated
            setAuthenticated(true);
        } else {
            //User is not authenticated, display alert and navigate Teacher 
            alert("Please login to access this page.");
            navigate('/tLogin'); // navigate to the login page
            
        }
    }, [navigate]);


    
    if (!authenticated) {
        return (
            <div>
                <p>Please log in to access this page.</p>
            </div>
        );
    }




    //If user Authenticated render the page
    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
        <Header />
        <SideNavbar />
        <div className="container-fluid">
            <div className="row mr-5">
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <Container fluid className={`mt-5 mb-5 `}>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Feedback</Card.Title>
                                        <Link to="/teacherFeedback" className="stretched-link"></Link>
                                        <div>
                                            <FaCommentAlt size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Q&A</Card.Title>
                                        <Link to="/updateInquiry" className="stretched-link"></Link>
                                        <div>
                                            <FaQuestionCircle size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Timetable</Card.Title>
                                        <Link to="/createClass" className="stretched-link"></Link>
                                        <div>
                                            <FaCalendarAlt size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Announcements</Card.Title>
                                        <Link to="/createAnnouncement" className="stretched-link"></Link>
                                        <div>
                                            <FaBullhorn size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Study Material</Card.Title>
                                        <Link to="/pdfApp" className="stretched-link"></Link>
                                        <div>
                                            <FaRegChartBar size={24} /> 
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Past Papers</Card.Title>
                                        <Link to="/PastPaperUpload" className="stretched-link"></Link>
                                        <div>
                                            <FaFileAlt size={24} /> 
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Exam</Card.Title>
                                        <Link to="/teacherInterface" className="stretched-link"></Link>
                                        <div>
                                            <FaBook size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Marks</Card.Title>
                                        <Link to="/bsmarks" className="stretched-link"></Link>
                                        <div>
                                            <FaRegChartBar size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Attendance</Card.Title>
                                        <Link to="/attendance" className="stretched-link"></Link>
                                        <div>
                                            <FaUserCheck size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                                        <div>
                                            <Card.Title>View Profile</Card.Title>
                                            <Link to="/tProfile" className="stretched-link"></Link>
                                        </div>
                                        <div>
                                            <FaUserCircle size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                                        <div>
                                            <Card.Title>All Teacher View</Card.Title>
                                            <Link to="/tInterfaceDetails" className="stretched-link"></Link>
                                        </div>
                                        <div>
                                            <FaUsers size={24} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default THome;
