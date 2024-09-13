const baseURL = 'https://students-apis.onrender.com';

let students = [];

// Fetch students from the API
async function fetchStudents() {
  try {
    const response = await fetch(`${baseURL}/`);
    students = await response.json();
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

// Create a new student and send it to the API
async function createStudent(student) {
  const {name, dob, address} = student;
  if (name && dob && address) {
    const newStudent = {
      name,
      dob,
      address
    };

    try {
      const response = await fetch(`${baseURL}/addStudent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });

      if (response.ok) {
        console.error('Successfully added student');

      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  }
}

// Update student and send the update to the API
async function updateStudent(index) {
  const student = students[index];
  const updatedName = prompt("Update Student Name:", student.name);
  const updatedDob = prompt("Update Date of Birth:", student.dob);
  const updatedAddress = prompt("Update Address:", student.address);

  if (updatedName && updatedDob && updatedAddress) {
    const updatedStudent = {
      name: updatedName,
      dob: updatedDob,
      address: updatedAddress
    };

    try {
      const response = await fetch(`${baseURL}/updateStudent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: student.name, updateFields: updatedStudent})
      });

      if (response.ok) {
        console.error('Successfully updated student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  }
}


// Delete student from the API
async function deleteStudent(index, name) {
  const student = students[index];
  try {
    const response = await fetch(`${baseURL}/deleteStudentByName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name})
    });

    if (response.ok) {
        console.error('Successfully deleted student');
    }
  } catch (error) {
    console.error('Error deleting student:', error);
  }
}

// Initialize the student list on page load
document.addEventListener('DOMContentLoaded', fetchStudents);
