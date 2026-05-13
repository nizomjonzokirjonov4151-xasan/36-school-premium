import {
auth,
db
}
from "./firebase.js";

import {
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
query,
where
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
ELEMENTS
========================= */

const loginPage =
document.getElementById("loginPage");

const app =
document.getElementById("app");

const emailInput =
document.getElementById("emailInput");

const passwordInput =
document.getElementById("passwordInput");

const loginBtn =
document.getElementById("loginBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const welcomeUser =
document.getElementById("welcomeUser");

const roleText =
document.getElementById("roleText");

const dashboardTitle =
document.getElementById("dashboardTitle");

/* BUTTONS */

const addClassBtn =
document.getElementById("addClassBtn");

const addAttendanceBtn =
document.getElementById("addAttendanceBtn");

const addHomeworkBtn =
document.getElementById("addHomeworkBtn");

const addGalleryBtn =
document.getElementById("addGalleryBtn");

/* COUNTS */

const studentCount =
document.getElementById("studentCount");

const teacherCount =
document.getElementById("teacherCount");

const attendancePercent =
document.getElementById("attendancePercent");

/* CONTAINERS */

const classesContainer =
document.getElementById("classesContainer");

const attendanceContainer =
document.getElementById("attendanceContainer");

const homeworkContainer =
document.getElementById("homeworkContainer");

const rankingContainer =
document.getElementById("rankingContainer");

const galleryContainer =
document.getElementById("galleryContainer");
/* AI */

const aiChatBox =
document.getElementById(
"aiChatBox"
);

const aiInput =
document.getElementById(
"aiInput"
);

const sendAiBtn =
document.getElementById(
"sendAiBtn"
);
/* =========================
ROLE
========================= */

let currentRole = "";
/* =========================
GEMINI AI
========================= */


/* =========================
LOGIN
========================= */

loginBtn.onclick = async ()=>{

const email =
emailInput.value;

const password =
passwordInput.value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert(
"Login Success"
);
}
catch(error){

alert(error.message);

}

};

/* =========================
AUTH
========================= */

onAuthStateChanged(
auth,
async (user)=>{

if(user){

loginPage.style.display =
"none";

app.style.display =
"block";

welcomeUser.innerHTML =
user.email;

/* =========================
GET ROLE
========================= */

const q =
query(
collection(db,"users"),
where(
"email",
"==",
user.email
)
);

const querySnapshot =
await getDocs(q);

querySnapshot.forEach(
(docSnap)=>{

const data =
docSnap.data();

currentRole =
data.role;
const currentPlan =
data.plan;

const planBadge =
document.getElementById(
"planBadge"
);

const upgradeBtn =
document.getElementById(
"upgradeBtn"
);
upgradeBtn.onclick = ()=>{

window.open(
"https://t.me/Sherzodjanovich_7",
"_blank"
);

};

/* PRO */

if(currentPlan === "pro"){

planBadge.innerHTML =
"👑 PRO";

planBadge.classList.add(
"pro-plan"
);

upgradeBtn.style.display =
"none";

}

/* FREE */

else{

planBadge.innerHTML =
"🟢 FREE";

planBadge.classList.add(
"free-plan"
);

upgradeBtn.style.display =
"inline-block";

}
});

/* =========================
RESET BUTTONS
========================= */

addClassBtn.style.display =
"none";

addAttendanceBtn.style.display =
"none";

addHomeworkBtn.style.display =
"none";

addGalleryBtn.style.display =
"none";

/* =========================
ROLE SYSTEM
========================= */

/* SUPERADMIN */

if(currentRole === "superadmin"){
    document.getElementById(
"planBadge"
).style.display =
"none";

document.getElementById(
"upgradeBtn"
).style.display =
"none";

roleText.innerHTML =
"Superadmin";

dashboardTitle.innerHTML =
"👑 Superadmin Dashboard";

addClassBtn.style.display =
"inline-block";

addAttendanceBtn.style.display =
"inline-block";

addHomeworkBtn.style.display =
"inline-block";

addGalleryBtn.style.display =
"inline-block";

showSection(
"dashboardSection"
);

}

/* DIRECTOR */

else if(currentRole === "director"){

roleText.innerHTML =
"Director";

dashboardTitle.innerHTML =
"👑 Director Dashboard";

addClassBtn.style.display =
"inline-block";

addAttendanceBtn.style.display =
"inline-block";

addGalleryBtn.style.display =
"inline-block";

showSection(
"dashboardSection"
);

}

/* DEPUTY */

else if(currentRole === "deputy"){

roleText.innerHTML =
"Deputy";

dashboardTitle.innerHTML =
"🛡️ Deputy Dashboard";

addAttendanceBtn.style.display =
"inline-block";

addHomeworkBtn.style.display =
"inline-block";

showSection(
"attendanceSection"
);

}

/* TEACHER */

else if(currentRole === "teacher"){

roleText.innerHTML =
"Teacher";

dashboardTitle.innerHTML =
"👨‍🏫 Teacher Dashboard";

addAttendanceBtn.style.display =
"inline-block";

addHomeworkBtn.style.display =
"inline-block";

showSection(
"homeworkSection"
);

}

/* STUDENT */

else{

roleText.innerHTML =
"Student";

dashboardTitle.innerHTML =
"🎓 Student Dashboard";

showSection(
"attendanceSection"
);

}

loadAll();

}
else{

loginPage.style.display =
"flex";

app.style.display =
"none";

}

}
);

/* =========================
SECTION SYSTEM
========================= */

window.showSection =
function(sectionId){

document.getElementById(
"dashboardSection"
).style.display =
"none";

document.getElementById(
"classesSection"
).style.display =
"none";

document.getElementById(
"attendanceSection"
).style.display =
"none";

document.getElementById(
"homeworkSection"
).style.display =
"none";

document.getElementById(
"gallerySection"
).style.display =
"none";

document.getElementById(
"aiSection"
).style.display =
"none";

document.getElementById(
sectionId
).style.display =
"block";

};

/* =========================
LOGOUT
========================= */

logoutBtn.onclick =
async ()=>{

await signOut(auth);

};

/* =========================
LOAD ALL
========================= */
function loadAll(){

loadClasses();
loadAttendance();
loadHomework();
loadRanking();
loadGallery();
loadChart();

}

/* =========================
CLASSES
========================= */

addClassBtn.onclick =
async ()=>{

let name =
prompt("Class Name");

let teacher =
prompt("Teacher");

let students =
prompt("Students Count");

if(!name) return;

await addDoc(
collection(db,"classes"),
{
name,
teacher,
students
}
);

loadClasses();

};

async function loadClasses(){

classesContainer.innerHTML =
"";

const querySnapshot =
await getDocs(
collection(db,"classes")
);

let totalStudents = 0;
let totalTeachers = 0;

querySnapshot.forEach(
(docSnap)=>{

let item =
docSnap.data();

totalStudents +=
Number(item.students || 0);

totalTeachers++;

classesContainer.innerHTML += `

<div class="student-card">

<h3>${item.name}</h3>

<p>
👨‍🏫 ${item.teacher}
</p>

<p>
🎓 ${item.students}
students
</p>

<button
class="delete-btn"
onclick="deleteClass('${docSnap.id}')">

Delete

</button>

</div>

`;

});

studentCount.innerHTML =
totalStudents;

teacherCount.innerHTML =
totalTeachers;

}

window.deleteClass =
async function(id){

await deleteDoc(
doc(db,"classes",id)
);

loadClasses();

};

/* =========================
ATTENDANCE
========================= */

addAttendanceBtn.onclick =
async ()=>{

let className =
prompt("Class");

let percent =
prompt("Attendance %");

if(!className) return;

await addDoc(
collection(db,"attendance"),
{
className,
percent
}
);

loadAttendance();

};

async function loadAttendance(){

attendanceContainer.innerHTML =
"";

const querySnapshot =
await getDocs(
collection(db,"attendance")
);

let total = 0;
let avg = 0;

querySnapshot.forEach(
(docSnap)=>{

let item =
docSnap.data();

total++;

avg +=
Number(item.percent || 0);

attendanceContainer.innerHTML += `

<div class="student-card">

<h3>${item.className}</h3>

<p>
📅 ${item.percent}%
</p>

</div>

`;

});

if(total > 0){

attendancePercent.innerHTML =
Math.floor(avg / total) + "%";

}

}

/* =========================
HOMEWORK
========================= */

addHomeworkBtn.onclick =
async ()=>{

let title =
prompt("Homework");

let className =
prompt("Class");

if(!title) return;

await addDoc(
collection(db,"homework"),
{
title,
className
}
);

loadHomework();

};

async function loadHomework(){

homeworkContainer.innerHTML =
"";

const querySnapshot =
await getDocs(
collection(db,"homework")
);

querySnapshot.forEach(
(docSnap)=>{

let item =
docSnap.data();

homeworkContainer.innerHTML += `

<div class="student-card">

<h3>${item.title}</h3>

<p>
🏫 ${item.className}
</p>

<button
class="delete-btn"
onclick="deleteHomework('${docSnap.id}')">

Delete

</button>

</div>

`;

});

}

window.deleteHomework =
async function(id){

await deleteDoc(
doc(db,"homework",id)
);

loadHomework();

};

/* =========================
RANKING
========================= */

async function loadRanking(){

rankingContainer.innerHTML = `

<div class="student-card">

<h3>🥇 7-A</h3>

<p>98%</p>

</div>

<div class="student-card">

<h3>🥈 11-B</h3>

<p>95%</p>

</div>

`;

}

/* =========================
GALLERY
========================= */

addGalleryBtn.onclick =
async ()=>{

let title =
prompt("Image Title");

let image =
prompt("Image URL");

if(!title) return;

await addDoc(
collection(db,"gallery"),
{
title,
image
}
);

loadGallery();

};

async function loadGallery(){

galleryContainer.innerHTML =
"";

const querySnapshot =
await getDocs(
collection(db,"gallery")
);

querySnapshot.forEach(
(docSnap)=>{

let item =
docSnap.data();

galleryContainer.innerHTML += `

<div class="gallery-card">

<img src="${item.image}">

<h3>${item.title}</h3>

</div>

`;

});

}
/* =========================
CHART
========================= */

function loadChart(){

const ctx =
document.getElementById(
"statsChart"
);

if(!ctx) return;

new Chart(ctx,{

type:"bar",

data:{

labels:[
"Students",
"Teachers",
"Attendance",
"Homework"
],

datasets:[{

label:
"36 School",

data:[
120,
20,
95,
90
]

}]

}

});

}
/* =========================
AI CHAT
========================= */

sendAiBtn.onclick =
async ()=>{

const userMessage =
aiInput.value;

if(!userMessage) return;

/* USER MESSAGE */

aiChatBox.innerHTML += `

<div class="user-message">

${userMessage}

</div>

`;

aiInput.value = "";

/* LOADING */

aiChatBox.innerHTML += `

<div class="ai-message" id="loadingAi">

Typing...

</div>

`;

aiChatBox.scrollTop =
aiChatBox.scrollHeight;
try{
    
/* MODEL */
const response =
await fetch(
"https://three6-school-system.onrender.com/ai",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
message:userMessage
})

}
);

const data =
await response.json();

const text =
data.reply;

/* REMOVE LOADING */

document.getElementById(
"loadingAi"
).remove();

/* AI MESSAGE */

aiChatBox.innerHTML += `

<div class="ai-message">

${text}

</div>

`;

aiChatBox.scrollTop =
aiChatBox.scrollHeight;

}
catch(error){

document.getElementById(
"loadingAi"
).remove();

aiChatBox.innerHTML += `

<div class="ai-message">

❌ ${error.message}

</div>

`;

}

};
const languageSelect =
document.getElementById(
"languageSelect"
);

languageSelect.onchange = ()=>{

const lang =
languageSelect.value;

/* UZBEK */

if(lang === "uz"){

document.querySelectorAll(
".nav-item"
)[0].innerHTML =
"Boshqaruv";

document.querySelectorAll(
".nav-item"
)[1].innerHTML =
"Sinflar";

document.querySelectorAll(
".nav-item"
)[2].innerHTML =
"Davomat";

document.querySelectorAll(
".nav-item"
)[3].innerHTML =
"Vazifalar";

document.querySelectorAll(
".nav-item"
)[4].innerHTML =
"Galereya";

document.querySelectorAll(
".nav-item"
)[5].innerHTML =
"AI Yordamchi";

logoutBtn.innerHTML =
"Chiqish";

}

/* ENGLISH */

else{

document.querySelectorAll(
".nav-item"
)[0].innerHTML =
"Dashboard";

document.querySelectorAll(
".nav-item"
)[1].innerHTML =
"Classes";

document.querySelectorAll(
".nav-item"
)[2].innerHTML =
"Attendance";

document.querySelectorAll(
".nav-item"
)[3].innerHTML =
"Homework";

document.querySelectorAll(
".nav-item"
)[4].innerHTML =
"Gallery";

document.querySelectorAll(
".nav-item"
)[5].innerHTML =
"AI Assistant";

logoutBtn.innerHTML =
"Logout";

}

};