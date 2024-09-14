document.addEventListener('DOMContentLoaded', async function() {
  renderStudents();
});

let _students = [];

    async function addStudent() {
      const name = document.getElementById('studentName').value;
      const dob = document.getElementById('dob').value;
      const address = document.getElementById('address').value;
      try {
        if (studentName && dob && address) {
            const student = {
              name,
              dob,
              address
            };
            await createStudent(student)
            document.getElementById('studentName').value = '';
            document.getElementById('dob').value = '';
            document.getElementById('address').value = '';
            renderStudents();
        }
      } catch (error) {
        console.log("Error", error)
      }
             
    }

    async function renderStudents() {
      try {
        _students = await fetchStudents();
        
        const studentList = document.getElementById('studentList');
        studentList.innerHTML = ''; 

        _students.forEach((student, index) => {
            studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.address}</td>
                <td style="display: flex; align-items: center;">
                    <button onclick="updateStudent(${index})" class="btn btn-sm--lg me-2">
                        <i class="fas fa-edit"></i> 
                    </button>
                    <div style="height:20px; width:1px; background-color:#ccc; margin: 0 4px;"></div>
                    <button onclick="confirmDeleteStudent(${index})" class="btn btn-sm btn-danger ms-1">
                        <i class="fas fa-trash-alt"></i> 
                    </button>
                </td>
            </tr>
            `;
        });
      } catch (error) {
        
      }
      
    }

    async function updateStudent(index) {
      await updateStudent(index)
      renderStudents();
    }
    
    function confirmDeleteStudent(index) {
        const isConfirmed = confirm("Are you sure you want to delete this student?");
        if (isConfirmed) {
          deleteStudent(index);
          renderStudents();
        }
    }