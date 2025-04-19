import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set,push, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";



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
    const noteTitle = document.getElementById("noteTitle").value.trim(); // Get and trim the title input
    const noteInput = document.getElementById("noteInput").value.trim(); // Get and trim the note input

    // Validation: Ensure both fields are filled
    if (!noteTitle || !noteInput) {
        alert("Please fill in both the title and the note content before saving.");
        return; // Stop execution if validation fails
    }

    const id = push(dbRef).key; // Generate a unique key for the note
    const noteData = {
        title: noteTitle,
        content: noteInput,
    };

    set(ref(db, 'notes/' + id), noteData)
        .then(() => {
            console.log("Note saved successfully!");

            // Clear the input fields after saving
            document.getElementById("noteTitle").value = "";
            document.getElementById("noteInput").value = "";

            // Optionally, close the popup after saving
            const notePopup = document.getElementById("noteContainer");
            if (notePopup) {
                notePopup.style.display = "none"; // Hide the popup
            }
        })
        .catch((error) => {
            console.error("Error saving note:", error);
        });
});

document.getElementById("clearButton").addEventListener("click", () => {
    const noteTitle = document.getElementById("noteTitle");
    const noteInput = document.getElementById("noteInput");
    if (noteTitle && noteInput) {
        noteTitle.value = ""; // Clear the title input
        noteInput.value = ""; // Clear the text area
    } else {
        console.error("Input fields not found.");
    }
});

document.getElementById("closeButton").addEventListener("click", () => {
    const notePopup = document.getElementById("noteContainer");
    if (notePopup) {
        notePopup.style.display = "none"; // Hide the popup
    }
});

document.getElementById("viewNotesButton").addEventListener("click", () => {
    const notePopup = document.getElementById("savedNotesContainer");
    if (notePopup) {
        notePopup.style.display = "block"; // Show the popup
    }

    const notesList = document.getElementById("notesList");
    if (notesList) {
        notesList.innerHTML = ""; // Clear the list before displaying new notes

        onValue(dbRef, (snapshot) => {
            const notes = snapshot.val();
            if (notes) {
                Object.keys(notes).forEach((key) => {
                    const note = notes[key];
                    const li = document.createElement("li");
                    li.className = "note-item";
                    li.textContent = `${note.title}: ${note.content}`;
                    notesList.appendChild(li); // Append each note to the list
                });
            } else {
                notesList.innerHTML = "<li>No saved notes found.</li>";
            }
        }, (error) => {
            console.error("Error fetching notes:", error);
            alert("Failed to load notes. Please try again.");
        });
    } else {
        console.error("Notes list element not found.");
    }
});

document.getElementById("deleteNotesButton").addEventListener("click", () => {
    console.log("Delete button clicked");
    const deleteContainer = document.getElementById("deleteConfirmation");
    if (deleteContainer) {
        deleteContainer.style.display = "block"; // Show the confirmation popup
    } else {
        console.error("Delete confirmation container not found.");
    }
});

document.getElementById("confirmDeleteButton").addEventListener("click", () => {
    // Delete all notes from Firebase
    set(ref(db, 'notes/'), null)
        .then(() => {
            alert("All notes have been deleted.");
            const deleteContainer = document.getElementById("deleteConfirmation");
            if (deleteContainer) {
                deleteContainer.style.display = "none"; // Hide the popup
            }
        })
        .catch((error) => {
            console.error("Error deleting notes:", error);
        });
});

document.getElementById("cancelDeleteButton").addEventListener("click", () => {
    const deleteContainer = document.getElementById("deleteConfirmation");
    if (deleteContainer) {
        deleteContainer.style.display = "none"; // Hide the popup
    }
});
