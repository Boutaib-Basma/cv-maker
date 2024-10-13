import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CV from './CV'; 
const UserList = ({ users, editUser, deleteUser }) => {
    const containerStyle = {
        width: '60%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    };

    const listItemStyle = {
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const buttonStyle = {
        marginLeft: '10px',
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#f44336',
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    };

    return (
        <div style={containerStyle}>
            <h3 style={headerStyle}>User List:</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {users.map((user, index) => (
                    <li key={index} style={listItemStyle}>
                        <strong>{user.Fname} {user.Lname}</strong> <br />
                        <span>{user.email}</span> <br />
                        <span>{user.Tel}</span> <br />
                        <span>{user.Adresse}</span> <br />
                        <button style={buttonStyle} onClick={() => editUser(user)}>Edit</button>
                        <button style={deleteButtonStyle} onClick={() => deleteUser(user.email)}>Delete</button>
                        <PDFDownloadLink 
                            document={<CV user={user} />} 
                            fileName={`${user.Fname}_${user.Lname}_CV.pdf`}
                            style={{ marginLeft: '10px' }} 
                        >
                            {({ loading }) => (
                                <button style={buttonStyle} disabled={loading}>
                                    {loading ? 'Loading...' : 'Download CV'}
                                </button>
                            )}
                        </PDFDownloadLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
