import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import MainTitle from '../../../shared/components/Title/MainTitle';

import axios from 'axios'

import './FeedbackList.css'


const API_URL = 'http://localhost:8080/feedback/list'


const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleChangeFeedback = (e) => {
    setFeedback(e.target.value)
  }

  const postContact = () => {
    axios.post(API_URL, { feedback })
      .then(() => {
        window.alert("Your contact has been serviced.");
        navigate('/')
      })
      .catch((error) => {
        console.log(error.response.data)
      });
  };

  return (
    <section className="feedback-whole">
      <MainTitle title="問題發問區"/>
      <div className="feedback-form">
        <label className='feedback-label' htmlFor="feedback"></label>
        <textarea className='feedback-textarea' value={feedback} onChange={handleChangeFeedback} name="feedback" id="need" rows="10" />
        <br />
        <button onClick={postContact} className='feedback-button'>提交表單</button>
      </div>
    </section>
  )
}

export default Feedback