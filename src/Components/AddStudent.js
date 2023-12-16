import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './AddStudent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function AddStudent(props) {
    // React Hooks
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [gradYear, setGradYear] = useState('');

    const doWork = () => {
        const newStudent = {
            id:nanoid(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: URL.createObjectURL(selectedFile),
            gradYear: parseInt(gradYear)
        };

        props.addStudent(newStudent);
    };

    const imageUpdate = (evt) => {
        setSelectedFile(evt.target.files[0]);
    }

    return (
        <div className='row mt-4' id='addStudent'>
            <h3 id='addStudentHeader'>Add Student</h3>
            <div className='col-md-2'>
                <label htmlFor='txtFirstName' className='form-label'>First Name:</label>
                <input type='text' id='txtFirstName' placeholder='First Name' className='form-control' onChange={(evt) => setFirstName(evt.currentTarget.value)} value={firstName}/>
            </div>
            <div className='col-md-2'>
                <label htmlFor='txtLastName' className='form-label'>Last Name:</label>
                <input type='text' id='txtLastName' placeholder='Last Name' className='form-control' onChange={(evt) => setLastName(evt.currentTarget.value)} value={lastName}/>
            </div>
            <div className='col-md-2'>
                <label htmlFor='txtEmail' className='form-label'>Email Address:</label>
                <input type='email' id='txtEmail' placeholder='Email Address' className='form-control' onChange={(evt) => setEmail(evt.currentTarget.value)} value={email}/>
            </div>
            <div className='col-md-2'>
                <label htmlFor='txtGradyear' className='form-label'>Graduation Year:</label>
                <input type='text' id='txtGradYear' placeholder='Graduation Year' className='form-control' onChange={(evt) => setGradYear(evt.currentTarget.value)} value={gradYear}/>
            </div>
            <div className='col-md-2'>
                <label htmlFor='fileUpload' className='form-label'>Student Image:</label>
                <input type='file' name='file' id='fileUpload' onChange={imageUpdate} />
            </div>
            <div className='col-md-2 mt-4'>
                <button type='button' id='btnAdd' className='btn btn-success' onClick={doWork}>Add <FontAwesomeIcon icon={faPlusCircle} /></button>
            </div>
        </div>
    )
}

export default AddStudent;