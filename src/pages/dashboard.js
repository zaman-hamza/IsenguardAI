import React from "react";
import { Link, Redirect } from "react-router-dom";
import { authStates, withAuth } from "../components/auth";
import Loader from "../components/loader";
import { signOut } from "../utils/firebase";
import "../styles/dashboard.css";

function openPage(pageUrl) {
    window.open(pageUrl, "_self"); // Ensure page opens in the same tab for better UX
}

function handleSignOut() {
    signOut()
        .then(() => {
            console.log("Signed Out");
        })
        .catch(e => {
            console.log("Error signing out", e);
        });
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComplianceOptions: false,
        };
    }

    showComplianceOptions = () => {
        this.setState({ showComplianceOptions: true });
        openPage("/compliance");
    };

    render() {
        if (this.props.authState === authStates.INITIAL_VALUE) {
            return <Loader />;
        }
        if (this.props.authState === authStates.LOGGED_OUT) {
            return <Redirect to="/login"></Redirect>;
        };
        return (
            <div className="dashboard-body">
                <div className="dashboard-header">
                    IsenGuard AI
                </div>

                <div className="dashboard-container">
                    <h2 style={{ fontSize: '3rem' }}>Choose a platform</h2>
                    <p className="dashboard-description">
                        Choose the compliance standard you would like to monitor for your application. We are continually expanding our offerings, with more compliance tooling coming soon to help you stay ahead.
                    </p>
                    <div style={{ height: '48px' }}></div>

                    {/* Rendering Cards based on state */}
                    {!this.state.showComplianceOptions ? (
                        <div className="dashboard-cards" id="intro-cards">
                            <div className="dashboard-card" id="compliance-card" onClick={this.showComplianceOptions}>
                                <i className="material-icons-sharp" style={{ fontSize: '3rem' }}>verified_user</i>
                                <h3 style={{ marginTop: '24px' }}>Compliance</h3>
                                <p style={{ marginTop: '24px' }}>Automatically apply and monitor compliance standards like SOC 2 for cloud-based projects.</p>
                            </div>
                            <div className="dashboard-card">
                                <i className="material-icons-sharp" style={{ fontSize: '3rem' }}>cloud_queue</i>
                                <h3 style={{ marginTop: '24px' }}>Cloud Security</h3>
                                <p style={{ marginTop: '24px' }}>Monitor and secure cloud environments, analyzing data and code to detect vulnerabilities.</p>
                            </div>
                            <div className="dashboard-card">
                                <i className="material-icons-sharp" style={{ fontSize: '3rem' }}>security</i>
                                <h3 style={{ marginTop: '24px' }}>Local Antivirus</h3>
                                <p style={{ marginTop: '24px' }}>Automatically detect and alert users when malicious files are about to be downloaded.</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            </div>
                    )}
                </div>

                <div className="dashboard-footer">
                <button className="back-btn" onClick={handleSignOut} style={{ display: 'flex', justifyContent: 'center', width: '300px', marginBottom: '10px' }}> Sign Out </button>
                <br />
                    © 2024 IsenGuard AI. All rights reserved.
                    <br />
                    <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="mailto:support@isenguardai.com">Contact Us</a>
                </div>
            </div>
        );
    }
}

export default withAuth(Dashboard);
