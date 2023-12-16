import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import './Components/Student.css';
import AddStudent from './Components/AddStudent';
import Student from './Components/Student';

function App() {
  // React Hook
  const [allStudents, setAllStudents]     = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords]           = useState('');
  const [gradYear, setGradYear]           = useState('');

  // Seed Data
  const students = [{
    id:nanoid(),
    firstName: 'Queenie',
    lastName: 'Pirot',
    email: 'qpirot0@canalblog.com',
    image: 'images/student1.jpg',
    gradYear: 2020
  }, {
    id:nanoid(),
    firstName: 'Vladimir',
    lastName: 'Bessom',
    email: 'vbessom1@instagram.com',
    image: 'images/student2.jpg',
    gradYear: 2020
  }, {
    id:nanoid(),
    firstName: 'Margret',
    lastName: 'MacAlester',
    email: 'mmacalester2@noaa.gov',
    image: 'images/student3.jpg',
    gradYear: 2021
  }, {
    id:nanoid(),
    firstName: 'Daphna',
    lastName: 'Dumbelton',
    email: 'ddumbelton3@kickstarter.com',
    image: 'images/student4.jpg',
    gradYear: 2021
  }, {
    id:nanoid(),
    firstName: 'Haywood',
    lastName: 'Minchinton',
    email: 'hminchinton4@youku.com',
    image: 'images/student5.jpg',
    gradYear: 2022
  }, {
    id:nanoid(),
    firstName: 'Waylon',
    lastName: 'Terzza',
    email: 'wterzza5@arizona.edu',
    image: 'images/student6.jpg',
    gradYear: 2022
  }, {
    id:nanoid(),
    firstName: 'Lucinda',
    lastName: 'Christiensen',
    email: 'lchristiensen6@surveymonkey.com',
    image: 'images/student7.jpg',
    gradYear: 2023
  }, {
    id:nanoid(),
    firstName: 'Jose',
    lastName: 'Dinneen',
    email: 'jdinneen7@de.vu',
    image: 'images/student8.jpg',
    gradYear: 2023
  }, {
    id:nanoid(),
    firstName: 'Mag',
    lastName: 'Sisse',
    email: 'msisse8@cbc.ca',
    image: 'images/student9.jpg',
    gradYear: 2024
  }, {
    id:nanoid(),
    firstName: 'Isis',
    lastName: 'Usborn',
    email: 'iusborn9@tumblr.com',
    image: 'images/student10.jpg',
    gradYear: 2024
  }]

  useEffect(() => {
    saveStudents(students);
  }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
  };

  const searchStudents = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if (gradYear) {
      keywordsArray.push(gradYear.toString());
    }

    if (keywordsArray.length > 0) {
      const searchResults = allStudents.filter((student) => {
        for (const word of keywordsArray) {
          if (student.firstName.toLowerCase().includes(word) || 
              student.lastName.toLowerCase().includes(word)  || 
              student.gradYear === parseInt(word)) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allStudents);
    }
  };

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  };

  const removeStudent = (studentToDelete) => {
    const updatedStudentsArray = allStudents.filter((student) => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  };

  const updateStudent = (updatedStudent) => {
    const updatedStudentsArray = allStudents.map((student) => student.id === updatedStudent.id ? {...student, ...updatedStudent} : student);
    saveStudents(updatedStudentsArray);
  };

  return (
    <div className='container'>
      <div className='row' id='students'>
      <h3 id='studentsHeader'>Students</h3>
        {searchResults && searchResults.map((student) => (
        <div className='col-lg-2' key={student.id}>
          <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
        </div>
        ))}
      </div>

      {/* {!allStudents && (<button type='button' className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>
      )} */}

      <AddStudent addStudent={addStudent}/>

      <div className='row mt-4' id='searchStudent'>
        <h3 id='searchStudentHeader'>Search</h3>
        <div className='col-md-4'>
          <label htmlFor='txtKeywords'>Search by First or Last Name: </label>
          <input type='text' className='form-control' placeholder='Name here' onChange={(evt) => setKeywords(evt.currentTarget.value)} value={keywords} />
        </div>
        <div className='col-md-4'>
          <label htmlFor='txtKeywords'>Search by Graduation Year: </label>
          <select className='form-select' value={gradYear} onChange={(evt) => setGradYear(evt.currentTarget.value)}>
            <option value=''>Select Grad Year</option>
            {_(allStudents)
              .map(student => student.gradYear)
              .sort()
              .uniq()
              .map((year) => (<option key={year} value={year}>{year}</option>))
              .value()}
          </select>
        </div>
        <div className='col-md-4 mt-4'>
          <button type='button' className='btn btn-primary' onClick={searchStudents}>Search Students <FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
