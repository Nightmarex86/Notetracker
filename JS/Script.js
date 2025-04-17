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
    const notePopup = document.getElementById("noteContainer");
    const noteTitle = document.getElementById("noteTitle").value; // Get the title input
    const noteContent = document.getElementById("noteInput").value; // Get the content input

    if (noteTitle && noteContent) {
        // Save the note to Firebase
        const newNoteRef = ref(db, 'notes/'); // Use a timestamp as a unique key
        set(newNoteRef, {
            title: noteTitle,
            content: noteContent,

        }).then(() => {
            alert("Note saved successfully!");
        }).catch((error) => {
            console.error("Error saving note:", error);
            alert("Failed to save the note. Please try again.");
        });

        // Clear the inputs and hide the popup
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteInput").value = "";
        if (notePopup) {
            notePopup.style.display = "none";
        }
    } else {
        alert("Please fill in both the title and content before saving.");
    }
});

document.getElementById("clearButton").addEventListener("click", () => {
    noteInput.value = ""; // Clear the text area  
});

document.getElementById("viewNotesButton").addEventListener("click", () => {
    const notePopup = document.getElementById("savedNotesContainer");
    if (notePopup) {
        notePopup.style.display = "block"; // Show the popup

        // Fetch notes from Firebase in real-time
        onValue(dbRef, (snapshot) => {
            const notes = snapshot.val();
            const notesList = document.getElementById("notesList");

            if (notesList) {
                notesList.innerHTML = ""; // Clear the list before adding new notes

                if (notes) {
                    Object.keys(notes).forEach((key) => {
                        const note = notes[key];
                        const li = document.createElement("li");
                        li.textContent = `${note.title}: ${note.content}`;
                        notesList.appendChild(li);
                    });
                } else {
                    notesList.innerHTML = "<li>No saved notes found.</li>";
                }
            } else {
                console.error("Notes list element not found.");
            }
        }, (error) => {
            console.error("Error fetching notes:", error);
            alert("Failed to load notes. Please try again.");
        });
    } else {
        console.error("Saved notes container not found.");
    }
});
