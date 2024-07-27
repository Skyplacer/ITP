import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from 'reactstrap'; // Import Button from reactstrap
import { FaEdit, FaTrash, FaUsers  } from 'react-icons/fa';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import SideNavbar from "../component/SideNavbar";

const TProfile = () => {
    
    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const email = Cookies.get("email");
        if (!email) {
            setError("User Not Logged in Please Login");
            setLoading(false);
            return;
        }

        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/teacher/find-by-email/${email}`);
                setTeacherData(response.data.teacher);
                setLoading(false);
            } catch (error) {
                setError("Error fetching teacher data");
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/tUpdate/${id}`); // Navigate to update page with teacher ID
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this account?");
        if (!isConfirmed) {
            return;
        }
    
        try {
            await axios.delete(`http://localhost:8081/teacher/delete/${id}`);
            // After successful deletion, you might want to redirect the user or update the UI accordingly
            // For now, let's just reload the teacher data
            const email = Cookies.get("email");
            if (email) {
                const response = await axios.get(`http://localhost:8081/teacher/find-by-email/${email}`);
                setTeacherData(response.data.teacher);
            }
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    const handleAllTeacherView = () => {
        navigate('/tInterfaceDetails'); // Navigate to the all teacher view page
    };


    return (
        <div style={{ backgroundColor: '#ECF0F5' }} className='vh-100'>
            <Header/>
            <SideNavbar />
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5 mb-5">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-danger">{error}</p>
                    ) : teacherData ? (
                        <div className="card rounded-4 border border-dark shadow alert alert-info">
                            <div className="card-body">
                                <h1 className="text-dark card-title text-center">{`${teacherData.firstName} ${teacherData.lastName}`}</h1><hr/><hr/>
                                <h5 className="text-dark ml-5"><b>NIC Number: </b>{teacherData.nicNumber}</h5>
                                <h5 className="text-dark ml-5 mt-3"><b>Subject: </b>{teacherData.subject}</h5>
                                <h5 className="text-dark ml-5 mt-3"><b>District: </b>{teacherData.district}</h5>
                                <h5 className="text-dark ml-5 mt-3"><b>Education Qualification: </b>{teacherData.eduQualification}</h5>
                                <h5 className="text-dark ml-5 mt-3"><b>Phone Number: </b>{teacherData.phoneNumber}</h5>
                                <h5 className="text-dark ml-5 mt-3"><b>Email: </b>{teacherData.email}</h5><hr/><hr/>

                                <center>
                                <div>
                                    <Button className='btn-lg mr-5 me-2 rounded-5' color="info" onClick={() => handleEdit(teacherData._id)}>
                                        <FaEdit className='me-2' /> Edit Details
                                    </Button>
                                    <Button className='btn-lg ml-5 me-2 rounded-5' color="danger" onClick={() => handleDelete(teacherData._id)}>
                                        <FaTrash className='me-2' /> Delete
                                    </Button>
                                </div>
                                </center>
                                
                                
                            </div>
                            
                        </div>
                        
                    ) : (
                        <p className="text-danger">Teacher not found</p>
                    )}
                    <center>
                    <Button className='btn-lg me-2 rounded-5 mt-4 mb-5' color="success" onClick={() => handleAllTeacherView()}>
                        <FaUsers className='me-2' /> All Teacher View
                    </Button>
                    </center>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TProfile;
