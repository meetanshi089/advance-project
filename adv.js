// Firebase configuration
var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxx"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const appointmentsContainer = document.querySelector('.appointments-container');
const form = document.querySelector('.form');
const studentNameInput = document.querySelector('#student-name');
const teacherNameInput = document.querySelector('#teacher-name');
const appointmentTimeInput = document.querySelector('#appointment-time');
const descriptionInput = document.querySelector('#description');

// Function to fetch appointments from Firestore
function fetchAppointments() {
    db.collection('appointments').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            displayAppointment(doc);
        });
    });
}

// Function to display an appointment in the DOM
function displayAppointment(doc) {
    const appointment = doc.data();
    const div = document.createElement('div');
    div.classList.add('appointment');
    div.innerHTML = `
        <h3>Student: ${appointment.studentName}</h3>
        <p>Teacher: ${appointment.teacherName}</p>
        <p>Time: ${appointment.appointmentTime}</p>
        <p>Description: ${appointment.description}</p>
    `;
    appointmentsContainer.appendChild(div);
}

// Function to save a new appointment to Firestore
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newAppointment = {
        studentName: studentNameInput.value,
        teacherName: teacherNameInput.value,
        appointmentTime: appointmentTimeInput.value,
        description: descriptionInput.value
    };

    db.collection('appointments').add(newAppointment).then(() => {
        alert('Appointment added!');
        form.reset();
        appointmentsContainer.innerHTML = ''; // Clear current appointments
        fetchAppointments(); // Fetch and display updated appointments
    }).catch((error) => {
        console.error("Error adding appointment: ", error);
    });
});

// Initial fetch of appointments
fetchAppointments();
