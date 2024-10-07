// Admin Module: Add Teacher
const adminSection = document.getElementById('admin-section');
const addTeacherForm = document.getElementById('add-teacher-form');
const teacherList = document.getElementById('teacher-list');

addTeacherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('teacher-name').value;
    const department = document.getElementById('teacher-department').value;
    const subject = document.getElementById('teacher-subject').value;

    db.collection('teachers').add({
        name,
        department,
        subject
    }).then(() => {
        console.log('Teacher added');
        fetchTeachers();
    }).catch((error) => {
        console.error('Error adding teacher: ', error);
    });
});

function fetchTeachers() {
    db.collection('teachers').get().then((querySnapshot) => {
        teacherList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            teacherList.innerHTML += `<p>${doc.data().name} - ${doc.data().department} - ${doc.data().subject}</p>`;
        });
    });
}

// Call this function when admin logs in
fetchTeachers();

// Teacher Module: View and Approve Appointments
const teacherSection = document.getElementById('teacher-section');
const teacherAppointments = document.getElementById('teacher-appointments');

function fetchTeacherAppointments() {
    const teacherId = auth.currentUser.uid; // Assuming teacher logged in
    db.collection('appointments').where('teacherId', '==', teacherId).get()
        .then((querySnapshot) => {
            teacherAppointments.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                teacherAppointments.innerHTML += `
                    <p>Student: ${data.studentId}, Time: ${data.time}, Message: ${data.message}
                    <button onclick="approveAppointment('${doc.id}')">Approve</button>
                    <button onclick="cancelAppointment('${doc.id}')">Cancel</button>
                    </p>
                `;
            });
        });
}

function approveAppointment(appointmentId) {
    db.collection('appointments').doc(appointmentId).update({ status: 'approved' })
        .then(() => console.log('Appointment approved'))
        .catch((error) => console.error('Error approving appointment: ', error));
}

function cancelAppointment(appointmentId) {
    db.collection('appointments').doc(appointmentId).delete()
        .then(() => console.log('Appointment cancelled'))
        .catch((error) => console.error('Error cancelling appointment: ', error));
}

// Student Module: Book Appointment
const studentSection = document.getElementById('student-section');
const bookAppointmentForm = document.getElementById('book-appointment-form');
const teacherSelect = document.getElementById('teacher-select');
const appointmentTime = document.getElementById('appointment-time');
const appointmentMessage = document.getElementById('appointment-message');

// Fetch teachers for the dropdown
function fetchTeachersForAppointment() {
    db.collection('teachers').get().then((querySnapshot) => {
        teacherSelect.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = doc.data().name;
            teacherSelect.add(option);
        });
    });
}

// Book Appointment
bookAppointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const teacherId = teacherSelect.value;
    const time = appointmentTime.value;
    const message = appointmentMessage.value;

    db.collection('appointments').add({
        teacherId,
        time,
        message,
        studentId: auth.currentUser.uid
    }).then(() => {
        console.log('Appointment booked');
    }).catch((error) => {
        console.error('Error booking appointment: ', error);
    });
});

// Fetch teachers for student booking
fetchTeachersForAppointment();

// Authentication
const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('login-form');
const registerBtn = document.getElementById('register-btn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Logged in:', userCredential.user);
            loadDashboard(); // Load respective dashboard (admin, teacher, or student)
        })
        .catch((error) => console.error('Error logging in: ', error));
});

//Authentication module
registerBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Registered:', userCredential.user);
            loadDashboard();
        })
        .catch((error) => console.error('Error registering: ', error));
});

function loadDashboard() {
    const user = auth.currentUser;
    // Show respective dashboard based on user role
    // E.g., adminSection.style.display = 'block';
}
