const BACKEND_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://three6-school-system.onrender.com";

function escapeHtml(value) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function sendAuditToSplunk(log) {

  try {

    await fetch(
      `${BACKEND_URL}/audit-log`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(log)
      }
    );

  } catch (error) {

    console.error(
      "Splunk audit failed",
      error
    );

  }

}

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
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc,
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

const roleBadge =
    document.getElementById("roleBadge");

const dashboardTitle =
    document.getElementById("dashboardTitle");
document.getElementById(
    "usersNav"
).style.display =
    "none";

const usersMobileNav =
    document.getElementById(
        "usersMobileNav"
    );

const securityLogsNav =
    document.getElementById(
        "securityLogsNav"
    );

const antiFraudNav =
    document.getElementById(
        "antiFraudNav"
    );

const securityLogsMobileNav =
    document.getElementById(
        "securityLogsMobileNav"
    );

const antiFraudMobileNav =
    document.getElementById(
        "antiFraudMobileNav"
    );

const teacherNav =
    document.getElementById(
        "teacherNav"
    );

const teacherMobileNav =
    document.getElementById(
        "teacherMobileNav"
    );

if (usersMobileNav) {

    usersMobileNav.style.display =
        "none";

}

if (securityLogsNav) {

    securityLogsNav.style.display =
        "none";

}

if (securityLogsMobileNav) {

    securityLogsMobileNav.style.display =
        "none";

}

if (antiFraudNav) {

    antiFraudNav.style.display =
        "none";

}

if (antiFraudMobileNav) {

    antiFraudMobileNav.style.display =
        "none";

}
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
const usersContainer =
    document.getElementById("usersContainer");
const galleryFile =
    document.getElementById(
        "galleryFile"
    );
const classSearch =
    document.getElementById(
        "classSearch"
    );
const themeToggle =
    document.getElementById(
        "themeToggle"
    );
const notificationsContainer =
    document.getElementById(
        "notificationsContainer"
    );
const gradesContainer =
    document.getElementById(
        "gradesContainer"
    );
const galleryContainer =
    document.getElementById(
        "galleryContainer"
    );
const profilesContainer =
    document.getElementById(
        "profilesContainer"
    );
const addGradeBtn =
    document.getElementById(
        "addGradeBtn"
    );
const addNotificationBtn =
    document.getElementById(
        "addNotificationBtn"
    );

const addCalendarEventBtn =
    document.getElementById(
        "addCalendarEventBtn"
    );

const schoolCalendarEl =
    document.getElementById(
        "schoolCalendar"
    );

const teacherClassCount =
    document.getElementById(
        "teacherClassCount"
    );

const teacherHomeworkCount =
    document.getElementById(
        "teacherHomeworkCount"
    );

const teacherAttendanceAvg =
    document.getElementById(
        "teacherAttendanceAvg"
    );

const teacherGradesCount =
    document.getElementById(
        "teacherGradesCount"
    );

const teacherClassesPreview =
    document.getElementById(
        "teacherClassesPreview"
    );

const teacherActivityPreview =
    document.getElementById(
        "teacherActivityPreview"
    );

const securityLogsSection =
    document.getElementById(
        "securityLogsSection"
    );

const antiFraudSection =
    document.getElementById(
        "antiFraudSection"
    );

const accessDeniedSection =
    document.getElementById(
        "accessDeniedSection"
    );

const securityLogsContainer =
    document.getElementById(
        "securityLogsContainer"
    );

const securityLogSearch =
    document.getElementById(
        "securityLogSearch"
    );

const securitySeverityFilter =
    document.getElementById(
        "securitySeverityFilter"
    );

const securityEventFilter =
    document.getElementById(
        "securityEventFilter"
    );

const securityTotalCount =
    document.getElementById(
        "securityTotalCount"
    );

const securityWarningCount =
    document.getElementById(
        "securityWarningCount"
    );

const securityCriticalCount =
    document.getElementById(
        "securityCriticalCount"
    );

const securityThreatScore =
    document.getElementById(
        "securityThreatScore"
    );

const securityHealthPercent =
    document.getElementById(
        "securityHealthPercent"
    );

const securityHealthLabel =
    document.getElementById(
        "securityHealthLabel"
    );

const securityCriticalAlertsCount =
    document.getElementById(
        "securityCriticalAlertsCount"
    );

const securityBruteForceCount =
    document.getElementById(
        "securityBruteForceCount"
    );

const securitySqlInjectionCount =
    document.getElementById(
        "securitySqlInjectionCount"
    );

const securityThreatTimeline =
    document.getElementById(
        "securityThreatTimeline"
    );

const securityTimelineMeta =
    document.getElementById(
        "securityTimelineMeta"
    );

const securityRecentThreats =
    document.getElementById(
        "securityRecentThreats"
    );

const antiFraudScore =
    document.getElementById(
        "antiFraudScore"
    );

const antiFraudScoreMeta =
    document.getElementById(
        "antiFraudScoreMeta"
    );

const antiFraudBruteForceCount =
    document.getElementById(
        "antiFraudBruteForceCount"
    );

const antiFraudSqlInjectionCount =
    document.getElementById(
        "antiFraudSqlInjectionCount"
    );

const antiFraudHighRiskUsers =
    document.getElementById(
        "antiFraudHighRiskUsers"
    );

const antiFraudCriticalThreats =
    document.getElementById(
        "antiFraudCriticalThreats"
    );

const antiFraudRiskBadge =
    document.getElementById(
        "antiFraudRiskBadge"
    );

const antiFraudThreatTimeline =
    document.getElementById(
        "antiFraudThreatTimeline"
    );

const antiFraudTimelineMeta =
    document.getElementById(
        "antiFraudTimelineMeta"
    );

const antiFraudRecentThreats =
    document.getElementById(
        "antiFraudRecentThreats"
    );

const antiFraudTopRiskUsers =
    document.getElementById(
        "antiFraudTopRiskUsers"
    );

const antiFraudThreatSummary =
    document.getElementById(
        "antiFraudThreatSummary"
    );
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
let currentUserEmail = "";
let currentUserId = "";
let selectedBillingPlan = "pro";
let failedPaymentAttempts = 0;
let subscriptionUnsubscribe = null;
let paymentHistoryUnsubscribe = null;
let transactionLogsUnsubscribe = null;
let adminSubscriptionsUnsubscribe = null;
let securityLogsUnsubscribe = null;
let securityLogs = [];
let pendingLoginAuditEmail = "";
let schoolCalendar = null;
let calendarEvents = [];
let calendarFilter = "all";

const BRUTE_FORCE_LIMIT = 5;
const BRUTE_FORCE_WINDOW_MS = 5 * 60 * 1000;
const BRUTE_FORCE_THREAT_SCORE = 90;
const SQL_INJECTION_THREAT_SCORE = 100;
const FRAUD_SCORE_RULES = {
    LOGIN_FAILED: 5,
    BRUTE_FORCE_ATTEMPT: 40,
    SQL_INJECTION_ATTEMPT: 100,
    ROLE_CHANGED: 20,
    CRITICAL: 20,
    WARNING: 5
};
const SQL_INJECTION_PATTERNS = [
    {
        name: "UNION SELECT",
        pattern: /\bunion\s+select\b/i
    },
    {
        name: "OR 1=1",
        pattern: /\bor\s+['"]?1['"]?\s*=\s*['"]?1['"]?/i
    },
    {
        name: "DROP TABLE",
        pattern: /\bdrop\s+table\b/i
    },
    {
        name: "INSERT INTO",
        pattern: /\binsert\s+into\b/i
    },
    {
        name: "DELETE FROM",
        pattern: /\bdelete\s+from\b/i
    },
    {
        name: "xp_cmdshell",
        pattern: /\bxp_cmdshell\b/i
    },
    {
        name: "--",
        pattern: /--/
    }
];

const subscriptionSection =
    document.getElementById("subscriptionSection");

const pricingCards =
    document.getElementById("pricingCards");

const subscriptionStatusBadge =
    document.getElementById("subscriptionStatusBadge");

const subscriptionPlanName =
    document.getElementById("subscriptionPlanName");

const subscriptionMeta =
    document.getElementById("subscriptionMeta");

const paymentHistoryContainer =
    document.getElementById("paymentHistoryContainer");

const transactionLogsContainer =
    document.getElementById("transactionLogsContainer");

const subscriptionAdminPanel =
    document.getElementById("subscriptionAdminPanel");

const subscriptionUsersContainer =
    document.getElementById("subscriptionUsersContainer");

const upgradeModal =
    document.getElementById("upgradeModal");

const closeUpgradeModal =
    document.getElementById("closeUpgradeModal");

const upgradeModalTitle =
    document.getElementById("upgradeModalTitle");

const upgradeModalCopy =
    document.getElementById("upgradeModalCopy");

const cardNameInput =
    document.getElementById("cardNameInput");

const cardNumberInput =
    document.getElementById("cardNumberInput");

const cardExpiryInput =
    document.getElementById("cardExpiryInput");

const cardCvcInput =
    document.getElementById("cardCvcInput");

const confirmPaymentBtn =
    document.getElementById("confirmPaymentBtn");

const fraudAlertText =
    document.getElementById("fraudAlertText");

const failedAttemptCounter =
    document.getElementById("failedAttemptCounter");

const secureVerificationText =
    document.getElementById("secureVerificationText");

const secureVerificationState =
    document.getElementById("secureVerificationState");

const toastContainer =
    document.getElementById("toastContainer");

if (
    themeToggle
    &&
    document.body.classList.contains("light-mode")
) {

    themeToggle.innerHTML =
        "Light Mode";

}

function showToast(message, type = "info") {

    if (!toastContainer) return;

    const toast =
        document.createElement("div");

    toast.className =
        `toast toast-${type}`;

    toast.textContent =
        message;

    toastContainer.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 20);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 250);

    }, 3200);

}

window.alert =
    (message) => {

        const text =
            String(message || "");

        const type =
            text.toLowerCase().includes("denied")
                || text.toLowerCase().includes("error")
                || text.toLowerCase().includes("permission")
                ? "error"
                : "success";

        showToast(text, type);

    };

const nativePrompt =
    window.prompt.bind(window);

window.prompt =
    (message, defaultValue = "") => {

        const value =
            nativePrompt(message, defaultValue);

        if (value !== null) {

            detectSQLInjection(
                value,
                `prompt:${message || "user input"}`
            );

        }

        return value;

    };

function renderSkeletons(container, count = 3) {

    if (!container) return;

    container.innerHTML =
        Array.from({ length: count }, () => `
<div class="skeleton-card">
    <span></span>
    <span></span>
    <span></span>
</div>
`).join("");

}

function normalizeValue(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

}

function isTeacher() {

    return currentRole === "teacher";

}

const legacyRoleMap = {
    superadmin: "superadmin",
    director: "admin",
    deputy: "admin",
    admin: "admin",
    teacher: "teacher",
    student: "student",
    parent: "parent"
};

const roleLabels = {
    superadmin: "Super Admin",
    admin: "Admin",
    teacher: "Teacher",
    student: "Student",
    parent: "Parent"
};

const roleDashboards = {
    superadmin: "dashboardSection",
    admin: "dashboardSection",
    teacher: "teacherSection",
    student: "dashboardSection",
    parent: "dashboardSection"
};

const pagePermissions = {
    dashboardSection: ["superadmin", "admin", "teacher", "student", "parent"],
    teacherSection: ["teacher"],
    classesSection: ["superadmin", "admin", "teacher"],
    attendanceSection: ["superadmin", "admin", "teacher", "student", "parent"],
    homeworkSection: ["superadmin", "admin", "teacher", "student", "parent"],
    gallerySection: ["superadmin", "admin", "teacher", "student", "parent"],
    aiSection: ["superadmin", "admin", "teacher", "student"],
    notificationsSection: ["superadmin", "admin", "teacher", "student", "parent"],
    gradesSection: ["superadmin", "admin", "teacher", "student", "parent"],
    calendarSection: ["superadmin", "admin", "teacher", "student", "parent"],
    subscriptionSection: ["superadmin", "admin"],
    securityLogsSection: ["superadmin", "admin"],
    antiFraudSection: ["superadmin", "admin"],
    usersSection: ["superadmin"]
};

const actionPermissions = {
    manageUsers: ["superadmin"],
    viewSecurityLogs: ["superadmin", "admin"],
    viewAntiFraud: ["superadmin", "admin"],
    manageClasses: ["superadmin", "admin"],
    manageAttendance: ["superadmin", "admin", "teacher"],
    manageHomework: ["superadmin", "admin", "teacher"],
    manageGallery: ["superadmin", "admin"],
    deleteGallery: ["superadmin"],
    manageNotifications: ["superadmin", "admin", "teacher"],
    manageGrades: ["superadmin", "admin", "teacher"],
    manageCalendar: ["superadmin", "admin", "teacher"],
    manageSubscriptions: ["superadmin"]
};

const protectedSectionIds =
    Object.keys(pagePermissions);

function normalizeRole(role) {

    return legacyRoleMap[normalizeValue(role)] || "student";

}

function roleLabel(role = currentRole) {

    return roleLabels[normalizeRole(role)] || "Student";

}

function canAccessPage(sectionId) {

    const allowedRoles =
        pagePermissions[sectionId];

    return !allowedRoles
        || allowedRoles.includes(currentRole);

}

function can(action) {

    return (actionPermissions[action] || []).includes(currentRole);

}

function showAccessDenied(sectionId = "") {

    protectedSectionIds.forEach((id) => {

        const section =
            document.getElementById(id);

        if (section) {

            section.style.display =
                "none";

        }

    });

    if (accessDeniedSection) {

        accessDeniedSection.style.display =
            "block";

    }

    saveAuditLog({
        event: "access_denied",
        category: "auth",
        action: "Blocked unauthorized page access",
        severity: "warning",
        target: sectionId,
        details: `${roleLabel()} attempted to open ${sectionId}.`
    });

}

window.showDefaultSectionForRole =
    function () {

        showSection(
            roleDashboards[currentRole] || "dashboardSection"
        );

    };

function setRoleBadge() {

    if (roleText) {

        roleText.innerHTML =
            roleLabel();

    }

    if (roleBadge) {

        roleBadge.textContent =
            roleLabel();

        roleBadge.className =
            `role-badge role-${currentRole}`;

    }

}

function toggleNavigationForRole() {

    document.querySelectorAll(
        ".nav-item, .mobile-item"
    ).forEach((item) => {

        const match =
            (item.getAttribute("onclick") || "")
                .match(/showSection\('([^']+)'\)/);

        if (!match) return;

        item.style.display =
            canAccessPage(match[1])
                ? ""
                : "none";

    });

    if (teacherNav) {

        teacherNav.style.display =
            currentRole === "teacher"
                ? "block"
                : "none";

    }

    if (teacherMobileNav) {

        teacherMobileNav.style.display =
            currentRole === "teacher"
                ? "block"
                : "none";

    }

}

function configureRoleAccess() {

    setRoleBadge();
    toggleNavigationForRole();

    if (dashboardTitle) {

        dashboardTitle.innerHTML =
            `${roleLabel()} Dashboard`;

    }

    if (addClassBtn) addClassBtn.style.display = can("manageClasses") ? "inline-block" : "none";
    if (addAttendanceBtn) addAttendanceBtn.style.display = can("manageAttendance") ? "inline-block" : "none";
    if (addHomeworkBtn) addHomeworkBtn.style.display = can("manageHomework") ? "inline-block" : "none";
    if (addGalleryBtn) addGalleryBtn.style.display = can("manageGallery") ? "inline-block" : "none";
    if (addGradeBtn) addGradeBtn.style.display = can("manageGrades") ? "inline-block" : "none";
    if (addNotificationBtn) addNotificationBtn.style.display = can("manageNotifications") ? "inline-block" : "none";

    if (addCalendarEventBtn) {

        addCalendarEventBtn.style.display =
            can("manageCalendar")
                ? "inline-block"
                : "none";

    }

    const upgradeBtn =
        document.getElementById("upgradeBtn");

    if (upgradeBtn && currentRole === "superadmin") {

        upgradeBtn.style.display =
            "none";

    }

    window.showDefaultSectionForRole();

}

function ownsClass(item) {

    if (!isTeacher()) return true;

    const email =
        normalizeValue(currentUserEmail);

    return normalizeValue(item.teacherEmail) === email
        || normalizeValue(item.teacher) === email;

}

async function getTeacherClassNames() {

    const snapshot =
        await getDocs(
            collection(db, "classes")
        );

    const classNames =
        new Set();

    snapshot.forEach(
        (docSnap) => {

            const item =
                docSnap.data();

            if (ownsClass(item)) {

                classNames.add(
                    normalizeValue(item.name)
                );

            }

        }
    );

    return classNames;

}

async function teacherCanManageClass(className) {

    if (!isTeacher()) return true;

    const classNames =
        await getTeacherClassNames();

    return classNames.has(
        normalizeValue(className)
    );

}

function ownsTeacherRecord(item, classNames) {

    if (!isTeacher()) return true;

    return normalizeValue(item.teacherEmail) === normalizeValue(currentUserEmail)
        || classNames.has(normalizeValue(item.className));

}

function canEditCalendarEvents() {

    return can("manageCalendar");

}

function isSecurityAdmin() {

    return can("viewSecurityLogs");

}

function getDeviceInfo() {

    const agent =
        navigator.userAgent || "Unknown browser";

    const platform =
        navigator.platform || "Unknown device";

    return `${platform} / ${agent}`;

}

function buildAuditLog({
    event = "admin_action",
    category = "admin",
    action = "Admin action",
    severity = "info",
    threatScore = 0,
    target = "",
    details = "",
    email = currentUserEmail,
    role = currentRole || "guest",
    userId = currentUserId || ""
} = {}) {

    return {
        event,
        category,
        action,
        severity,
        threatScore,
        target,
        details,
        email: email || "unknown",
        userId,
        role: role || "guest",
        ip: "IP unavailable in browser",
        device: getDeviceInfo(),
        path: window.location.pathname,
        createdAt: new Date().toISOString()
    };

}

async function saveAuditLog(payload) {

    try {

        const log =
            buildAuditLog(payload);

        await addDoc(
            collection(db, "auditLogs"),
            log
        );

        await sendAuditToSplunk(log);

    }
    catch (error) {

        console.warn(
            "Audit log failed",
            error
        );

    }

}

function findSqlInjectionPattern(value) {

    const text =
        String(value || "");

    if (!text.trim()) return null;

    return SQL_INJECTION_PATTERNS.find((item) =>
        item.pattern.test(text)
    ) || null;

}

function maskThreatPayload(value) {

    const text =
        String(value || "");

    if (text.length <= 180) return text;

    return `${text.slice(0, 180)}...`;

}

async function detectSQLInjection(input) {

    const source =
        arguments[1] || "unknown";

    const match =
        findSqlInjectionPattern(input);

    if (!match) return false;

    const email =
        normalizeValue(currentUserEmail)
        || normalizeValue(emailInput?.value)
        || "anonymous";

    await saveAuditLog({
        event: "sql_injection_attempt",
        category: "auth",
        action: "SQL_INJECTION_ATTEMPT",
        severity: "CRITICAL",
        threatScore: SQL_INJECTION_THREAT_SCORE,
        email,
        role: currentRole || "guest",
        target: source,
        details: `Detected SQL injection pattern "${match.name}" in ${source}. Payload: ${maskThreatPayload(input)}`
    });

    showToast(
        "Critical security event detected: SQL injection attempt",
        "error"
    );

    return true;

}

window.detectSQLInjection =
    detectSQLInjection;

async function detectSqlInjection(value, source = "unknown") {

    return detectSQLInjection(
        value,
        source
    );

}

function attachSqlInjectionDetection() {

    document.addEventListener(
        "change",
        (event) => {

            const field =
                event.target;

            if (
                !field
                || !["INPUT", "TEXTAREA", "SELECT"].includes(field.tagName)
            ) {

                return;

            }

            detectSQLInjection(
                field.value,
                field.id || field.name || field.placeholder || field.tagName
            );

        }
    );

    document.addEventListener(
        "blur",
        (event) => {

            const field =
                event.target;

            if (
                !field
                || !["INPUT", "TEXTAREA"].includes(field.tagName)
            ) {

                return;

            }

            detectSQLInjection(
                field.value,
                field.id || field.name || field.placeholder || field.tagName
            );

        },
        true
    );

}

function getFailedLoginDocId(email) {

    const normalizedEmail =
        normalizeValue(email) || "unknown";

    return normalizedEmail.replace(
        /[^a-z0-9._-]/g,
        "_"
    );

}

async function clearFailedLoginAttempts(email) {

    if (!email) return;

    try {

        await setDoc(
            doc(
                db,
                "failedLoginAttempts",
                getFailedLoginDocId(email)
            ),
            {
                email: normalizeValue(email),
                attempts: [],
                count: 0,
                updatedAt: new Date().toISOString(),
                lastBruteForceAuditAt: ""
            },
            { merge: true }
        );

    }
    catch (error) {

        console.warn(
            "Failed login cleanup failed",
            error
        );

    }

}

async function trackFailedLoginAttempt(email, errorMessage = "") {

    const normalizedEmail =
        normalizeValue(email);

    if (!normalizedEmail) return;

    const now =
        Date.now();

    const attemptRef =
        doc(
            db,
            "failedLoginAttempts",
            getFailedLoginDocId(normalizedEmail)
        );

    const attemptSnap =
        await getDoc(attemptRef);

    const existingData =
        attemptSnap.exists()
            ? attemptSnap.data()
            : {};

    const recentAttempts =
        (existingData.attempts || [])
            .filter((timestamp) => {

                const value =
                    Number(timestamp);

                return Number.isFinite(value)
                    && now - value <= BRUTE_FORCE_WINDOW_MS;

            });

    recentAttempts.push(now);

    const lastAuditAt =
        Number(existingData.lastBruteForceAuditAt || 0);

    const shouldCreateBruteForceAudit =
        recentAttempts.length >= BRUTE_FORCE_LIMIT
        && (!lastAuditAt || now - lastAuditAt > BRUTE_FORCE_WINDOW_MS);

    await setDoc(
        attemptRef,
        {
            email: normalizedEmail,
            attempts: recentAttempts,
            count: recentAttempts.length,
            windowMinutes: BRUTE_FORCE_WINDOW_MS / 60000,
            lastAttemptAt: new Date(now).toISOString(),
            updatedAt: new Date(now).toISOString(),
            lastBruteForceAuditAt: shouldCreateBruteForceAudit
                ? now
                : (existingData.lastBruteForceAuditAt || "")
        },
        { merge: true }
    );

    if (shouldCreateBruteForceAudit) {

        await saveAuditLog({
            event: "brute_force_attempt",
            category: "auth",
            action: "BRUTE_FORCE_ATTEMPT",
            severity: "CRITICAL",
            threatScore: BRUTE_FORCE_THREAT_SCORE,
            email: normalizedEmail,
            role: "guest",
            target: normalizedEmail,
            details: `${recentAttempts.length} failed login attempts within 5 minutes. Latest error: ${errorMessage || "Unknown login error"}.`
        });

    }

}

function formatAuditDate(value) {

    if (!value) return "Just now";

    if (typeof value.toDate === "function") {

        return value.toDate().toLocaleString();

    }

    return new Date(value).toLocaleString();

}

let securityTimelineChart = null;

function getSeverityPoints(severity) {

    const normalizedSeverity =
        normalizeValue(severity);

    if (normalizedSeverity === "critical") return 20;
    if (normalizedSeverity === "warning") return 5;
    return 1;

}

function isBruteForceLog(item) {

    return normalizeValue(item.action) === "brute_force_attempt"
        || normalizeValue(item.event) === "brute_force_attempt";

}

function isSqlInjectionLog(item) {

    return normalizeValue(item.action) === "sql_injection_attempt"
        || normalizeValue(item.event) === "sql_injection_attempt";

}

function getAuditTimestamp(item) {

    const value =
        item.createdAt;

    if (value && typeof value.toDate === "function") {

        return value.toDate().getTime();

    }

    const timestamp =
        new Date(value || 0).getTime();

    return Number.isFinite(timestamp)
        ? timestamp
        : 0;

}

function calculateSecurityHealth(threatScore, totalLogs) {

    if (!totalLogs) return 100;

    const maxRisk =
        Math.max(totalLogs * 20, 20);

    return Math.max(
        0,
        Math.round(100 - ((threatScore / maxRisk) * 100))
    );

}

function getSecurityHealthLabel(health) {

    if (health >= 85) return "Healthy";
    if (health >= 65) return "Watch";
    if (health >= 40) return "Elevated Risk";
    return "Critical";

}

function updateSecurityTimelineChart(logs) {

    if (!securityThreatTimeline || typeof Chart === "undefined") return;

    const timelineMap =
        new Map();

    logs
        .slice()
        .sort((a, b) => getAuditTimestamp(a) - getAuditTimestamp(b))
        .forEach((item) => {

        const timestamp =
            getAuditTimestamp(item);

        if (!timestamp) return;

        const label =
            new Date(timestamp).toLocaleDateString();

        const current =
            timelineMap.get(label) || {
                info: 0,
                warning: 0,
                critical: 0
            };

        const severity =
            normalizeValue(item.severity);

        if (severity === "critical") {

            current.critical++;

        }
        else if (severity === "warning") {

            current.warning++;

        }
        else {

            current.info++;

        }

        timelineMap.set(label, current);

        });

    const labels =
        Array.from(timelineMap.keys()).slice(-10);

    const values =
        labels.map((label) => timelineMap.get(label));

    if (securityTimelineMeta) {

        securityTimelineMeta.textContent =
            labels.length
                ? `${labels.length} day window`
                : "No events";

    }

    const chartData = {
        labels,
        datasets: [
            {
                label: "Critical",
                data: values.map((item) => item.critical),
                borderColor: "#fb7185",
                backgroundColor: "rgba(251,113,133,0.18)",
                tension: 0.35,
                fill: true
            },
            {
                label: "Warning",
                data: values.map((item) => item.warning),
                borderColor: "#f59e0b",
                backgroundColor: "rgba(245,158,11,0.14)",
                tension: 0.35,
                fill: true
            },
            {
                label: "Info",
                data: values.map((item) => item.info),
                borderColor: "#38bdf8",
                backgroundColor: "rgba(56,189,248,0.10)",
                tension: 0.35,
                fill: true
            }
        ]
    };

    if (securityTimelineChart) {

        securityTimelineChart.data =
            chartData;

        securityTimelineChart.update();

        return;

    }

    securityTimelineChart =
        new Chart(
            securityThreatTimeline,
            {
                type: "line",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: "#cbd5e1"
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#94a3b8"
                            },
                            grid: {
                                color: "rgba(148,163,184,0.14)"
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: "#94a3b8",
                                precision: 0
                            },
                            grid: {
                                color: "rgba(148,163,184,0.14)"
                            }
                        }
                    }
                }
            }
        );

}

function renderRecentThreats(logs) {

    if (!securityRecentThreats) return;

    const threats =
        logs.filter((item) =>
            normalizeValue(item.severity) === "critical"
            || isBruteForceLog(item)
            || isSqlInjectionLog(item)
        ).slice(0, 6);

    securityRecentThreats.innerHTML =
        threats.length
            ? threats.map((item) => `
<div class="security-recent-threat">
    <div>
        <span>${escapeHtml(item.action || "Security event")}</span>
        <strong>${escapeHtml(item.email || item.target || "unknown target")}</strong>
        <p>${escapeHtml(item.details || "No details recorded.")}</p>
    </div>
    <div class="security-recent-meta">
        <small>${formatAuditDate(item.createdAt)}</small>
        <b>${escapeHtml(item.threatScore || getSeverityPoints(item.severity))}</b>
    </div>
</div>
`).join("")
            : `<div class="security-empty">No recent critical threats.</div>`;

}

let antiFraudTimelineChart = null;

function getAntiFraudPoints(item) {

    const event =
        normalizeValue(item.event);

    const action =
        normalizeValue(item.action);

    const severity =
        normalizeValue(item.severity);

    let points =
        0;

    if (
        event === "failed_login"
        || action === "failed_login"
        || action === "failed login attempt"
        || event === "login_failed"
        || action === "login_failed"
    ) {

        points += FRAUD_SCORE_RULES.LOGIN_FAILED;

    }

    if (
        event === "role_changed"
        || action === "role_changed"
        || action === "role changed"
        || action === "change_user_role"
    ) {

        points += FRAUD_SCORE_RULES.ROLE_CHANGED;

    }

    if (isBruteForceLog(item)) {

        points += FRAUD_SCORE_RULES.BRUTE_FORCE_ATTEMPT;

    }

    if (isSqlInjectionLog(item)) {

        points += FRAUD_SCORE_RULES.SQL_INJECTION_ATTEMPT;

    }

    if (severity === "critical") {

        points += FRAUD_SCORE_RULES.CRITICAL;

    }
    else if (severity === "warning") {

        points += FRAUD_SCORE_RULES.WARNING;

    }

    return Math.min(
        100,
        points
    );

}

function getAntiFraudRisk(score) {

    if (score >= 71) return "critical";
    if (score >= 31) return "warning";
    return "safe";

}

function getAntiFraudRiskLabel(risk) {

    if (risk === "critical") return "Critical";
    if (risk === "warning") return "Warning";
    return "Safe";

}

function getAntiFraudRiskClass(item) {

    return getAntiFraudRisk(
        getAntiFraudPoints(item)
    );

}

function getAntiFraudUserKey(item) {

    return item.email
        || item.target
        || item.userId
        || "unknown";

}

function buildFraudScoreEngine(logs) {

    const summary = {
        loginFailed: 0,
        bruteForce: 0,
        sqlInjection: 0,
        roleChanged: 0,
        critical: 0,
        warning: 0
    };

    const users =
        new Map();

    logs.forEach((item) => {

        const event =
            normalizeValue(item.event);

        const action =
            normalizeValue(item.action);

        const severity =
            normalizeValue(item.severity);

        const score =
            getAntiFraudPoints(item);

        const userKey =
            getAntiFraudUserKey(item);

        const existingUser =
            users.get(userKey) || {
                user: userKey,
                score: 0,
                events: 0,
                lastSeen: item.createdAt
            };

        existingUser.score =
            Math.min(
                100,
                existingUser.score + score
            );

        existingUser.events++;

        if (getAuditTimestamp(item) > getAuditTimestamp({ createdAt: existingUser.lastSeen })) {

            existingUser.lastSeen =
                item.createdAt;

        }

        users.set(
            userKey,
            existingUser
        );

        if (
            event === "failed_login"
            || action === "failed_login"
            || action === "failed login attempt"
            || event === "login_failed"
            || action === "login_failed"
        ) {

            summary.loginFailed++;

        }

        if (isBruteForceLog(item)) summary.bruteForce++;
        if (isSqlInjectionLog(item)) summary.sqlInjection++;

        if (
            event === "role_changed"
            || action === "role_changed"
            || action === "role changed"
            || action === "change_user_role"
        ) {

            summary.roleChanged++;

        }

        if (severity === "critical") summary.critical++;
        if (severity === "warning") summary.warning++;

    });

    const topUsers =
        Array.from(users.values())
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

    const fraudScore =
        topUsers.length
            ? topUsers[0].score
            : 0;

    return {
        fraudScore,
        risk: getAntiFraudRisk(fraudScore),
        topUsers,
        summary
    };

}

function updateAntiFraudTimelineChart(logs) {

    if (!antiFraudThreatTimeline || typeof Chart === "undefined") return;

    const timelineMap =
        new Map();

    logs
        .slice()
        .sort((a, b) => getAuditTimestamp(a) - getAuditTimestamp(b))
        .forEach((item) => {

            const timestamp =
                getAuditTimestamp(item);

            if (!timestamp) return;

            const label =
                new Date(timestamp).toLocaleDateString();

            const current =
                timelineMap.get(label) || {
                    bruteForce: 0,
                    sqlInjection: 0,
                    critical: 0
                };

            if (isBruteForceLog(item)) current.bruteForce++;
            if (isSqlInjectionLog(item)) current.sqlInjection++;

            if (normalizeValue(item.severity) === "critical") {

                current.critical++;

            }

            timelineMap.set(label, current);

        });

    const labels =
        Array.from(timelineMap.keys()).slice(-10);

    const values =
        labels.map((label) => timelineMap.get(label));

    if (antiFraudTimelineMeta) {

        antiFraudTimelineMeta.textContent =
            labels.length
                ? `${labels.length} day window`
                : "No threats";

    }

    const chartData = {
        labels,
        datasets: [
            {
                label: "Brute Force",
                data: values.map((item) => item.bruteForce),
                borderColor: "#f59e0b",
                backgroundColor: "rgba(245,158,11,0.16)",
                tension: 0.35,
                fill: true
            },
            {
                label: "SQL Injection",
                data: values.map((item) => item.sqlInjection),
                borderColor: "#fb7185",
                backgroundColor: "rgba(251,113,133,0.18)",
                tension: 0.35,
                fill: true
            },
            {
                label: "Critical",
                data: values.map((item) => item.critical),
                borderColor: "#a78bfa",
                backgroundColor: "rgba(167,139,250,0.14)",
                tension: 0.35,
                fill: true
            }
        ]
    };

    if (antiFraudTimelineChart) {

        antiFraudTimelineChart.data =
            chartData;

        antiFraudTimelineChart.update();

        return;

    }

    antiFraudTimelineChart =
        new Chart(
            antiFraudThreatTimeline,
            {
                type: "line",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: "#cbd5e1"
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#94a3b8"
                            },
                            grid: {
                                color: "rgba(148,163,184,0.14)"
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: "#94a3b8",
                                precision: 0
                            },
                            grid: {
                                color: "rgba(148,163,184,0.14)"
                            }
                        }
                    }
                }
            }
        );

}

function renderAntiFraudCenter(logs) {

    if (!antiFraudSection) return;

    const engine =
        buildFraudScoreEngine(logs);

    const bruteForceCount =
        engine.summary.bruteForce;

    const sqlInjectionCount =
        engine.summary.sqlInjection;

    const criticalThreats =
        logs.filter((item) =>
            normalizeValue(item.severity) === "critical"
            || isSqlInjectionLog(item)
        ).length;

    const highRiskUsers =
        engine.topUsers
            .filter((item) => item.score >= 31)
            .length;

    const fraudScore =
        engine.fraudScore;

    const risk =
        engine.risk;

    if (antiFraudScore) antiFraudScore.textContent = fraudScore;
    if (antiFraudBruteForceCount) antiFraudBruteForceCount.textContent = bruteForceCount;
    if (antiFraudSqlInjectionCount) antiFraudSqlInjectionCount.textContent = sqlInjectionCount;
    if (antiFraudHighRiskUsers) antiFraudHighRiskUsers.textContent = highRiskUsers;
    if (antiFraudCriticalThreats) antiFraudCriticalThreats.textContent = criticalThreats;

    if (antiFraudScoreMeta) {

        antiFraudScoreMeta.textContent =
            `${getAntiFraudRiskLabel(risk)} risk - 0-30 Safe / 31-70 Warning / 71-100 Critical`;

    }

    if (antiFraudRiskBadge) {

        antiFraudRiskBadge.className =
            `risk-level-badge ${risk}`;

        antiFraudRiskBadge.textContent =
            getAntiFraudRiskLabel(risk);

    }

    updateAntiFraudTimelineChart(logs);

    if (antiFraudTopRiskUsers) {

        antiFraudTopRiskUsers.innerHTML =
            engine.topUsers.length
                ? engine.topUsers.map((item) => {

                    const userRisk =
                        getAntiFraudRisk(item.score);

                    return `
<div class="top-risk-user-row">
    <div>
        <strong>${escapeHtml(item.user)}</strong>
        <small>${escapeHtml(item.events)} audit event${item.events === 1 ? "" : "s"} - last seen ${formatAuditDate(item.lastSeen)}</small>
    </div>
    <div class="top-risk-user-score">
        <span class="risk-level-badge ${escapeHtml(userRisk)}">${escapeHtml(getAntiFraudRiskLabel(userRisk))}</span>
        <b>${escapeHtml(item.score)}</b>
    </div>
</div>
`;

                }).join("")
                : `<div class="security-empty">No user risk signals found.</div>`;

    }

    if (antiFraudThreatSummary) {

        const summaryItems = [
            ["LOGIN_FAILED", engine.summary.loginFailed, FRAUD_SCORE_RULES.LOGIN_FAILED],
            ["BRUTE_FORCE_ATTEMPT", engine.summary.bruteForce, FRAUD_SCORE_RULES.BRUTE_FORCE_ATTEMPT],
            ["SQL_INJECTION_ATTEMPT", engine.summary.sqlInjection, FRAUD_SCORE_RULES.SQL_INJECTION_ATTEMPT],
            ["ROLE_CHANGED", engine.summary.roleChanged, FRAUD_SCORE_RULES.ROLE_CHANGED],
            ["CRITICAL", engine.summary.critical, FRAUD_SCORE_RULES.CRITICAL],
            ["WARNING", engine.summary.warning, FRAUD_SCORE_RULES.WARNING]
        ];

        antiFraudThreatSummary.innerHTML =
            summaryItems.map(([label, count, points]) => `
<div class="threat-summary-item">
    <span>${label}</span>
    <strong>${count}</strong>
    <small>${points} pts each</small>
</div>
`).join("");

    }

    if (!antiFraudRecentThreats) return;

    const recentThreats =
        logs.filter((item) =>
            normalizeValue(item.severity) === "critical"
            || normalizeValue(item.severity) === "warning"
            || isBruteForceLog(item)
            || isSqlInjectionLog(item)
            || getAntiFraudPoints(item) >= 31
        ).slice(0, 8);

    antiFraudRecentThreats.innerHTML =
        recentThreats.length
            ? recentThreats.map((item) => {

                const itemRisk =
                    getAntiFraudRiskClass(item);

                return `
<tr>
    <td>
        <strong>${escapeHtml(item.action || item.event || "Security event")}</strong>
        <small>${escapeHtml(item.details || item.target || "No details recorded.")}</small>
    </td>
    <td>${escapeHtml(item.email || item.target || "unknown")}</td>
    <td><span class="risk-level-badge ${escapeHtml(itemRisk)}">${escapeHtml(getAntiFraudRiskLabel(itemRisk))}</span></td>
    <td>${escapeHtml(getAntiFraudPoints(item))}</td>
    <td>${formatAuditDate(item.createdAt)}</td>
</tr>
`;

            }).join("")
            : `
<tr>
    <td colspan="5">
        <div class="security-empty">No recent fraud threats found.</div>
    </td>
</tr>
`;

}

function updateSecuritySocMetrics(logs) {

    const totalLogs =
        logs.length;

    const warningCount =
        logs.filter((item) => normalizeValue(item.severity) === "warning").length;

    const criticalCount =
        logs.filter((item) => normalizeValue(item.severity) === "critical").length;

    const bruteForceCount =
        logs.filter(isBruteForceLog).length;

    const sqlInjectionCount =
        logs.filter(isSqlInjectionLog).length;

    const threatScore =
        logs.reduce((total, item) => total + getSeverityPoints(item.severity), 0);

    const health =
        calculateSecurityHealth(
            threatScore,
            totalLogs
        );

    if (securityTotalCount) securityTotalCount.textContent = totalLogs;
    if (securityWarningCount) securityWarningCount.textContent = warningCount;
    if (securityCriticalCount) securityCriticalCount.textContent = criticalCount;
    if (securityCriticalAlertsCount) securityCriticalAlertsCount.textContent = criticalCount;
    if (securityBruteForceCount) securityBruteForceCount.textContent = bruteForceCount;
    if (securitySqlInjectionCount) securitySqlInjectionCount.textContent = sqlInjectionCount;
    if (securityThreatScore) securityThreatScore.textContent = threatScore;

    if (securityHealthPercent) {

        securityHealthPercent.textContent =
            `${health}%`;

    }

    if (securityHealthLabel) {

        securityHealthLabel.textContent =
            getSecurityHealthLabel(health);

    }

    updateSecurityTimelineChart(logs);
    renderRecentThreats(logs);
    renderAntiFraudCenter(logs);

}

function renderSecurityLogs() {

    if (!securityLogsContainer) return;

    const searchValue =
        normalizeValue(securityLogSearch?.value);

    const severityValue =
        securitySeverityFilter?.value || "all";

    const eventValue =
        securityEventFilter?.value || "all";

    const filteredLogs =
        securityLogs.filter((item) => {

            const matchesSeverity =
                severityValue === "all"
                || normalizeValue(item.severity) === severityValue;

            const matchesEvent =
                eventValue === "all"
                || item.category === eventValue;

            const searchBlob =
                normalizeValue([
                    item.action,
                    item.email,
                    item.role,
                    item.target,
                    item.details,
                    item.device,
                    item.ip,
                    item.event,
                    item.severity,
                    item.threatScore
                ].join(" "));

            return matchesSeverity
                && matchesEvent
                && (!searchValue || searchBlob.includes(searchValue));

        });

    updateSecuritySocMetrics(securityLogs);

    securityLogsContainer.innerHTML =
        filteredLogs.length
            ? filteredLogs.map((item) => `
<div class="security-log-row severity-${escapeHtml(normalizeValue(item.severity) || "info")}">
    <div class="security-log-main">
        <span>${escapeHtml(item.category || "system")}</span>
        <strong>${escapeHtml(item.action || "Security event")}</strong>
        <p>${escapeHtml(item.details || item.target || "No extra details recorded.")}</p>
    </div>
    <div class="security-log-meta">
        <span class="severity-badge">${escapeHtml(item.severity || "info")}</span>
        ${item.threatScore ? `<span class="threat-score-badge">Threat ${escapeHtml(item.threatScore)}</span>` : ""}
        <small>${formatAuditDate(item.createdAt)}</small>
        <small>${escapeHtml(item.email || "unknown")} - ${escapeHtml(item.role || "guest")}</small>
        <small>${escapeHtml(item.ip || "IP placeholder")}</small>
        <small>${escapeHtml(item.device || "Unknown device")}</small>
    </div>
</div>
`).join("")
            : `<div class="security-empty">No security logs match these filters.</div>`;

    const criticalThreatAlerts =
        filteredLogs.filter((item) =>
            normalizeValue(item.action) === "brute_force_attempt"
            || normalizeValue(item.event) === "brute_force_attempt"
            || normalizeValue(item.action) === "sql_injection_attempt"
            || normalizeValue(item.event) === "sql_injection_attempt"
        );

    if (criticalThreatAlerts.length) {

        const alertMarkup =
            criticalThreatAlerts.slice(0, 3).map((item) => `
<div class="security-threat-alert">
    <div>
        <span>Critical threat detected</span>
        <strong>${escapeHtml(item.action || "SECURITY_THREAT")}</strong>
        <p>${escapeHtml(item.email || item.target || "unknown target")} - threat score ${escapeHtml(item.threatScore || SQL_INJECTION_THREAT_SCORE)}</p>
    </div>
    <small>${formatAuditDate(item.createdAt)}</small>
</div>
`).join("");

        securityLogsContainer.innerHTML =
            alertMarkup + securityLogsContainer.innerHTML;

    }

}

function loadSecurityLogs() {

    if (!isSecurityAdmin() || !securityLogsContainer) return;

    if (securityLogsUnsubscribe) {

        securityLogsUnsubscribe();

    }

    renderSkeletons(securityLogsContainer, 4);

    securityLogsUnsubscribe =
        onSnapshot(
            collection(db, "auditLogs"),
            (snapshot) => {

                securityLogs =
                    [];

                snapshot.forEach((docSnap) => {

                    securityLogs.push({
                        id: docSnap.id,
                        ...docSnap.data()
                    });

                });

                securityLogs.sort(
                    (a, b) => getAuditTimestamp(b) - getAuditTimestamp(a)
                );

                renderSecurityLogs();

            }
        );

}

[
    securityLogSearch,
    securitySeverityFilter,
    securityEventFilter
].forEach((element) => {

    if (element) {

        element.oninput =
            renderSecurityLogs;

        element.onchange =
            renderSecurityLogs;

    }

});

attachSqlInjectionDetection();
/* =========================
GEMINI AI
========================= */
/* =========================
LOGIN
========================= */

loginBtn.onclick = async () => {

    const email =
        emailInput.value;

    const password =
        passwordInput.value;

    const emailInjected =
        await detectSQLInjection(
            email,
            "login:email"
        );

    const passwordInjected =
        await detectSQLInjection(
            password,
            "login:password"
        );

    if (emailInjected || passwordInjected) return;

    try {

        pendingLoginAuditEmail =
            email;

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        await clearFailedLoginAttempts(email);

        alert(
            "Login Success"
        );
    }

    catch (error) {

        pendingLoginAuditEmail =
            "";

        try {

            await trackFailedLoginAttempt(
                email,
                error.message
            );

        }
        catch (trackingError) {

            console.warn(
                "Brute force tracking failed",
                trackingError
            );

        }

        await saveAuditLog({
            event: "failed_login",
            category: "auth",
            action: "Failed login attempt",
            severity: "warning",
            email,
            role: "guest",
            details: error.message
        });

        alert(error.message);

    }

};


/* =========================
AUTH
========================= */

onAuthStateChanged(
    auth,
    async (user) => {

        if (user) {

            currentUserEmail =
                user.email;

            currentUserId =
                user.uid;

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
                    collection(db, "users"),
                    where(
                        "email",
                        "==",
                        user.email
                    )
                );

            const querySnapshot =
                await getDocs(q);

            let profileData = null;

            querySnapshot.forEach(
                (docSnap) => {

                    const data =
                        docSnap.data();

                    profileData = data;

                    currentRole =
                        normalizeRole(data.role);
                    const planBadge =
                        document.getElementById(
                            "planBadge"
                        );

                    const upgradeBtn =
                        document.getElementById(
                            "upgradeBtn"
                        );
                    upgradeBtn.onclick = () =>
                        openUpgradeModal("pro");

                    /* PRO */
                    planBadge.style.display =
                        "flex";

                    upgradeBtn.style.display =
                        "inline-block";
                    planBadge.classList.remove("pro-plan", "free-plan");

                    if (data.plan === "pro") {

                        planBadge.innerHTML =
                            "👑 PRO";

                        planBadge.classList.add(
                            "pro-plan"
                        );

                        upgradeBtn.style.display =
                            "none";

                    }

                    /* FREE */

                    else {

                        planBadge.innerHTML =
                            "🟢 FREE";

                        planBadge.classList.add(
                            "free-plan"
                        );

                        upgradeBtn.style.display =
                            "inline-block";

                    }
                });

            const uidUserRef =
                doc(db, "users", user.uid);

            const uidUserSnap =
                await getDoc(uidUserRef);

            if (!uidUserSnap.exists()) {

                await setDoc(
                    uidUserRef,
                    {
                        email: user.email,
                        role: normalizeRole(profileData?.role || "student"),
                        plan: profileData?.plan || "free",
                        subscriptionStatus: "free"
                    }
                );

            }
            else if (!profileData) {

                profileData =
                    uidUserSnap.data();

                currentRole =
                    normalizeRole(profileData?.role || "student");

                const upgradeBtn =
                    document.getElementById("upgradeBtn");

                if (upgradeBtn) {

                    upgradeBtn.onclick =
                        () => openUpgradeModal("pro");

                }

            }

            if (!currentRole) {

                currentRole =
                    normalizeRole(profileData?.role || "student");

            }

            const billingUpgradeBtn =
                document.getElementById("upgradeBtn");

            if (billingUpgradeBtn) {

                billingUpgradeBtn.onclick =
                    () => openUpgradeModal("pro");

            }

            /* =========================
            RESET BUTTONS
            ========================= */

            document.getElementById(
                "usersNav"
            ).style.display =
                "none";

            if (teacherNav) {

                teacherNav.style.display =
                    "none";

            }

            if (usersMobileNav) {

                usersMobileNav.style.display =
                    "none";

            }

            if (teacherMobileNav) {

                teacherMobileNav.style.display =
                    "none";

            }

            if (securityLogsNav) {

                securityLogsNav.style.display =
                    "none";

            }

            if (securityLogsMobileNav) {

                securityLogsMobileNav.style.display =
                    "none";

            }

            if (antiFraudNav) {

                antiFraudNav.style.display =
                    "none";

            }

            if (antiFraudMobileNav) {

                antiFraudMobileNav.style.display =
                    "none";

            }

            addClassBtn.style.display =
                "none";

            addAttendanceBtn.style.display =
                "none";

            addHomeworkBtn.style.display =
                "none";

            addGalleryBtn.style.display =
                "none";

            addGradeBtn.style.display =
                "none";

            addNotificationBtn.style.display =
                "none";

            if (addCalendarEventBtn) {

                addCalendarEventBtn.style.display =
                    "none";

            }

            /* =========================
            ROLE SYSTEM
            ========================= */

            /* SUPERADMIN */
            if (currentRole === "superadmin") {

                document.getElementById(
                    "usersNav"
                ).style.display =
                    "block";

                if (securityLogsNav) {

                    securityLogsNav.style.display =
                        "block";

                }

                if (antiFraudNav) {

                    antiFraudNav.style.display =
                        "block";

                }

                if (usersMobileNav) {

                    usersMobileNav.style.display =
                        "block";

                }

                if (securityLogsMobileNav) {

                    securityLogsMobileNav.style.display =
                        "block";

                }

                if (antiFraudMobileNav) {

                    antiFraudMobileNav.style.display =
                        "block";

                }

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

                addGradeBtn.style.display =
                    "inline-block";

                addNotificationBtn.style.display =
                    "inline-block";

                if (addCalendarEventBtn) {

                    addCalendarEventBtn.style.display =
                        "inline-block";

                }

                showSection(
                    "dashboardSection"
                );

            }

            /* DIRECTOR */

            else if (currentRole === "admin") {

                roleText.innerHTML =
                    "Admin";

                if (securityLogsNav) {

                    securityLogsNav.style.display =
                        "block";

                }

                if (antiFraudNav) {

                    antiFraudNav.style.display =
                        "block";

                }

                if (securityLogsMobileNav) {

                    securityLogsMobileNav.style.display =
                        "block";

                }

                if (antiFraudMobileNav) {

                    antiFraudMobileNav.style.display =
                        "block";

                }

                dashboardTitle.innerHTML =
                    "Admin Dashboard";

                addClassBtn.style.display =
                    "inline-block";

                addAttendanceBtn.style.display =
                    "inline-block";

                addGalleryBtn.style.display =
                    "inline-block";

                addGradeBtn.style.display =
                    "inline-block";

                addNotificationBtn.style.display =
                    "inline-block";

                if (addCalendarEventBtn) {

                    addCalendarEventBtn.style.display =
                        "inline-block";

                }

                showSection(
                    "dashboardSection"
                );

            }

            /* DEPUTY */

            else if (currentRole === "admin") {

                roleText.innerHTML =
                    "Admin";

                dashboardTitle.innerHTML =
                    "Admin Dashboard";

                addAttendanceBtn.style.display =
                    "inline-block";

                addHomeworkBtn.style.display =
                    "inline-block";

                addGradeBtn.style.display =
                    "inline-block";

                addNotificationBtn.style.display =
                    "inline-block";

                if (addCalendarEventBtn) {

                    addCalendarEventBtn.style.display =
                        "inline-block";

                }

                showSection(
                    "attendanceSection"
                );

            }

            /* TEACHER */

            else if (currentRole === "teacher") {

                if (teacherNav) {

                    teacherNav.style.display =
                        "block";

                }

                if (teacherMobileNav) {

                    teacherMobileNav.style.display =
                        "block";

                }

                roleText.innerHTML =
                    "Teacher";

                dashboardTitle.innerHTML =
                    "👨‍🏫 Teacher Dashboard";

                addAttendanceBtn.style.display =
                    "inline-block";

                addHomeworkBtn.style.display =
                    "inline-block";

                addGradeBtn.style.display =
                    "inline-block";

                addNotificationBtn.style.display =
                    "inline-block";

                if (addCalendarEventBtn) {

                    addCalendarEventBtn.style.display =
                        "inline-block";

                }

                showSection(
                    "teacherSection"
                );

            }

            /* STUDENT */

            else {

                roleText.innerHTML =
                    "Student";

                dashboardTitle.innerHTML =
                    "🎓 Student Dashboard";

                showSection(
                    "attendanceSection"
                );

            }

            configureRoleAccess();

            if (pendingLoginAuditEmail === user.email) {

                await saveAuditLog({
                    event: "login",
                    category: "auth",
                    action: "User logged in",
                    severity: "info",
                    details: `${user.email} authenticated successfully as ${currentRole || "student"}.`
                });

                pendingLoginAuditEmail =
                    "";

            }

            loadAll();

        }
        else {

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
    function (sectionId) {
        /* RESET ACTIVE */

        document.querySelectorAll(
            ".nav-item"
        ).forEach(item => {

            item.classList.remove(
                "active-nav"
            );

        });
        if (!canAccessPage(sectionId)) {

            showAccessDenied(sectionId);
            return;

        }
        document.getElementById(
            "dashboardSection"
        ).style.display =
            "none";

        document.getElementById(
            "teacherSection"
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
            "notificationsSection"
        ).style.display =
            "none";

        document.getElementById(
            "gradesSection"
        ).style.display =
            "none";

        document.getElementById(
            "calendarSection"
        ).style.display =
            "none";

        if (securityLogsSection) {

            securityLogsSection.style.display =
                "none";

        }

        if (antiFraudSection) {

            antiFraudSection.style.display =
                "none";

        }

        if (accessDeniedSection) {

            accessDeniedSection.style.display =
                "none";

        }

        if (subscriptionSection) {

            subscriptionSection.style.display =
                "none";

        }

        document.getElementById(
            "usersSection"
        ).style.display =
            "none";
        document.getElementById(
            sectionId
        ).style.display =
            "block";

        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );

        if (mobileMenu) {

            mobileMenu.classList.remove(
                "active"
            );

        }

        const sidebarOverlay =
            document.getElementById(
                "sidebarOverlay"
            );

        if (sidebarOverlay) {

            sidebarOverlay.classList.remove(
                "active"
            );

        }
        /* ACTIVE NAV */

        const navMap = {

            dashboardSection: 0,

            teacherSection: 1,

            classesSection: 2,

            attendanceSection: 3,

            homeworkSection: 4,

            gallerySection: 5,

            aiSection: 6,

            notificationsSection: 7,

            gradesSection: 8,

            calendarSection: 9,

            subscriptionSection: 10,

            securityLogsSection: 11,

            antiFraudSection: 12

        };

        const navIndex =
            navMap[sectionId];

        if (navIndex !== undefined) {

            document.querySelectorAll(
                ".nav-item"
            )[navIndex]
                .classList.add(
                    "active-nav"
                );

        }

        document.querySelectorAll(
            ".nav-item"
        ).forEach((item) => {

            const opensSection =
                (item.getAttribute("onclick") || "")
                    .includes(`'${sectionId}'`);

            item.classList.toggle(
                "active-nav",
                opensSection
            );

        });

        if (sectionId === "calendarSection") {

            setTimeout(() => {

                if (schoolCalendar) {

                    schoolCalendar.updateSize();

                }

            }, 80);

        }

        if (sectionId === "subscriptionSection") {

            renderPricingCards();

        }

        if (sectionId === "securityLogsSection") {

            loadSecurityLogs();

        }

        if (sectionId === "antiFraudSection") {

            loadSecurityLogs();
            renderAntiFraudCenter(securityLogs);

        }

    };

/* =========================
LOGOUT
========================= */

logoutBtn.onclick =
    async () => {

        await saveAuditLog({
            event: "logout",
            category: "auth",
            action: "User logged out",
            severity: "info",
            details: `${currentUserEmail || "Unknown user"} ended the session.`
        });

        await signOut(auth);

    };

/* =========================
LOAD ALL
========================= */
function loadAll() {

    loadClasses();
    loadAttendance();
    loadHomework();
    loadNotifications();
    loadGrades();
    loadRanking();
    loadProfiles();
    loadGallery();
    loadChart();
    initSchoolCalendar();
    loadCalendarEvents();
    loadBillingSystem();

    if (currentRole === "teacher") {

        loadTeacherPanel();

    }

    if (currentRole === "superadmin") {

        loadUsers();

    }

    if (isSecurityAdmin()) {

        loadSecurityLogs();

    }
}

const billingPlans = {
    free: {
        name: "Free",
        price: "$0",
        badge: "FREE",
        copy: "Core classroom visibility for one workspace.",
        features: [
            "Attendance view",
            "Homework tracking",
            "Basic notifications"
        ]
    },
    pro: {
        name: "Pro",
        price: "$29",
        badge: "PRO",
        copy: "Premium tools for growing school operations.",
        features: [
            "AI assistant access",
            "Premium analytics",
            "Priority subscription sync"
        ]
    },
    enterprise: {
        name: "Enterprise",
        price: "Custom",
        badge: "ENTERPRISE",
        copy: "Advanced controls for multi-role administration.",
        features: [
            "Role-based premium access",
            "Fraud monitoring dashboard",
            "Super admin activation controls"
        ]
    }
};

function getActivePlan(subscription) {

    return subscription?.plan || "free";

}

function isPremiumPlan(plan) {

    return plan === "pro" || plan === "enterprise";

}

function formatBillingDate(value) {

    if (!value) return "Just now";

    if (typeof value.toDate === "function") {

        return value.toDate().toLocaleString();

    }

    return new Date(value).toLocaleString();

}

function updatePremiumBadge(subscription = {}) {

    const plan =
        getActivePlan(subscription);

    const status =
        subscription.status || (plan === "free" ? "free" : "active");

    const planBadge =
        document.getElementById("planBadge");

    const upgradeBtn =
        document.getElementById("upgradeBtn");

    if (planBadge) {

        planBadge.style.display =
            "flex";

        planBadge.className =
            isPremiumPlan(plan)
                ? "premium-plan-badge pro-plan"
                : "premium-plan-badge free-plan";

        planBadge.innerHTML =
            `${billingPlans[plan]?.badge || "FREE"} ${status}`;

    }

    if (upgradeBtn) {

        upgradeBtn.style.display =
            currentRole === "superadmin" || isPremiumPlan(plan)
                ? "none"
                : "inline-block";

    }

    if (subscriptionStatusBadge) {

        subscriptionStatusBadge.textContent =
            billingPlans[plan]?.badge || "FREE";

        subscriptionStatusBadge.className =
            isPremiumPlan(plan)
                ? "billing-badge-active"
                : "billing-badge-free";

    }

    if (subscriptionPlanName) {

        subscriptionPlanName.textContent =
            billingPlans[plan]?.name || "Free";

    }

    if (subscriptionMeta) {

        subscriptionMeta.textContent =
            status === "active"
                ? `Active subscription for ${currentUserEmail}`
                : `Viewing ${currentUserEmail || "your"} subscription status`;

    }

    document.body.classList.toggle(
        "has-premium-access",
        isPremiumPlan(plan) && status === "active"
    );

}

function renderPricingCards(activePlan = "free") {

    if (!pricingCards) return;

    pricingCards.innerHTML =
        Object.entries(billingPlans).map(([key, plan]) => {

            const isActive =
                key === activePlan;

            const disabled =
                key === "free" || isActive;

            return `
<div class="pricing-card ${key === "pro" ? "pricing-featured" : ""} ${isActive ? "pricing-active" : ""}">
    <div class="pricing-card-top">
        <span>${plan.badge}</span>
        ${isActive ? `<small>Current</small>` : ""}
    </div>
    <h3>${plan.name}</h3>
    <strong>${plan.price}</strong>
    <p>${plan.copy}</p>
    <ul>
        ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
    <button ${disabled ? "disabled" : ""} onclick="openUpgradeModal('${key}')">
        ${isActive ? "Active plan" : key === "free" ? "Included" : "Upgrade"}
    </button>
</div>
`;

        }).join("");

}

function loadBillingSystem() {

    renderPricingCards();
    updatePremiumBadge();

    if (subscriptionUnsubscribe) subscriptionUnsubscribe();
    if (paymentHistoryUnsubscribe) paymentHistoryUnsubscribe();
    if (transactionLogsUnsubscribe) transactionLogsUnsubscribe();
    if (adminSubscriptionsUnsubscribe) adminSubscriptionsUnsubscribe();

    subscriptionUnsubscribe =
        onSnapshot(
            doc(db, "subscriptions", currentUserId),
            (docSnap) => {

                const subscription =
                    docSnap.exists()
                        ? docSnap.data()
                        : {
                            plan: "free",
                            status: "free"
                        };

                updatePremiumBadge(subscription);
                renderPricingCards(getActivePlan(subscription));

            }
        );

    const ownPaymentsQuery =
        currentRole === "superadmin"
            ? collection(db, "paymentHistory")
            : query(
                collection(db, "paymentHistory"),
                where("userId", "==", currentUserId)
            );

    paymentHistoryUnsubscribe =
        onSnapshot(
            ownPaymentsQuery,
            (snapshot) => renderPaymentHistory(snapshot)
        );

    const ownLogsQuery =
        currentRole === "superadmin"
            ? collection(db, "transactionLogs")
            : query(
                collection(db, "transactionLogs"),
                where("userId", "==", currentUserId)
            );

    transactionLogsUnsubscribe =
        onSnapshot(
            ownLogsQuery,
            (snapshot) => renderTransactionLogs(snapshot)
        );

    if (subscriptionAdminPanel) {

        subscriptionAdminPanel.style.display =
            currentRole === "superadmin"
                ? "block"
                : "none";

    }

    if (currentRole === "superadmin") {

        adminSubscriptionsUnsubscribe =
            onSnapshot(
                collection(db, "users"),
                (snapshot) => renderSubscriptionUsers(snapshot)
            );

    }

}

function sortedSnapshotItems(snapshot) {

    const items = [];

    snapshot.forEach((docSnap) => {

        items.push({
            id: docSnap.id,
            ...docSnap.data()
        });

    });

    return items.sort(
        (a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
    );

}

function renderPaymentHistory(snapshot) {

    if (!paymentHistoryContainer) return;

    const items =
        sortedSnapshotItems(snapshot);

    paymentHistoryContainer.innerHTML =
        items.length
            ? items.slice(0, 12).map((item) => `
<div class="payment-row ${item.status === "failed" ? "payment-row-risk" : ""}">
    <div>
        <strong>${billingPlans[item.plan]?.name || item.plan || "Plan"}</strong>
        <span>${item.email || "School account"}</span>
    </div>
    <div>
        <strong>${item.amount || "$0"}</strong>
        <span>${item.status || "pending"} - ${formatBillingDate(item.createdAt)}</span>
    </div>
</div>
`).join("")
            : `<div class="billing-empty">No payment history yet.</div>`;

}

function renderTransactionLogs(snapshot) {

    if (!transactionLogsContainer) return;

    const items =
        sortedSnapshotItems(snapshot);

    transactionLogsContainer.innerHTML =
        items.length
            ? items.slice(0, 12).map((item) => `
<div class="log-row ${item.risk === "high" ? "log-row-risk" : ""}">
    <span>${item.event || "payment_event"}</span>
    <strong>${item.message || "Synced transaction"}</strong>
    <small>${formatBillingDate(item.createdAt)}</small>
</div>
`).join("")
            : `<div class="billing-empty">No transaction logs yet.</div>`;

}

function renderSubscriptionUsers(snapshot) {

    if (!subscriptionUsersContainer) return;

    subscriptionUsersContainer.innerHTML = "";

    snapshot.forEach((docSnap) => {

        const item = docSnap.data();
        const id = docSnap.id;
        const email = item.email || "";

        const card = document.createElement("div");
        card.className = "subscription-user-card";

        const info = document.createElement("div");
        const nameEl = document.createElement("strong");
        nameEl.textContent = email || id;
        const roleEl = document.createElement("span");
        roleEl.textContent = `${item.role || "student"} - ${item.plan || "free"}`;
        info.appendChild(nameEl);
        info.appendChild(roleEl);

        const actions = document.createElement("div");
        actions.className = "subscription-actions";

        const btnPro = document.createElement("button");
        btnPro.textContent = "Activate Pro";
        btnPro.dataset.id = id;
        btnPro.dataset.email = email;
        btnPro.dataset.plan = "pro";
        btnPro.addEventListener("click", () => activateSubscription(id, "pro", email));

        const btnEnterprise = document.createElement("button");
        btnEnterprise.textContent = "Enterprise";
        btnEnterprise.dataset.id = id;
        btnEnterprise.dataset.email = email;
        btnEnterprise.dataset.plan = "enterprise";
        btnEnterprise.addEventListener("click", () => activateSubscription(id, "enterprise", email));

        const btnFree = document.createElement("button");
        btnFree.textContent = "Set Free";
        btnFree.className = "delete-btn";
        btnFree.dataset.id = id;
        btnFree.dataset.email = email;
        btnFree.addEventListener("click", () => deactivateSubscription(id, email));

        actions.appendChild(btnPro);
        actions.appendChild(btnEnterprise);
        actions.appendChild(btnFree);

        card.appendChild(info);
        card.appendChild(actions);
        subscriptionUsersContainer.appendChild(card);

    });

}

window.openUpgradeModal =
    function (plan) {

        selectedBillingPlan =
            plan;

        if (!upgradeModal) return;

        const billingPlan =
            billingPlans[plan] || billingPlans.pro;

        upgradeModal.classList.add("active");
        upgradeModal.setAttribute("aria-hidden", "false");

        if (upgradeModalTitle) {

            upgradeModalTitle.textContent =
                `Upgrade to ${billingPlan.name}`;

        }

        if (upgradeModalCopy) {

            upgradeModalCopy.textContent =
                `${billingPlan.price} plan request with simulated secure authorization. Super Admin activates approved subscriptions.`;

        }

        if (secureVerificationText) {

            secureVerificationText.textContent =
                "Ready for bank challenge simulation.";

        }

        if (secureVerificationState) {

            secureVerificationState.textContent =
                "Standby";

        }

    };

if (closeUpgradeModal) {

    closeUpgradeModal.onclick =
        () => {

            upgradeModal.classList.remove("active");
            upgradeModal.setAttribute("aria-hidden", "true");

        };

}

if (cardNumberInput) {

    cardNumberInput.oninput =
        () => {

            const digits =
                cardNumberInput.value.replace(/\D/g, "").slice(0, 16);

            cardNumberInput.value =
                digits.replace(/(.{4})/g, "$1 ").trim();

        };

}

if (confirmPaymentBtn) {

    confirmPaymentBtn.onclick =
        async () => {

            if (!currentUserId) return;

            const cardDigits =
                (cardNumberInput?.value || "").replace(/\D/g, "");

            const suspicious =
                cardDigits.length < 16
                || cardDigits.endsWith("0000")
                || Number(cardCvcInput?.value || 0) === 0;

            const plan =
                billingPlans[selectedBillingPlan] || billingPlans.pro;

            const createdAt =
                new Date().toISOString();

            if (secureVerificationState) {

                secureVerificationState.textContent =
                    suspicious ? "Failed" : "Verified";

            }

            if (secureVerificationText) {

                secureVerificationText.textContent =
                    suspicious
                        ? "Bank challenge flagged this simulated payment."
                        : "3D Secure challenge approved in simulation.";

            }

            if (suspicious) {

                failedPaymentAttempts++;

            }

            if (failedAttemptCounter) {

                failedAttemptCounter.textContent =
                    `Failed attempts: ${failedPaymentAttempts}`;

            }

            if (fraudAlertText) {

                fraudAlertText.textContent =
                    suspicious
                        ? "Suspicious payment detected. Super Admin review required."
                        : "Payment request looks normal and is awaiting Super Admin activation.";

            }

            await addDoc(
                collection(db, "paymentHistory"),
                {
                    userId: currentUserId,
                    email: currentUserEmail,
                    plan: selectedBillingPlan,
                    amount: plan.price,
                    cardholder: cardNameInput?.value || "School Admin",
                    status: suspicious ? "failed" : "pending_admin_activation",
                    suspicious,
                    failedAttempts: failedPaymentAttempts,
                    createdAt
                }
            );

            await addDoc(
                collection(db, "transactionLogs"),
                {
                    userId: currentUserId,
                    email: currentUserEmail,
                    event: suspicious ? "fraud_alert" : "payment_authorized",
                    risk: suspicious ? "high" : "low",
                    message: suspicious
                        ? `Suspicious ${plan.name} payment attempt blocked.`
                        : `${plan.name} payment authorized; subscription requires Super Admin activation.`,
                    createdAt
                }
            );

            if (!suspicious) {

                showToast(
                    "Payment request synced. Waiting for Super Admin activation.",
                    "success"
                );

                setTimeout(() => {

                    upgradeModal.classList.remove("active");
                    upgradeModal.setAttribute("aria-hidden", "true");

                }, 700);

            }
            else {

                showToast(
                    "Suspicious payment detected",
                    "error"
                );

            }

        };

}

window.activateSubscription =
    async function (userId, plan, email) {

        if (!can("manageSubscriptions")) {

            alert("Access Denied");
            return;

        }

        const createdAt =
            new Date().toISOString();

        await setDoc(
            doc(db, "subscriptions", userId),
            {
                userId,
                email,
                plan,
                status: "active",
                activatedBy: currentUserEmail,
                updatedAt: createdAt
            }
        );

        await updateDoc(
            doc(db, "users", userId),
            {
                plan,
                subscriptionStatus: "active"
            }
        );

        await addDoc(
            collection(db, "transactionLogs"),
            {
                userId,
                email,
                event: "subscription_activated",
                risk: "low",
                message: `${billingPlans[plan]?.name || plan} activated by Super Admin.`,
                createdAt
            }
        );

        await saveAuditLog({
            event: "subscription_activated",
            category: "admin",
            action: "Activated subscription",
            severity: "info",
            target: email || userId,
            details: `${billingPlans[plan]?.name || plan} subscription activated.`
        });

        showToast("Subscription activated", "success");

    };

window.deactivateSubscription =
    async function (userId, email) {

        if (!can("manageSubscriptions")) {

            alert("Access Denied");
            return;

        }

        const createdAt =
            new Date().toISOString();

        await setDoc(
            doc(db, "subscriptions", userId),
            {
                userId,
                email,
                plan: "free",
                status: "free",
                activatedBy: currentUserEmail,
                updatedAt: createdAt
            }
        );

        await updateDoc(
            doc(db, "users", userId),
            {
                plan: "free",
                subscriptionStatus: "free"
            }
        );

        await addDoc(
            collection(db, "transactionLogs"),
            {
                userId,
                email,
                event: "subscription_deactivated",
                risk: "low",
                message: "Subscription returned to Free by Super Admin.",
                createdAt
            }
        );

        await saveAuditLog({
            event: "subscription_deactivated",
            category: "admin",
            action: "Deactivated subscription",
            severity: "warning",
            target: email || userId,
            details: "Subscription returned to Free."
        });

        showToast("Subscription set to Free", "success");

    };

async function loadTeacherPanel() {

    if (!teacherClassesPreview || !teacherActivityPreview) return;

    renderSkeletons(teacherClassesPreview, 3);
    renderSkeletons(teacherActivityPreview, 3);

    const teacherClassNames =
        await getTeacherClassNames();

    const [
        classSnap,
        homeworkSnap,
        attendanceSnap,
        gradesSnap
    ] =
        await Promise.all([
            getDocs(collection(db, "classes")),
            getDocs(collection(db, "homework")),
            getDocs(collection(db, "attendance")),
            getDocs(collection(db, "grades"))
        ]);

    const myClasses = [];
    const myHomework = [];
    const myAttendance = [];
    const myGrades = [];

    classSnap.forEach((docSnap) => {

        const item =
            docSnap.data();

        if (ownsClass(item)) {

            myClasses.push(item);

        }

    });

    homeworkSnap.forEach((docSnap) => {

        const item =
            docSnap.data();

        if (ownsTeacherRecord(item, teacherClassNames)) {

            myHomework.push(item);

        }

    });

    attendanceSnap.forEach((docSnap) => {

        const item =
            docSnap.data();

        if (ownsTeacherRecord(item, teacherClassNames)) {

            myAttendance.push(item);

        }

    });

    gradesSnap.forEach((docSnap) => {

        const item =
            docSnap.data();

        if (ownsTeacherRecord(item, teacherClassNames)) {

            myGrades.push(item);

        }

    });

    if (teacherClassCount) teacherClassCount.innerHTML = myClasses.length;
    if (teacherHomeworkCount) teacherHomeworkCount.innerHTML = myHomework.length;
    if (teacherGradesCount) teacherGradesCount.innerHTML = myGrades.length;

    const attendanceTotal =
        myAttendance.reduce(
            (sum, item) => sum + Number(item.percent || 0),
            0
        );

    if (teacherAttendanceAvg) {

        teacherAttendanceAvg.innerHTML =
            myAttendance.length
                ? Math.round(attendanceTotal / myAttendance.length) + "%"
                : "0%";

    }

    teacherClassesPreview.innerHTML =
        myClasses.length
            ? myClasses.map((item) => `
<div class="teacher-list-card">
    <div>
        <strong>${item.name}</strong>
        <span>${item.students || 0} students</span>
    </div>
    <button onclick="showSection('attendanceSection')">Manage</button>
</div>
`).join("")
            : `
<div class="teacher-empty-state">
No assigned classes found. Ask an admin to set your email as the class teacher.
</div>
`;

    const activity =
        [
            ...myHomework.slice(-2).map((item) => ({
                label: "Homework",
                text: `${item.title} - ${item.className}`
            })),
            ...myAttendance.slice(-2).map((item) => ({
                label: "Attendance",
                text: `${item.className} - ${item.percent}%`
            })),
            ...myGrades.slice(-2).map((item) => ({
                label: "Grade",
                text: `${item.student} - ${item.score}`
            }))
        ].slice(-6);

    teacherActivityPreview.innerHTML =
        activity.length
            ? activity.map((item) => `
<div class="teacher-list-card">
    <div>
        <strong>${item.label}</strong>
        <span>${item.text}</span>
    </div>
</div>
`).join("")
            : `
<div class="teacher-empty-state">
Teacher activity will appear here after you add attendance, homework, or grades.
</div>
`;

}

function getCalendarColor(type) {

    const colors = {
        schedule: "#2563eb",
        exam: "#f43f5e",
        homework: "#7c3aed",
        event: "#10b981"
    };

    return colors[type] || "#06b6d4";

}

function filteredCalendarEvents() {

    return calendarEvents.filter(
        (event) => calendarFilter === "all"
            || event.extendedProps.type === calendarFilter
    );

}

function refreshCalendarEvents() {

    if (!schoolCalendar) return;

    schoolCalendar.removeAllEvents();
    schoolCalendar.addEventSource(
        filteredCalendarEvents()
    );

}

function initSchoolCalendar() {

    if (!schoolCalendarEl || schoolCalendar || !window.FullCalendar) return;

    schoolCalendar =
        new FullCalendar.Calendar(
            schoolCalendarEl,
            {
                initialView: window.innerWidth < 760
                    ? "listWeek"
                    : "dayGridMonth",
                height: "auto",
                nowIndicator: true,
                selectable: canEditCalendarEvents(),
                editable: canEditCalendarEvents(),
                dayMaxEvents: true,
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                },
                eventClick: async (info) => {

                    if (!canEditCalendarEvents()) {

                        showToast(
                            `${info.event.title} - ${info.event.extendedProps.type}`,
                            "info"
                        );

                        return;

                    }

                    const action =
                        prompt(
                            "Type edit to update this event, delete to remove it, or leave empty to cancel."
                        );

                    if (action === "delete") {

                        await deleteDoc(
                            doc(db, "calendarEvents", info.event.id)
                        );

                        await saveAuditLog({
                            event: "calendar_event_deleted",
                            category: "admin",
                            action: "Deleted calendar event",
                            severity: "warning",
                            target: info.event.title,
                            details: `Calendar event ${info.event.title} was deleted.`
                        });

                        alert("Calendar event deleted");
                        return;

                    }

                    if (action !== "edit") return;

                    const title =
                        prompt("Event title", info.event.title);

                    if (!title) return;

                    const type =
                        prompt(
                            "Type: schedule, exam, homework, event",
                            info.event.extendedProps.type || "event"
                        );

                    const className =
                        prompt(
                            "Class / group",
                            info.event.extendedProps.className || ""
                        );

                    await updateDoc(
                        doc(db, "calendarEvents", info.event.id),
                        {
                            title,
                            type,
                            className,
                            color: getCalendarColor(type)
                        }
                    );

                    await saveAuditLog({
                        event: "calendar_event_updated",
                        category: "admin",
                        action: "Updated calendar event",
                        severity: "info",
                        target: title,
                        details: `${type || "event"} for ${className || "school"}.`
                    });

                    alert("Calendar event updated");

                },
                dateClick: (info) => {

                    if (!canEditCalendarEvents()) return;

                    createCalendarEvent(info.dateStr);

                },
                eventDrop: async (info) => {

                    if (!canEditCalendarEvents()) {

                        info.revert();
                        return;

                    }

                    await updateDoc(
                        doc(db, "calendarEvents", info.event.id),
                        {
                            start: info.event.startStr,
                            end: info.event.endStr || ""
                        }
                    );

                    await saveAuditLog({
                        event: "calendar_event_moved",
                        category: "admin",
                        action: "Moved calendar event",
                        severity: "info",
                        target: info.event.title,
                        details: `Moved to ${info.event.startStr}.`
                    });

                    alert("Calendar event moved");

                },
                eventResize: async (info) => {

                    if (!canEditCalendarEvents()) {

                        info.revert();
                        return;

                    }

                    await updateDoc(
                        doc(db, "calendarEvents", info.event.id),
                        {
                            start: info.event.startStr,
                            end: info.event.endStr || ""
                        }
                    );

                    await saveAuditLog({
                        event: "calendar_event_resized",
                        category: "admin",
                        action: "Resized calendar event",
                        severity: "info",
                        target: info.event.title,
                        details: `Updated event duration ending ${info.event.endStr || "same day"}.`
                    });

                    alert("Calendar event updated");

                }
            }
        );

    schoolCalendar.render();

    document.querySelectorAll(".calendar-filter").forEach(
        (button) => {

            button.onclick = () => {

                document.querySelectorAll(".calendar-filter").forEach(
                    (item) => item.classList.remove("active")
                );

                button.classList.add("active");
                calendarFilter =
                    button.dataset.filter || "all";

                refreshCalendarEvents();

            };

        }
    );

}

async function createCalendarEvent(defaultDate = "") {

    if (!canEditCalendarEvents()) {

        alert("Access Denied");
        return;

    }

    const title =
        prompt("Event title");

    if (!title) return;

    const type =
        prompt(
            "Type: schedule, exam, homework, event",
            "event"
        );

    const start =
        prompt(
            "Start date/time (YYYY-MM-DD or YYYY-MM-DDTHH:mm)",
            defaultDate || new Date().toISOString().slice(0, 10)
        );

    if (!start) return;

    const end =
        prompt(
            "End date/time (optional)",
            ""
        );

    const className =
        prompt(
            "Class / group (optional)",
            ""
        );

    await addDoc(
        collection(db, "calendarEvents"),
        {
            title,
            type: type || "event",
            start,
            end,
            className,
            createdBy: currentUserEmail,
            role: currentRole,
            color: getCalendarColor(type || "event")
        }
    );

    await saveAuditLog({
        event: "calendar_event_created",
        category: "admin",
        action: "Created calendar event",
        severity: "info",
        target: title,
        details: `${type || "event"} starts ${start}.`
    });

    alert("Calendar event added");

}

function loadCalendarEvents() {

    if (!schoolCalendarEl) return;

    onSnapshot(
        collection(db, "calendarEvents"),
        (snapshot) => {

            calendarEvents =
                [];

            snapshot.forEach(
                (docSnap) => {

                    const item =
                        docSnap.data();

                    calendarEvents.push({
                        id: docSnap.id,
                        title: item.title,
                        start: item.start,
                        end: item.end || undefined,
                        color: item.color || getCalendarColor(item.type),
                        extendedProps: {
                            type: item.type || "event",
                            className: item.className || "",
                            createdBy: item.createdBy || ""
                        }
                    });

                }
            );

            refreshCalendarEvents();

        }
    );

}

if (addCalendarEventBtn) {

    addCalendarEventBtn.onclick = () => {

        createCalendarEvent();

    };

}
addGalleryBtn.onclick =
    async () => {

        if (!can("manageGallery")) {

            showAccessDenied("gallerySection");
            return;

        }

        const file =
            galleryFile.files[0];

        if (!file) {

            alert(
                "Choose image first"
            );

            return;

        }

        const reader =
            new FileReader();

        reader.onload =
            async function (e) {

                await addDoc(
                    collection(
                        db,
                        "gallery"
                    ),
                    {
                        title: file.name,
                        image: e.target.result
                    }
                );

                await saveAuditLog({
                    event: "gallery_uploaded",
                    category: "admin",
                    action: "Uploaded gallery image",
                    severity: "info",
                    target: file.name,
                    details: "New school gallery image saved."
                });

                loadGallery();

                alert(
                    "Image Uploaded"
                );

            };

        reader.readAsDataURL(file);

    };

window.deleteGallery =
    async function (id) {

        if (!can("deleteGallery")) {

            showAccessDenied("gallerySection");
            return;

        }

        await deleteDoc(
            doc(db, "gallery", id)
        );

        await saveAuditLog({
            event: "gallery_deleted",
            category: "admin",
            action: "Deleted gallery image",
            severity: "warning",
            target: id,
            details: "Gallery item was removed."
        });

        loadGallery();

    };
window.changeRole =
    async function (id, newRole) {

        if (!can("manageUsers")) {

            showAccessDenied("usersSection");
            return;

        }

        const nextRole =
            normalizeRole(newRole);

        await updateDoc(
            doc(db, "users", id),
            {
                role: nextRole
            }
        );

        await saveAuditLog({
            event: "role_changed",
            category: "admin",
            action: "Changed user role",
            severity: "critical",
            target: id,
            details: `User role changed to ${roleLabel(nextRole)}.`
        });

        loadUsers();

        alert(
            "Role Updated"
        );

    };
async function loadUsers() {

    if (!can("manageUsers")) {

        showAccessDenied("usersSection");
        return;

    }

    renderSkeletons(usersContainer, 4);

    const querySnapshot =
        await getDocs(
            collection(db, "users")
        );

    usersContainer.innerHTML = "";

    querySnapshot.forEach((docSnap) => {

        const item =
            docSnap.data();

        const itemRole =
            normalizeRole(item.role);

        usersContainer.innerHTML += `
<div class="student-card user-management-card">
    <h3>${item.email || docSnap.id}</h3>
    <p><span class="role-badge role-${itemRole}">${roleLabel(itemRole)}</span></p>
    <p>Plan: ${item.plan || "free"} / ${item.subscriptionStatus || "free"}</p>
    <div class="role-action-row">
        ${["superadmin", "admin", "teacher", "student", "parent"].map((role) => `
        <button
            class="${itemRole === role ? "active-role-btn" : ""}"
            onclick="changeRole('${docSnap.id}','${role}')">
            ${roleLabel(role)}
        </button>
        `).join("")}
    </div>
</div>
`;

    });

}
/* =========================
CLASSES
========================= */

addClassBtn.onclick =
    async () => {
        if (
            currentRole !== "superadmin"
            &&
            currentRole !== "admin"
        ) {

            alert(
                "Access Denied"
            );

            return;

        }
        let name =
            prompt("Class Name");

        let teacher =
            prompt("Teacher");

        let students =
            prompt("Students Count");

        if (!name) return;

        await addDoc(
            collection(db, "classes"),
            {
                name,
                teacher,
                teacherEmail: teacher.includes("@") ? teacher : "",
                students
            }
        );

        await saveAuditLog({
            event: "class_created",
            category: "admin",
            action: "Created class",
            severity: "info",
            target: name,
            details: `${students || 0} students assigned to ${teacher || "no teacher"}.`
        });

        loadClasses();

    };

async function loadClasses() {

    renderSkeletons(classesContainer, 4);

    const querySnapshot =
        await getDocs(
            collection(db, "classes")
        );

    classesContainer.innerHTML =
        "";

    let totalStudents = 0;
    let totalTeachers = 0;
    const searchValue =
        classSearch.value
            .toLowerCase();
    querySnapshot.forEach(
        (docSnap) => {

            let item =
                docSnap.data();

            if (!ownsClass(item)) {

                return;

            }

            if (
                !item.name
                    .toLowerCase()
                    .includes(searchValue)
            ) {

                return;

            }
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

${currentRole === "teacher"
                    ? ""
                    : `
<button
class="delete-btn"
onclick="deleteClass('${docSnap.id}')">

Delete

</button>
`
                }

${currentRole === "teacher"
                    ? `
<button onclick="showSection('attendanceSection')">
Attendance
</button>

<button onclick="showSection('homeworkSection')">
Homework
</button>

<button onclick="showSection('gradesSection')">
Grades
</button>
`
                    : ""
                }

</div>

`;

        });

    studentCount.innerHTML =
        totalStudents;

    teacherCount.innerHTML =
        totalTeachers;
    document.getElementById(
        "classesCount"
    ).innerHTML =
        totalTeachers;

}
classSearch.oninput =
    () => {

        loadClasses();

    };
window.deleteClass =
    async function (id) {
        if (
            currentRole !== "superadmin"
            &&
            currentRole !== "admin"
        ) {

            alert(
                "Access Denied"
            );

            return;

        }
        await deleteDoc(
            doc(db, "classes", id)
        );

        await saveAuditLog({
            event: "class_deleted",
            category: "admin",
            action: "Deleted class",
            severity: "warning",
            target: id,
            details: "Class record was removed."
        });

        loadClasses();

    };

/* =========================
ATTENDANCE
========================= */

addAttendanceBtn.onclick =
    async () => {
        if (
            currentRole !== "superadmin"
            &&
            currentRole !== "admin"
            &&
            currentRole !== "teacher"
        ) {

            alert(
                "Access Denied"
            );

            return;

        }

        let className =
            prompt("Class");

        let percent =
            prompt("Attendance %");

        if (!className) return;

        if (!(await teacherCanManageClass(className))) {

            alert(
                "Teachers can only manage their own classes"
            );

            return;

        }

        await addDoc(
            collection(db, "attendance"),
            {
                className,
                percent,
                teacherEmail: isTeacher() ? currentUserEmail : ""
            }
        );

        await saveAuditLog({
            event: "attendance_created",
            category: "admin",
            action: "Added attendance",
            severity: "info",
            target: className,
            details: `Attendance set to ${percent}%.`
        });

        loadAttendance();
        loadTeacherPanel();

    };

async function loadAttendance() {

    renderSkeletons(attendanceContainer, 3);

    const teacherClassNames =
        await getTeacherClassNames();

    const querySnapshot =
        await getDocs(
            collection(db, "attendance")
        );

    attendanceContainer.innerHTML =
        "";

    let total = 0;
    let avg = 0;

    querySnapshot.forEach(
        (docSnap) => {

            let item =
                docSnap.data();

            if (!ownsTeacherRecord(item, teacherClassNames)) {

                return;

            }

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

    if (total > 0) {

        attendancePercent.innerHTML =
            Math.floor(avg / total) + "%";

    }

}

/* =========================
HOMEWORK
========================= */

addHomeworkBtn.onclick =
    async () => {
        if (
            currentRole !== "superadmin"
            &&
            currentRole !== "teacher"
            &&
            currentRole !== "admin"
        ) {

            alert(
                "Access Denied"
            );

            return;

        }
        let title =
            prompt("Homework");

        let className =
            prompt("Class");

        if (!title) return;

        if (!(await teacherCanManageClass(className))) {

            alert(
                "Teachers can only manage their own classes"
            );

            return;

        }

        await addDoc(
            collection(db, "homework"),
            {
                title,
                className,
                teacherEmail: isTeacher() ? currentUserEmail : ""
            }
        );

        await saveAuditLog({
            event: "homework_created",
            category: "admin",
            action: "Added homework",
            severity: "info",
            target: title,
            details: `Homework assigned to ${className || "unknown class"}.`
        });

        loadHomework();
        loadTeacherPanel();

    };

async function loadHomework() {

    renderSkeletons(homeworkContainer, 3);

    const teacherClassNames =
        await getTeacherClassNames();

    const querySnapshot =
        await getDocs(
            collection(db, "homework")
        );

    homeworkContainer.innerHTML =
        "";

    let visibleHomework = 0;

    querySnapshot.forEach(
        (docSnap) => {

            let item =
                docSnap.data();

            if (!ownsTeacherRecord(item, teacherClassNames)) {

                return;

            }

            visibleHomework++;

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
    document.getElementById(
        "homeworkCount"
    ).innerHTML =
        visibleHomework;
}

window.deleteHomework =
    async function (id) {
        if (
            currentRole !== "superadmin"
            &&
            currentRole !== "teacher"
            &&
            currentRole !== "admin"
        ) {

            alert(
                "Access Denied"
            );

            return;

        }

        if (isTeacher()) {

            const homeworkSnap =
                await getDoc(
                    doc(db, "homework", id)
                );

            if (
                homeworkSnap.exists()
                &&
                !ownsTeacherRecord(
                    homeworkSnap.data(),
                    await getTeacherClassNames()
                )
            ) {

                alert(
                    "Teachers can only manage their own classes"
                );

                return;

            }

        }

        await deleteDoc(
            doc(db, "homework", id)
        );

        await saveAuditLog({
            event: "homework_deleted",
            category: "admin",
            action: "Deleted homework",
            severity: "warning",
            target: id,
            details: "Homework record was removed."
        });

        loadHomework();
        loadTeacherPanel();

    };
addNotificationBtn.onclick =
    async () => {
        if (
            currentRole !== "superadmin"
            &&
            currentRole !== "admin"
            &&
            currentRole !== "teacher"
        ) {

            alert(
                "Access Denied"
            );

            return;

        }

        let text =
            prompt(
                "Notification text"
            );

        if (!text) return;

        await addDoc(
            collection(
                db,
                "notifications"
            ),
            {
                text
            }
        );

        await saveAuditLog({
            event: "notification_created",
            category: "admin",
            action: "Created notification",
            severity: "info",
            target: "Notifications",
            details: text
        });

    };
function loadNotifications() {

    renderSkeletons(notificationsContainer, 3);

    onSnapshot(
        collection(
            db,
            "notifications"
        ),
        (snapshot) => {

            notificationsContainer.innerHTML =
                "";
            document.getElementById(
                "notifBadge"
            ).innerHTML =
                snapshot.size;
            document.getElementById(
                "notificationCount"
            ).innerHTML =
                snapshot.size;

            snapshot.forEach(
                (docSnap) => {

                    const item =
                        docSnap.data();

                    notificationsContainer.innerHTML += `

<div class="notification-card">

🔔 ${item.text}

</div>

`;

                });

        }
    );

}
addGradeBtn.onclick =
    async () => {
        if (
            currentRole !== "superadmin"
            &&
            currentRole !== "admin"
            &&
            currentRole !== "teacher"
        ) {

            alert(
                "Access Denied"
            );

            return;

        }

        let student =
            prompt(
                "Student Name"
            );

        let subject =
            prompt(
                "Subject"
            );

        let className =
            prompt(
                "Class"
            );

        let score =
            prompt(
                "Score"
            );

        if (!student) return;

        if (!(await teacherCanManageClass(className))) {

            alert(
                "Teachers can only manage their own classes"
            );

            return;

        }

        await addDoc(
            collection(
                db,
                "grades"
            ),
            {
                student,
                subject,
                className,
                score,
                teacherEmail: isTeacher() ? currentUserEmail : ""
            }
        );

        await saveAuditLog({
            event: "grade_created",
            category: "admin",
            action: "Added grade",
            severity: "info",
            target: student,
            details: `${subject || "Subject"} / ${className || "No class"} scored ${score}.`
        });

        loadTeacherPanel();


    };
/* =========================
RANKING
========================= */
function loadGrades() {
    renderSkeletons(gradesContainer, 3);

    getTeacherClassNames().then((teacherClassNames) => {

    onSnapshot(
        collection(
            db,
            "grades"
        ),
        (snapshot) => {

            gradesContainer.innerHTML =
                "";
            let visibleGrades = 0;

            snapshot.forEach(
                (docSnap) => {

                    const item =
                        docSnap.data();

                    if (!ownsTeacherRecord(item, teacherClassNames)) {

                        return;

                    }

                    visibleGrades++;

                    gradesContainer.innerHTML += `

<div class="student-card">

<h3>
🎓 ${item.student}
</h3>

<p>
📚 ${item.subject}
</p>

<p>
🏫 ${item.className || "No class"}
</p>

<p>
⭐ ${item.score}
</p>

</div>

`;

                });

            document.getElementById(
                "gradesCount"
            ).innerHTML =
                visibleGrades;

        }
    );

    });

}
function loadProfiles() {

    renderSkeletons(profilesContainer, 3);

    onSnapshot(
        collection(
            db,
            "profiles"
        ),
        (snapshot) => {

            profilesContainer.innerHTML =
                "";

            snapshot.forEach(
                (docSnap) => {

                    const item =
                        docSnap.data();

                    profilesContainer.innerHTML += `

<div class="student-card">

<h3>
👤 ${item.name}
</h3>

<p>
🏫 ${item.className}
</p>

<p>
📝 ${item.bio}
</p>

</div>

`;

                });

        }
    );

}
async function loadRanking() {

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


async function loadGallery() {

    renderSkeletons(galleryContainer, 6);

    const querySnapshot =
        await getDocs(
            collection(db, "gallery")
        );

    galleryContainer.innerHTML =
        "";

    querySnapshot.forEach(
        (docSnap) => {

            let item =
                docSnap.data();

            galleryContainer.innerHTML += `
<div class="gallery-card">

<img    
src="${item.image}"
onclick="
openImage(
'${item.image}'
)
">

<h3>${item.title}</h3>
<div class="gallery-actions">

<button
class="like-btn"
onclick="
likePost(
'${docSnap.id}'
)
">

❤️ Like
<span id="like-${docSnap.id}">
0
</span>

</button>

<button
class="comment-btn">

💬 Comment

</button>

<button
class="share-btn"
onclick="
sharePost(
'${item.image}'
)
">

🔁 Share

</button>

</div>
<div class="comment-box">

<input
type="text"
placeholder="Write a comment..."
class="comment-input"
id="commentInput-${docSnap.id}">

<button
class="send-comment-btn"
onclick="
sendComment(
'${docSnap.id}'
)
">

Send

</button>

</div>

<div
class="comments-list"
id="comments-${docSnap.id}">

</div>
        
${currentRole === "superadmin"
                    ? `
    <button
    class="delete-btn"
    onclick="
    deleteGallery(
    '${docSnap.id}'
    )
    ">
    
    Delete
    
    </button>
    `
                    : ""
                }

</div>
`;

        
            const commentsQuery =
                query(
                    collection(
                        db,
                        "galleryComments"
                    ),
                    where(
                        "imageId",
                        "==",
                        docSnap.id
                    )
                );

            onSnapshot(
                commentsQuery,
                (snapshot) => {
                    const likesQuery =
                        query(
                            collection(
                                db,
                                "galleryLikes"
                            ),
                            where("postId","==",docSnap.id)
                        );

                    onSnapshot(
                        likesQuery,
                        (snapshot) => {

                            snapshot.forEach(
                                (likeDoc) => {

                                    const likeData =
                                        likeDoc.data();

                                    document.getElementById(
                                        "like-" + docSnap.id
                                    ).innerHTML =
                                        likeData.count || 0;

                                }
                            );

                        }
                    );

                    const commentsBox =
                        document.getElementById(
                            "comments-" + docSnap.id
                        );

                    commentsBox.innerHTML =
                        "";

                        snapshot.forEach(
                            (commentDoc) => {
    
                                const comment =
                                    commentDoc.data();
    
                                commentsBox.innerHTML += `
    
    <p>
    <b>
    ${comment.user}
    </b>
    
    <br>
    
    ${comment.text}
    
    </p>
    
    `;
    
                            }
                        );
    
                    });
    
            });
    
    }
        
    window.likePost =
        async function (id) {

            const userEmail =
                auth.currentUser.email;

            /* CHECK USER LIKE */

            const userLikeQuery =
                query(
                    collection(
                        db,
                        "galleryUserLikes"
                    ),
                    where(
                        "postId",
                        "==",
                        id
                    ),
                    where(
                        "user",
                        "==",
                        userEmail
                    )
                );

            const userLikeSnap =
                await getDocs(
                    userLikeQuery
                );

            /* ALREADY LIKED */

            if (!userLikeSnap.empty) {

                alert(
                    "You already liked this post"
                );

                return;

            }

            /* SAVE USER LIKE */

            await addDoc(
                collection(
                    db,
                    "galleryUserLikes"
                ),
                {
                    postId: id,
                    user: userEmail
                }
            );

            /* MAIN LIKE */

            const likesQuery =
                query(
                    collection(
                        db,
                        "galleryLikes"
                    ),
                    where(
                        "postId",
                        "==",
                        id
                    )
                );

            const likesSnap =
                await getDocs(
                    likesQuery
                );

            if (likesSnap.empty) {

                await addDoc(
                    collection(
                        db,
                        "galleryLikes"
                    ),
                    {
                        postId: id,
                        count: 1
                    }
                );

            }
            else {

                likesSnap.forEach(
                    async (docSnap) => {

                        const data =
                            docSnap.data();

                        await updateDoc(
                            doc(
                                db,
                                "galleryLikes",
                                docSnap.id
                            ),
                            {
                                count:
                                    (data.count || 0) + 1
                            }
                        );

                    }
                );

            }

        };

    window.sendComment =
        async function (id) {

            const input =
                document.getElementById(
                    "commentInput-" + id
                );

            const text =
                input.value;

            if (!text) return;

            await addDoc(
                collection(
                    db,
                    "galleryComments"
                ),
                {
                    imageId: id,
                    text: text,
                    user:
                        auth.currentUser.email
                }
            );

            input.value = "";

        };

    /* =========================
    CHART
    ========================= */

    function loadChart() {

        const ctx =
            document.getElementById(
                "statsChart"
            );

        if (!ctx) return;

        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [
                    "Students",
                    "Teachers",
                    "Attendance",
                    "Homework"
                ],

                datasets: [{

                    label: "36 School",

                    data: [
                        120,
                        20,
                        95,
                        90
                    ],

                    borderRadius: 14,

                    backgroundColor: [
                        "#2563eb",
                        "#38bdf8",
                        "#7c3aed",
                        "#ec4899"
                    ]

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        labels: {
                            color: "#111827"
                        }

                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        }

                    },

                    y: {

                        grid: {
                            color: "rgba(0,0,0,0.08)"
                        }

                    }

                }

            }

        });

    }
    /* =========================
    AI CHAT
    ========================= */

    sendAiBtn.onclick =
        async () => {

            const userMessage =
                aiInput.value;

            if (!userMessage) return;

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

<div class="typing-dots">
    <span></span>
    <span></span>
    <span></span>
</div>

</div>

`;

            aiChatBox.scrollTop =
                aiChatBox.scrollHeight;
            try {

                /* MODEL */
                const response =
                    await fetch(
                        "https://three6-school-system.onrender.com/ai",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                message: userMessage
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
            catch (error) {

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

    languageSelect.onchange = () => {

        const lang =
            languageSelect.value;

        /* UZBEK */

        if (lang === "uz") {

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

        else {

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
    themeToggle.onclick =
        () => {

            document.body.classList.toggle(
                "light-mode"
            );

            if (
                document.body.classList.contains(
                    "light-mode"
                )
            ) {

                themeToggle.innerHTML =
                    "☀️ Light Mode";

            }
            else {

                themeToggle.innerHTML =
                    "🌙 Dark Mode";

            }

        };
    /* MOBILE MENU */

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );

    const sidebarOverlay =
        document.getElementById(
            "sidebarOverlay"
        );

    if (menuBtn && mobileMenu) {

        menuBtn.onclick = () => {

            mobileMenu.classList.toggle(
                "active"
            );

            if (sidebarOverlay) {

                sidebarOverlay.classList.toggle(
                    "active",
                    mobileMenu.classList.contains("active")
                );

            }

        };

    }

    if (sidebarOverlay && mobileMenu) {

        sidebarOverlay.onclick = () => {

            mobileMenu.classList.remove("active");
            sidebarOverlay.classList.remove("active");

        };

    }

    const updateDashboardNavState =
        () => {

            document.body.classList.toggle(
                "nav-collapsed",
                window.scrollY > 56
            );

        };

    window.addEventListener(
        "scroll",
        updateDashboardNavState,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateDashboardNavState
    );

    updateDashboardNavState();

    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            (event) => {

                if (!event.target.closest(".mobile-item")) return;

                mobileMenu.classList.remove("active");

                if (sidebarOverlay) {

                    sidebarOverlay.classList.remove("active");

                }

            }
        );

    }
    /* IMAGE MODAL */

    window.openImage =
        function (src) {

            document.getElementById(
                "imageModal"
            ).style.display =
                "flex";

            document.getElementById(
                "modalImage"
            ).src =
                src;

        };

    /* CLOSE */

    document.getElementById(
        "closeModal"
    ).onclick =
        () => {

            document.getElementById(
                "imageModal"
            ).style.display =
                "none";

        };

    /* LOADER */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                document.getElementById(
                    "loader"
                ).style.display =
                    "none";

            }, 1500);

        });
    window.sharePost =
        async function (image) {

            if (navigator.share) {

                await navigator.share({

                    title: "36 School",

                    text: "Check this post",

                    url: window.location.href

                });

            }

            else {

                navigator.clipboard.writeText(image);

                alert("Link copied");

            }

        };

    if (galleryFile) {

        galleryFile.onchange = () => {

            if (galleryFile.files[0]) {

                showToast(
                    `${galleryFile.files[0].name} selected`,
                    "success"
                );

            }

        };

    }
