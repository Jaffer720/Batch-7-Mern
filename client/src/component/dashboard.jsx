import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaExclamationTriangle, FaCalendarTimes, FaDatabase } from 'react-icons/fa';



function Dashboard() {

  // Inline Styles
  const styles = {
    dashboardContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    profileHeader: {
      textAlign: 'center',
    },
    profilePic: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
    },
    profileStats: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: '20px',
    },
    statBox: {
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '10px',
    },
    recentActivities: {
      marginTop: '20px',
    },
    activitiesList: {
      listStyleType: 'none',
      padding: 0,
    },
    activityItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    activityIcon: {
      marginRight: '10px',
      fontSize: '20px',
    },
    activityTime: {
      marginLeft: 'auto',
      color: 'gray',
    },
  };

  // Dummy data for income, expenses, and profit for a full year
  const data = [
    { month: 'Jan', income: 1500, expenses: 1000, profit: 500 },
    { month: 'Feb', income: 1700, expenses: 1100, profit: 600 },
    { month: 'Mar', income: 1800, expenses: 1300, profit: 500 },
    { month: 'Apr', income: 2100, expenses: 1400, profit: 700 },
    { month: 'May', income: 1900, expenses: 1200, profit: 700 },
    { month: 'Jun', income: 1600, expenses: 1100, profit: 500 },
    { month: 'Jul', income: 1700, expenses: 1200, profit: 500 },
    { month: 'Aug', income: 1800, expenses: 1300, profit: 500 },
    { month: 'Sep', income: 2000, expenses: 1400, profit: 600 },
    { month: 'Oct', income: 2200, expenses: 1500, profit: 700 },
    { month: 'Nov', income: 2100, expenses: 1400, profit: 700 },
    { month: 'Dec', income: 1900, expenses: 1300, profit: 600 },
  ];

  // Data for recent activities
  const activities = [
    { id: 1, text: 'Your billing information is not active.', time: 'Yesterday', icon: <FaExclamationTriangle /> },
    { id: 2, text: 'Your subscription has expired.', time: 'Today', icon: <FaCalendarTimes /> },
    { id: 3, text: 'Your storage space is running low.', time: 'Last Week', icon: <FaDatabase /> },
  ];

  return (
    <div className="App">
      <div style={styles.dashboardContainer}>

        {/* Profile Section */}
        <div style={styles.profileContainer}>
          <div style={styles.profileHeader}>
            <img src="/path-to-profile-image.jpg" alt="profile" style={styles.profilePic} />
            <h2>Wendell Dikes</h2>
            <p>Buyer</p>
          </div>
          <div style={styles.profileStats}>
            <div style={styles.statBox}>
              <p>45</p>
              <p>My Orders</p>
            </div>
            <div style={styles.statBox}>
              <p>5</p>
              <p>My Wishlist</p>
            </div>
            <div style={styles.statBox}>
              <p>$9,000</p>
              <p>My Profit</p>
            </div>
          </div>
        </div>

        {/* Yearly Analytics Line Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
            <Line type="monotone" dataKey="profit" stroke="#ffc658" name="Profit" />
          </LineChart>
        </ResponsiveContainer>

        {/* Recent Activities Section */}
        <div style={styles.recentActivities}>
          <h3>Recent Activities</h3>
          <ul style={styles.activitiesList}>
            {activities.map(activity => (
              <li key={activity.id} style={styles.activityItem}>
                <span style={styles.activityIcon}>{activity.icon}</span>
                <span className="text">{activity.text}</span>
                <span style={styles.activityTime}>{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
