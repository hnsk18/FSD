document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const addStudentForm = document.getElementById('add-student-form');
    const editStudentForm = document.getElementById('edit-student-form');
    const studentsTableBody = document.getElementById('students-table-body');
    const registerMessageBox = document.getElementById('form-message');
    const loginMessageBox = document.getElementById('login-message');
    const studentMessageBox = document.getElementById('student-message');
    const logoutPage = document.getElementById('logout');
    const profileContainer = document.getElementById('profile-container');
    const profileName = document.getElementById('profile-name');
    const profileRoll = document.getElementById('profile-roll');
    const profileCgpa = document.getElementById('profile-cgpa');
    const profileBranch = document.getElementById('profile-branch');
    const profileAge = document.getElementById('profile-age');
    const profileGrade = document.getElementById('profile-grade');
    const profileCreated = document.getElementById('profile-created');
    const profileEditButton = document.getElementById('profile-edit');
    const profileDeleteButton = document.getElementById('profile-delete');

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const usersKey = 'smsUsers';
    const studentsKey = 'smsStudents';

    function migrateStudentData() {
        const storedStudents = localStorage.getItem(studentsKey);
        if (!storedStudents) {
            return;
        }

        try {
            const students = JSON.parse(storedStudents);
            const users = getStoredUsers();

            students.forEach((student) => {
                if (!users.some((user) => String(user.id) === String(student.id))) {
                    users.push({
                        id: student.id,
                        name: student.name || '',
                        roll_number: student.roll_number || '',
                        cgpa: student.cgpa || '',
                        branch: student.branch || '',
                        username: student.username || student.roll_number || `user${student.id}`,
                        password: student.password || '',
                        age: student.age || 0,
                        grade: student.grade || 'N/A',
                        registeredAt: student.createdAt || new Date().toISOString(),
                        createdAt: student.createdAt || new Date().toISOString(),
                    });
                }
            });

            localStorage.setItem(usersKey, JSON.stringify(users));
            localStorage.removeItem(studentsKey);
        } catch (error) {
            console.error('Failed to migrate student storage:', error);
        }
    }

    function showMessage(messageElement, text, isError = true) {
        if (!messageElement) {
            alert(text);
            return;
        }
        messageElement.textContent = text;
        messageElement.style.color = isError ? 'crimson' : 'green';
    }

    function getStoredUsers() {
        try {
            const stored = localStorage.getItem(usersKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    }

    function saveUser(user) {
        const users = getStoredUsers();
        users.push(user);
        localStorage.setItem(usersKey, JSON.stringify(users));
    }

    function loginUser(username, password) {
        const users = getStoredUsers();
        return users.find(
            (user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password
        );
    }

    function getLoggedInUser() {
        try {
            return JSON.parse(localStorage.getItem('loggedInUser')) || null;
        } catch (error) {
            return null;
        }
    }


    migrateStudentData();

    function requireLogin() {
        const protectedPages = ['dashboard.html', 'addstd.html', 'viewstd.html', 'editstd.html', 'profile.html'];
        const authPages = ['login.html', 'register.html'];
        const loggedInUser = getLoggedInUser();

        if (currentPage === 'logout.html') {
            localStorage.removeItem('loggedInUser');
            return true;
        }

        if (protectedPages.includes(currentPage)) {
            if (!loggedInUser) {
                alert('Please log in to access this page.');
                window.location.href = 'login.html';
                return false;
            }
            return true;
        }

        if (authPages.includes(currentPage) && loggedInUser) {
            alert('You are already logged in.');
            window.location.href = 'dashboard.html';
            return false;
        }

        return true;
    }

    if (!requireLogin()) {
        return;
    }

    function getStoredStudents() {
        return getStoredUsers();
    }

    function saveStudents(students) {
        localStorage.setItem(usersKey, JSON.stringify(students));
    }

    function saveStudent(student) {
        saveUser(student);
    }

    function getStudentById(id) {
        const students = getStoredStudents();
        return students.find((student) => String(student.id) === String(id));
    }

    function updateStudentById(id, updatedFields) {
        const students = getStoredStudents();
        const index = students.findIndex((student) => String(student.id) === String(id));
        if (index === -1) {
            return false;
        }
        students[index] = { ...students[index], ...updatedFields };
        saveStudents(students);
        return true;
    }

    function deleteStudentById(id) {
        const students = getStoredStudents();
        const filtered = students.filter((student) => String(student.id) !== String(id));
        saveStudents(filtered);
    }

    function generateStudentId() {
        const students = getStoredStudents();
        if (!students.length) {
            return 1;
        }
        return Math.max(...students.map((student) => Number(student.id) || 0)) + 1;
    }

    function renderStudentsTable() {
        if (!studentsTableBody) {
            return;
        }

        const students = getStoredStudents();
        if (students.length === 0) {
            studentsTableBody.innerHTML = '<tr><td colspan="5">No students found.</td></tr>';
            return;
        }

        studentsTableBody.innerHTML = students
            .map(
                (student) => `
                    <tr class="student-row" data-id="${student.id}">
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.roll_number || ''}</td>
                        <td>${student.age}</td>
                        <td>${student.grade}</td>
                    </tr>`
            )
            .join('');

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', function () {
                const studentId = this.dataset.id;
                deleteStudentById(studentId);
                renderStudentsTable();
                if (studentMessageBox) {
                    showMessage(studentMessageBox, 'Student deleted successfully.', false);
                }
            });
        });
    }

    const studentsTable = document.querySelector('table');
    if (studentsTable) {
        studentsTable.addEventListener('click', (e) => {
            const row = e.target.closest('.student-row');
            if (!row) {
                return;
            }
            if (e.target.closest('button')) {
                return;
            }
            window.location.href = `profile.html?id=${row.dataset.id}`;
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const values = {
                name: document.getElementById('name').value.trim(),
                roll_number: document.getElementById('roll_number').value.trim(),
                cgpa: document.getElementById('cgpa').value.trim(),
                branch: document.getElementById('branch').value,
                username: document.getElementById('username').value.trim(),
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirm_password').value,
            };

            const errors = [];
            if (!values.name || values.name.length < 3) {
                errors.push('Name must be at least 3 characters.');
            }
            if (!values.roll_number || !/^\d{1,10}$/.test(values.roll_number)) {
                errors.push('Roll Number must contain only digits.');
            }
            const cgpaValue = parseFloat(values.cgpa);
            if (Number.isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
                errors.push('CGPA must be a number between 0 and 10.');
            }
            if (!values.branch) {
                errors.push('Please select a branch.');
            }
            if (!values.username || values.username.length < 4) {
                errors.push('Username must be at least 4 characters.');
            }
            if (!values.password || values.password.length < 6) {
                errors.push('Password must be at least 6 characters.');
            }
            if (values.password !== values.confirmPassword) {
                errors.push('Passwords do not match.');
            }

            if (errors.length > 0) {
                showMessage(registerMessageBox, errors.join(' '));
                return;
            }

            const existingUsers = getStoredUsers();
            if (existingUsers.some((user) => user.username.toLowerCase() === values.username.toLowerCase())) {
                showMessage(registerMessageBox, 'This username is already taken. Please choose another.');
                return;
            }
            if (existingUsers.some((user) => user.roll_number === values.roll_number)) {
                showMessage(registerMessageBox, 'A user with this Roll Number already exists.');
                return;
            }

            saveUser({
                id: generateStudentId(),
                name: values.name,
                roll_number: values.roll_number,
                cgpa: values.cgpa,
                branch: values.branch,
                username: values.username,
                password: values.password,
                age: 0,
                grade: 'N/A',
                registeredAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            });

            showMessage(registerMessageBox, 'Registration successful! Redirecting to login...', false);
            registerForm.reset();

            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1200);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) {
                showMessage(loginMessageBox, 'Please enter both username and password.');
                return;
            }

            const user = loginUser(username, password);
            if (!user) {
                showMessage(loginMessageBox, 'Invalid username or password.');
                return;
            }

            localStorage.setItem('loggedInUser', JSON.stringify({
                id: user.id,
                username: user.username,
                name: user.name,
                roll_number: user.roll_number,
                branch: user.branch,
                loggedAt: new Date().toISOString(),
            }));

            showMessage(loginMessageBox, 'Login successful! Redirecting...', false);
            loginForm.reset();

            setTimeout(function () {
                window.location.href = 'dashboard.html';
            }, 900);
        });
    }

    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const rollNumber = document.getElementById('roll_number').value.trim();
            const cgpa = document.getElementById('cgpa').value.trim();
            const branch = document.getElementById('branch').value;
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            const age = document.getElementById('age').value.trim();
            const grade = document.getElementById('grade').value.trim();

            const errors = [];
            if (!name || name.length < 3) {
                errors.push('Name must be at least 3 characters.');
            }
            if (!rollNumber || !/^\d{1,10}$/.test(rollNumber)) {
                errors.push('Roll Number must contain only digits.');
            }
            const cgpaValue = parseFloat(cgpa);
            if (Number.isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
                errors.push('CGPA must be a number between 0 and 10.');
            }
            if (!branch) {
                errors.push('Please select a branch.');
            }
            if (!username || username.length < 4) {
                errors.push('Username must be at least 4 characters.');
            }
            if (!password || password.length < 6) {
                errors.push('Password must be at least 6 characters.');
            }
            if (password !== confirmPassword) {
                errors.push('Passwords do not match.');
            }
            if (!age || Number(age) <= 0) {
                errors.push('Age must be a valid positive number.');
            }
            if (!grade) {
                errors.push('Grade is required.');
            }

            const existingUsers = getStoredUsers();
            if (existingUsers.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
                errors.push('This username is already taken. Please choose another.');
            }
            if (existingUsers.some((user) => user.roll_number === rollNumber)) {
                errors.push('A user with this Roll Number already exists.');
            }

            if (errors.length > 0) {
                showMessage(studentMessageBox, errors.join(' '));
                return;
            }

            saveUser({
                id: generateStudentId(),
                name,
                roll_number: rollNumber,
                cgpa,
                branch,
                username,
                password,
                age: Number(age),
                grade,
                registeredAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            });
            showMessage(studentMessageBox, 'Student added successfully.', false);
            addStudentForm.reset();

            setTimeout(function () {
                window.location.href = 'viewstd.html';
            }, 900);
        });
    }

    if (studentsTableBody) {
        renderStudentsTable();
    }

    if (profileContainer) {
        const params = new URLSearchParams(window.location.search);
        const studentId = params.get('id');
        let student = studentId ? getStudentById(studentId) : null;

        if (!student) {
            const loggedUser = getLoggedInUser();
            if (loggedUser) {
                student = getStoredUsers().find(
                    (user) => user.username === loggedUser.username || String(user.id) === String(loggedUser.id)
                );
            }
        }

        if (!student) {
            window.location.href = 'login.html';
            return;
        }

        profileName.textContent = student.name || 'N/A';
        profileRoll.textContent = student.roll_number || 'N/A';
        profileCgpa.textContent = student.cgpa || 'N/A';
        profileBranch.textContent = student.branch || 'N/A';
        profileAge.textContent = student.age || 'N/A';
        profileGrade.textContent = student.grade || 'N/A';
        profileCreated.textContent = student.createdAt ? new Date(student.createdAt).toLocaleString() : 'N/A';

        if (profileEditButton) {
            profileEditButton.addEventListener('click', function () {
                window.location.href = `editstd.html?id=${student.id}`;
            });
        }

        if (profileDeleteButton) {
            profileDeleteButton.addEventListener('click', function () {
                if (confirm('Delete this student?')) {
                    deleteStudentById(student.id);
                    window.location.href = 'viewstd.html';
                }
            });
        }
    }

    if (editStudentForm) {
        const params = new URLSearchParams(window.location.search);
        const studentId = params.get('id');
        let currentStudent = studentId ? getStudentById(studentId) : null;

        if (!currentStudent) {
            const loggedUser = getLoggedInUser();
            if (loggedUser) {
                currentStudent = getStoredUsers().find(
                    (user) => String(user.id) === String(loggedUser.id) || user.username === loggedUser.username || user.roll_number === loggedUser.roll_number
                );
            }
        }

        if (!currentStudent) {
            showMessage(studentMessageBox, 'Student not found.');
            return;
        }

        document.getElementById('student-id').value = currentStudent.id;
        document.getElementById('name').value = currentStudent.name;
        document.getElementById('cgpa').value = currentStudent.cgpa || '';
        document.getElementById('branch').value = currentStudent.branch || '';
        document.getElementById('username').value = currentStudent.username || '';
        document.getElementById('age').value = currentStudent.age;
        document.getElementById('grade').value = currentStudent.grade;
        const rollInput = document.getElementById('roll_number');
        if (rollInput) {
            rollInput.value = currentStudent.roll_number;
        }

        editStudentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const updatedName = document.getElementById('name').value.trim();
            const updatedRollNumberElement = document.getElementById('roll_number');
            const updatedRollNumber = updatedRollNumberElement ? updatedRollNumberElement.value.trim() : currentStudent.roll_number;
            const updatedCgpa = document.getElementById('cgpa').value.trim();
            const updatedBranch = document.getElementById('branch').value;
            const updatedUsername = document.getElementById('username').value.trim();
            const updatedPassword = document.getElementById('password') ? document.getElementById('password').value : '';
            const updatedConfirmPassword = document.getElementById('confirm_password') ? document.getElementById('confirm_password').value : '';
            const updatedAge = document.getElementById('age').value.trim();
            const updatedGrade = document.getElementById('grade').value.trim();

            const errors = [];
            if (!updatedName || updatedName.length < 3) {
                errors.push('Name must be at least 3 characters.');
            }
            if (!updatedRollNumber || !/^\d{1,10}$/.test(updatedRollNumber)) {
                errors.push('Roll Number must contain only digits.');
            }
            const cgpaValue = parseFloat(updatedCgpa);
            if (Number.isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
                errors.push('CGPA must be a number between 0 and 10.');
            }
            if (!updatedBranch) {
                errors.push('Please select a branch.');
            }
            if (!updatedUsername || updatedUsername.length < 4) {
                errors.push('Username must be at least 4 characters.');
            }
            if (updatedPassword || updatedConfirmPassword) {
                if (updatedPassword.length < 6) {
                    errors.push('Password must be at least 6 characters.');
                }
                if (updatedPassword !== updatedConfirmPassword) {
                    errors.push('Passwords do not match.');
                }
            }
            if (!updatedAge || Number(updatedAge) <= 0) {
                errors.push('Age must be a valid positive number.');
            }
            if (!updatedGrade) {
                errors.push('Grade is required.');
            }

            const existingUsers = getStoredUsers();
            if (existingUsers.some((user) => user.username.toLowerCase() === updatedUsername.toLowerCase() && String(user.id) !== String(currentStudent.id))) {
                errors.push('This username is already taken. Please choose another.');
            }
            if (existingUsers.some((user) => user.roll_number === updatedRollNumber && String(user.id) !== String(currentStudent.id))) {
                errors.push('A user with this Roll Number already exists.');
            }

            if (errors.length > 0) {
                showMessage(studentMessageBox, errors.join(' '));
                return;
            }

            const updatedFields = {
                name: updatedName,
                roll_number: updatedRollNumber,
                cgpa: updatedCgpa,
                branch: updatedBranch,
                username: updatedUsername,
                age: Number(updatedAge),
                grade: updatedGrade,
            };
            if (updatedPassword) {
                updatedFields.password = updatedPassword;
            }

            updateStudentById(studentId, updatedFields);
            showMessage(studentMessageBox, 'Student updated successfully.', false);

            setTimeout(function () {
                window.location.href = 'viewstd.html';
            }, 900);
        });
    }
});
