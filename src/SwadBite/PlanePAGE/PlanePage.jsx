import React, { useState, useContext, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

import NavBar from '../HomePAge/Navbar'; 
import { AuthContext } from '../HomePAge/AuthContext';

const PlanPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // prevent rendering before redirect
  }

  const planStartDate = new Date('2025-06-27');
  const planEndDate = new Date('2025-07-26');
  const currentDate = new Date();

  const totalDays = (planEndDate - planStartDate) / (1000 * 60 * 60 * 24);
  const daysUsed = (currentDate - planStartDate) / (1000 * 60 * 60 * 24);
  const remainingDays = Math.max(totalDays - daysUsed, 0);
  const progressPercent = Math.round((daysUsed / totalDays) * 100);

  const handleCalendarClick = () => setShowCalendar(prev => !prev);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <>
      <NavBar />
      <div className="plan-container">
        <style>{`
          /* 🔥 Background setup */
          .plan-container {
            min-height: 100vh;
            background: url("https://images.unsplash.com/photo-1504674900247-0877df9cc836")
              no-repeat center center/cover;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 100px;
            font-family: 'Poppins', sans-serif;
          }

          .main {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 20px;
            padding: 30px;
            max-width: 900px;
            width: 90%;
            box-shadow: 0px 8px 30px rgba(0,0,0,0.2);
            animation: fadeIn 1s ease-in-out;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .user-info img {
            height: 70px;
            width: 70px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #f59e0b;
          }

          .right-side {
            display: flex;
            gap: 20px;
            align-items: center;
          }

          .renew-button {
            background: linear-gradient(45deg, #f59e0b, #d97706);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.3s;
          }

          .renew-button:hover {
            transform: scale(1.05);
          }

          .calendar-box {
            background: #fff;
            border: 2px solid #fbbf24;
            border-radius: 10px;
            padding: 10px;
            text-align: center;
            cursor: pointer;
          }

          .quote, .footer-quote {
            text-align: center;
            font-style: italic;
            margin: 20px 0;
            font-size: 18px;
            color: #374151;
          }

          .section-title {
            margin-top: 20px;
            font-size: 22px;
            font-weight: bold;
            color: #b45309;
            border-bottom: 2px solid #fbbf24;
            padding-bottom: 5px;
          }

          .progress-bar {
            background: #f3f4f6;
            border-radius: 10px;
            margin: 15px 0;
            height: 25px;
            overflow: hidden;
          }

          .progress {
            background: linear-gradient(90deg, #f59e0b, #d97706);
            height: 100%;
            text-align: center;
            font-weight: bold;
            color: white;
            transition: width 0.5s ease-in-out;
            border-radius: 10px;
            width: ${progressPercent}%;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="main">
          <div className="header">
            <div className="user-info">
              <img src={user.photo} alt="profile" />
              <div>
                <h2>Welcome back {user.name}!</h2>
                <p>Your SwaadBite subscription is active.</p>
              </div>
            </div>
            <div className="right-side">
              <button className="renew-button">Renew Plan</button>
              <div className="calendar-container">
                <div className="calendar-box" onClick={handleCalendarClick}>
                  <FaCalendarAlt />
                  <div>Calendar</div>
                  <div>{selectedDate.toLocaleDateString('en-GB')}</div>
                </div>
                {showCalendar && (
                  <div className="custom-calendar">
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="quote">
            "Good food brings good mood. Stay consistent. Stay nourished."
          </div>

          <div className="section-title">Plan Details</div>
          <p><b>Plan Type:</b> Monthly</p>
          <p><b>Start Date:</b> 2025-06-27</p>
          <p><b>End Date:</b> 2025-07-26</p>
          <p>{remainingDays.toFixed(0)} days remaining in your plan.</p>

          <div className="progress-bar">
            <div className="progress">{progressPercent}%</div>
          </div>

          <div className="section-title">Mess Details</div>
          <p><b>Mess Name:</b> FindYourMess Central</p>
          <p><b>Owner Name:</b> Priya Sharma</p>

          <div className="footer-quote">
            "Track your meals, manage your days — your plan, your control."
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanPage;
