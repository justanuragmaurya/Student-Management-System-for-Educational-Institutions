document.addEventListener('DOMContentLoaded', function() {
    const students = [
      'Hermione Granger',
      'Harry Potter',
      'Ron Weasley',
      'Luna Lovegood',
      'Neville Longbottom',
      'Ginny Weasley',
      'Draco Malfoy',
      'Cho Chang',
      'Seamus Finnigan',
      'Padma Patil'
    ];
  
    let presentStudents = [];
    let absentStudents = [];
  
    // Check local storage for attendance data
    if (localStorage.getItem('presentStudents')) {
      presentStudents = JSON.parse(localStorage.getItem('presentStudents'));
      absentStudents = students.filter(student => !presentStudents.includes(student));
    } else {
      absentStudents = [...students];
    }
  
    const presentList = document.getElementById('presentList');
    const absentList = document.getElementById('absentList');
  
    function updateLists() {
      presentList.innerHTML = '';
      absentList.innerHTML = '';
  
      presentStudents.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = student;
        presentList.appendChild(listItem);
      });
  
      absentStudents.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = student;
        absentList.appendChild(listItem);
      });
    }
  
    updateLists();
  
    document.getElementById('markAttendanceBtn').addEventListener('click', function() {
      let attendanceHTML = '<h2>Mark Attendance</h2><ul>';
      students.forEach(student => {
        attendanceHTML += `<li>${student}<input type="checkbox" class="attendance-checkbox" data-name="${student}"></li>`;
      });
      attendanceHTML += '</ul><button id="saveAttendanceBtn" class="save-attendance-btn">Save Attendance</button>';
  
      const popup = window.open('', 'Attendance', 'width=400, height=400');
      popup.document.body.innerHTML = attendanceHTML;
  
      const saveBtn = popup.document.getElementById('saveAttendanceBtn');
      saveBtn.addEventListener('click', function() {
        const checkboxes = popup.document.querySelectorAll('.attendance-checkbox');
        presentStudents = [];
        checkboxes.forEach(checkbox => {
          const studentName = checkbox.getAttribute('data-name');
          if (checkbox.checked) {
            presentStudents.push(studentName);
          }
        });
  
        absentStudents = students.filter(student => !presentStudents.includes(student));
  
        localStorage.setItem('presentStudents', JSON.stringify(presentStudents));
        updateLists();
        popup.close();
      });
    });
  });
  