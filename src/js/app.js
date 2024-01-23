import '../css/style.css';
import { openDB, getAllStudents, addStudent } from './db.js';

window.onload = async () => {
    try {
        // Open the database
        const db = await openDB();

        // Get all students from the database
        const students = await getAllStudents(db);
        console.log('All Students:', students);

        // Example: Add a new student to the database
        const newStudent = { name: 'John Doe', age: 20, grade: 'A' };
        const addedStudentId = await addStudent(db, newStudent);
        console.log('Added Student ID:', addedStudentId);
    } catch (error) {
        console.error('Error opening database:', error);
    }
};
// Get the modal element
const modal = document.getElementById('addStudentModal');

// Get the button that opens the modal
const addStudentBtn = document.getElementById('addStudentBtn');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
addStudentBtn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// You can also close the modal when the form is submitted
const addStudentForm = document.getElementById('addStudentForm');

addStudentForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // Perform your add student logic here
  // ...
  // Close the modal
  modal.style.display = 'none';
});






