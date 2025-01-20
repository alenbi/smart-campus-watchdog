// Student data management
let students = [];

// Load students from localStorage or use default data
function loadStudents() {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
    } else {
        // Default data
        students = [
            {
                id: 'STU001',
                name: 'John Doe',
                department: 'Computer Science',
                email: 'john.doe@example.com',
                violations: 0
            }
        ];
        saveStudents();
    }
    renderStudents();
}

// Save students to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Render students grid
function renderStudents() {
    const grid = document.getElementById('studentsGrid');
    if (!grid) return;

    grid.innerHTML = students.map(student => `
        <div class="student-card">
            <div class="student-header">
                <h3>${student.name}</h3>
                <span class="student-id">${student.id}</span>
            </div>
            <div class="student-info">
                <p><strong>Department:</strong> ${student.department}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Violations:</strong> ${student.violations}</p>
            </div>
            <div class="student-actions">
                <button onclick="editStudent('${student.id}')" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteStudent('${student.id}')" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Filter students based on search term
function filterStudents(searchTerm) {
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm) ||
        student.department.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    
    const grid = document.getElementById('studentsGrid');
    if (!grid) return;

    grid.innerHTML = filteredStudents.map(student => `
        <div class="student-card">
            <div class="student-header">
                <h3>${student.name}</h3>
                <span class="student-id">${student.id}</span>
            </div>
            <div class="student-info">
                <p><strong>Department:</strong> ${student.department}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Violations:</strong> ${student.violations}</p>
            </div>
            <div class="student-actions">
                <button onclick="editStudent('${student.id}')" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteStudent('${student.id}')" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Modal management
function openAddStudentModal() {
    const modal = document.getElementById('addStudentModal');
    modal.classList.add('active');
}

function closeAddStudentModal() {
    const modal = document.getElementById('addStudentModal');
    modal.classList.remove('active');
}

// Form handling
const addStudentForm = document.getElementById('addStudentForm');
if (addStudentForm) {
    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newStudent = {
            id: document.getElementById('studentId').value,
            name: document.getElementById('studentName').value,
            department: document.getElementById('department').value,
            email: document.getElementById('email').value,
            violations: 0
        };
        
        students.push(newStudent);
        saveStudents();
        renderStudents();
        closeAddStudentModal();
        showNotification('Student added successfully');
        addStudentForm.reset();
    });
}

// Delete student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(student => student.id !== id);
        saveStudents();
        renderStudents();
        showNotification('Student deleted successfully');
    }
}

// Edit student
function editStudent(id) {
    // Implement edit functionality
    console.log('Edit student:', id);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadStudents);