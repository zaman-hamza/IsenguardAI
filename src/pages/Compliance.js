// src/components/PlatformSelection.jsx

import React from "react";
import "../styles/dashboard.css";  // Assuming the styles are in this file, otherwise change the path
import { PopupButton } from '@typeform/embed-react'
function openPage(pageUrl) {
  window.open(pageUrl, "_self"); // Ensure page opens in the same tab for better UX
}

const PlatformSelection = ({ onSelectCompliance }) => {
  // Function to handle redirect to the dashboard page
  const goToDashboard = () => {
    openPage("/dashboard");
  };

  return (
    <div className="dashboard-body">
      <div className="dashboard-header">IsenGuard AI</div>

      <div className="dashboard-container">
        <h2 style={{ fontSize: '3rem' }}>Choose a platform</h2>
        <p className="dashboard-description">
          Choose the compliance standard you would like to monitor for your application. We are continually expanding our offerings, with more compliance tooling coming soon to help you stay ahead.
        </p>
        <div style={{ height: '48px' }}></div>
      </div>

      <div className="dashboard-cards">

        <PopupButton id="YuKf7L7S" style={{ fontSize: 20 }} className="my-button">
          <div className="dashboard-card" onClick={onSelectCompliance}>
            <i className="material-icons-sharp" style={{ fontSize: '3rem' }}>verified_user</i>
            <h3 style={{ marginTop: '24px' }}>SOC 2</h3>
            <p style={{ marginTop: '24px' }}>
              SOC 2 ensures your organization securely handles data and protects client privacy, essential for cloud-based services.
            </p>
          </div>
        </PopupButton>
        <div className="dashboard-card">
          <i className="material-icons-sharp" style={{ fontSize: '3rem' }}>cloud_queue</i>
          <h3 style={{ marginTop: '24px' }}>More coming soon</h3>
          <p style={{ marginTop: '24px' }}>
            Additional standards like ISO 27001, HIPAA, etc., are on the way to meet broader regulatory needs.
          </p>
        </div>
      </div>
      <a className="back-btn" id="back-btn" onClick={goToDashboard} style={{ display: 'flex', justifyContent: 'center', width: '300px' }}>
        Back to Dashboard
      </a>

    </div>
  );
};



export default PlatformSelection;
