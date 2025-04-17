import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";



const firebaseConfig = {
    databaseURL:"https://notetrackerapp-default-rtdb.firebaseio.com/"

}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'notes/');

// Add an event listener for the "Start Taking Notes" button
document.getElementById("startButton").addEventListener("click", () => {
    // Show a popup or modal for taking notes
    const notePopup = document.getElementById("noteContainer");
    if (notePopup) {
        notePopup.style.display = "block"; // Show the popup
    } else {
        alert("Start taking notes!");
    }
});

// Optional: Add an event listener to close the popup
document.getElementById("saveButton").addEventListener("click", () => {
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteInput").value = "";
        
        noteContainer.style.display = "none";
});

document.getElementById("clearButton").addEventListener("click", () => {
    noteInput.value = ""; // Clear the text area  
});

document.getElementById("viewNotesButton").addEventListener("click", () => {
    const notePopup = document.getElementById("savedNotesContainer");
    if (notePopup) {
        notePopup.style.display = "block"; // Show the popup
    }
});
