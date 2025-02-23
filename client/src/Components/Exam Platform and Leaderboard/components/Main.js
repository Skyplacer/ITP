import React, {useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../redux/result_reducer'
import Header from './Header'
import Footer from './Footer'

export default function Main(){

    const inputRef = useRef(null)
    const dispatch = useDispatch()

    const username = useSelector(state => state.name.name)

    useEffect(() => {
        if(username){
            inputRef.current.value = username;
        }
    }, [username]);

    function startQuiz(){
        if(username){
             dispatch(setUserId(username))
        }
    }

    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
        <Header/>
        <div className='container mt-5 mb-5'>
            <h1 className="alert alert-success p-3 mt-3 text-center  border border-success">Exam Instructions</h1>
            
            <ol className='mt-5'>
            <li>Ensure a stable internet connection throughout the exam to avoid any disruptions. </li>
            <li>Have your student ID and any required materials ready before starting. </li>
            <li>Read each question carefully and review your answers before submission. </li>
            <li>Keep track of time and allocate it wisely across all questions. </li>
            <li>Do not navigate away from the exam page or open new tabs unless instructed. </li>
            </ol>

            <div className="input-group mt-5 w-25 mx-auto">
                <span className="input-group-text text-bg-success border border-success" id="basic-addon1">@</span>
                <input
                        ref={inputRef}
                        type="text"
                        className="form-control border border-success"
                        placeholder='Username*'
                        disabled
                />
            </div>

            <div className='mt-3'>
                <Link style={{marginLeft: '47%'}} to="/quiz" onClick={startQuiz}>Start Exam</Link>
            </div>
        </div>
        <Footer/>
        </div>
    )
}