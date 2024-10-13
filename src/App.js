import { useState } from 'react';
import UserForm from './Components/UserForm';
import UserList from './Components/UserList';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CV from './Components/CV';
import * as XLSX from 'xlsx';

function App() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const addOrEditUser = (user) => {
        if (currentUser) {
            setUsers(users.map(u => (u.email === currentUser.email ? user : u)));
            setCurrentUser(null);
        } else {
            setUsers([...users, user]);
        }
    };

    const editUser = (user) => {
        setCurrentUser(user);
    };

    const deleteUser = (email) => {
        setUsers(users.filter(user => user.email !== email));
        if (currentUser && currentUser.email === email) {
            setCurrentUser(null);
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

        XLSX.writeFile(workbook, 'users.xlsx');
    };

    return (
        <div className="App">
            <UserForm addOrEditUser={addOrEditUser} currentUser={currentUser} />
            <UserList users={users} editUser={editUser} deleteUser={deleteUser} />

            {currentUser && (
        <PDFDownloadLink 
            document={<CV user={currentUser} />} 
            fileName={`${currentUser.Fname}_${currentUser.Lname}_CV.pdf`}
            style={{
                marginTop: '20px',
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
            }}>
            {({ loading }) => 
                loading ? 'Loading CV...' : 'Download CV'
            }
        </PDFDownloadLink>
    )}
            <button 
                onClick={exportToExcel} 
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                Export Users to Excel
            </button>
        </div>
    );
}

export default App;
