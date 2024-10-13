import { useState, useEffect } from 'react';

const UserForm = ({ addOrEditUser, currentUser }) => {
    const [user, setUser] = useState({
        Fname: '', Lname: '', email: '', Adresse: '', Tel: '', Permis: '',
        Skills: '', Experience: [{ title: '', company: '', years: '' }], Formations: [{ degree: '', school: '', years: '' }],
        Photo: ''
    });

    useEffect(() => {
        if (currentUser) {
            setUser({
                ...currentUser,
                Experience: currentUser.Experience || [{ title: '', company: '', years: '' }],
                Formations: currentUser.Formations || [{ degree: '', school: '', years: '' }],
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUser({ ...user, Photo: file });
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newExperience = [...user.Experience];
        newExperience[index][name] = value;
        setUser({ ...user, Experience: newExperience });
    };

    const handleFormationChange = (index, e) => {
        const { name, value } = e.target;
        const newFormations = [...user.Formations];
        newFormations[index][name] = value;
        setUser({ ...user, Formations: newFormations });
    };

    const addExperienceField = () => {
        setUser({ ...user, Experience: [...user.Experience, { title: '', company: '', years: '' }] });
    };

    const removeExperienceField = (index) => {
        const newExperience = [...user.Experience];
        newExperience.splice(index, 1);
        setUser({ ...user, Experience: newExperience });
    };

    const addFormationField = () => {
        setUser({ ...user, Formations: [...user.Formations, { degree: '', school: '', years: '' }] });
    };

    const removeFormationField = (index) => {
        const newFormations = [...user.Formations];
        newFormations.splice(index, 1);
        setUser({ ...user, Formations: newFormations });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrEditUser(user);
        setUser({
            Fname: '', Lname: '', email: '', Adresse: '', Tel: '', Permis: '',
            Skills: '', Experience: [{ title: '', company: '', years: '' }], Formations: [{ degree: '', school: '', years: '' }],
            Photo: ''
        });
    };

    const formStyle = {
        width: '50%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
        marginTop: '10px',
    };

    const labelStyle = {
        fontSize: '16px',
        marginBottom: '5px',
        display: 'block',
        color: '#333',
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#333',
    };

    const removeButtonStyle = {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '5px',
    };

    return (
        <div style={formStyle}>
            <h1 style={headerStyle}>Contact Information</h1>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>First name:</label>
                <input
                    type="text"
                    name="Fname"
                    value={user.Fname}
                    onChange={handleChange}
                    placeholder="First name"
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Last name:</label>
                <input
                    type="text"
                    name="Lname"
                    value={user.Lname}
                    onChange={handleChange}
                    placeholder="Last name"
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Address:</label>
                <input
                    type="text"
                    name="Adresse"
                    value={user.Adresse}
                    onChange={handleChange}
                    placeholder="Address"
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Phone number:</label>
                <input
                    type="tel"
                    name="Tel"
                    value={user.Tel}
                    onChange={handleChange}
                    placeholder="Phone number"
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Driver's License:</label>
                Oui
                <input
                    type="radio"
                    name="Permis"
                    value="Oui"
                    checked={user.Permis === "Oui"}
                    onChange={handleChange}
                    required
                />
                Non
                <input
                    type="radio"
                    name="Permis"
                    value="Non"
                    checked={user.Permis === "Non"}
                    onChange={handleChange}
                    required
                />

                <label style={labelStyle}>Skills:</label>
                <textarea
                    name="Skills"
                    value={user.Skills}
                    onChange={handleChange}
                    placeholder="Skills"
                    rows="4"
                    style={inputStyle}
                    required
                />

                <h3>Experiences</h3>
                {Array.isArray(user.Experience) && user.Experience.map((experience, index) => (
                    <div key={index}>
                        <label style={labelStyle}>Job Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={experience.title}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Job Title"
                            style={inputStyle}
                        />

                        <label style={labelStyle}>Company:</label>
                        <input
                            type="text"
                            name="company"
                            value={experience.company}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Company"
                            style={inputStyle}
                        />

                        <label style={labelStyle}>Years:</label>
                        <input
                            type="text"
                            name="years"
                            value={experience.years}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Years"
                            style={inputStyle}
                        />

                        {user.Experience.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeExperienceField(index)}
                                style={removeButtonStyle}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addExperienceField} style={buttonStyle}>Add Experience</button>

                <h3>Formations</h3>
                {Array.isArray(user.Formations) && user.Formations.map((formation, index) => (
                    <div key={index}>
                        <label style={labelStyle}>Degree:</label>
                        <input
                            type="text"
                            name="degree"
                            value={formation.degree}
                            onChange={(e) => handleFormationChange(index, e)}
                            placeholder="Degree"
                            style={inputStyle}
                        />

                        <label style={labelStyle}>School:</label>
                        <input
                            type="text"
                            name="school"
                            value={formation.school}
                            onChange={(e) => handleFormationChange(index, e)}
                            placeholder="School"
                            style={inputStyle}
                        />

                        <label style={labelStyle}>Years:</label>
                        <input
                            type="text"
                            name="years"
                            value={formation.years}
                            onChange={(e) => handleFormationChange(index, e)}
                            placeholder="Years"
                            style={inputStyle}
                        />

                        {user.Formations.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeFormationField(index)}
                                style={removeButtonStyle}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addFormationField} style={buttonStyle}>Add Formation</button>

                <label style={labelStyle}>Upload your photo:</label>
                <input
                    type="file"
                    name="Photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={inputStyle}
                    required
                />

                <button type="submit" style={buttonStyle}>Save</button>
            </form>
        </div>
    );
};

export default UserForm;
