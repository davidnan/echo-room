import React from 'react';
import {useAuth} from "./auth/AuthContext.jsx";
import {MinidenticonImg} from "./profile/MinidenticonImg.jsx";

const ProfileHeader = () => {
  return (
    <header style={styles.headerContainer}>
      <div style={styles.profileContainer}>
        <MinidenticonImg username={useAuth().user.email} saturation="90" width="150" height="150" seed={242}/>
        <div style={styles.textContainer}>
          <h1 style={styles.userName}>{useAuth().user.displayName}</h1> {/* Replace with actual user name */}
          <p style={styles.websiteName}>Echo Room</p> {/* Replace with actual website name */}
        </div>
      </div>
    </header>
  );
};

const styles = {
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ccc',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePicture: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  websiteName: {
    margin: 0,
    fontSize: '12px',
    color: '#666',
  },
};

export default ProfileHeader;
