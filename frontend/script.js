const API_URL = "http://localhost:3000/students";

// Load students and render table
async function loadStudents() {
    const res = await fetch(API_URL);
    const students = await res.json();
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    students.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.age}</td>
                <td>${s.course}</td>
                <td>
                    <button onclick="openEditModal('${s._id}')">Edit</button>
                    <button onclick="deleteStudent('${s._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

loadStudents();

// --- Add Modal ---
document.getElementById("openAddBtn").addEventListener("click", () => {
    document.getElementById("addModal").style.display = "flex";
});

function closeAddModal() {
    document.getElementById("addModal").style.display = "none";
}

document.getElementById("studentForm").addEventListener("submit", async e => {
    e.preventDefault();
    const student = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value
    };
    await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(student) });
    document.getElementById("studentForm").reset();
    closeAddModal();
    loadStudents();
});

// --- Edit Modal ---
async function openEditModal(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const student = await res.json();
    document.getElementById("editId").value = student._id;
    document.getElementById("editName").value = student.name;
    document.getElementById("editAge").value = student.age;
    document.getElementById("editCourse").value = student.course;
    document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

document.getElementById("editStudentForm").addEventListener("submit", async e => {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const updated = {
        name: document.getElementById("editName").value,
        age: document.getElementById("editAge").value,
        course: document.getElementById("editCourse").value
    };
    await fetch(`${API_URL}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    closeEditModal();
    loadStudents();
});

// --- Delete ---
async function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadStudents();
}
