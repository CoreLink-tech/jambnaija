(function () {
  "use strict";

  const AUTH_KEY = "testify_auth";
  const SUBJECTS_KEY = "testify_subjects";
  const ATTEMPTS_KEY = "testify_attempts";
  const RESULT_KEY = "testify_exam_result";
  const BATCHES_KEY = "testify_import_batches";
  const API_BASE_KEY = "testify_api_base";
  const ATTEMPT_SYNC_QUEUE_KEY = "testify_attempt_sync_queue";
  const DEVICE_ID_KEY = "testify_device_id";
  const LOCAL_ADMIN_KEY = "testify_local_admin";
  const LOCAL_STUDENTS_KEY = "testify_local_students";
  const DEFAULT_API_BASE = "http://localhost:4000";
  const DEFAULT_LOCAL_ADMIN_EMAIL = "admin@examforge.com";
  const DEFAULT_LOCAL_ADMIN_PASSWORD = "Admin12345";
  const TIER_STANDARD = "standard";
  const TIER_PREMIUM = "premium";
  const STATUS_PENDING = "pending";
  const STATUS_ACTIVE = "active";
  const STATUS_DEACTIVATED = "deactivated";
  const ADMIN_WHATSAPP_NUMBER = "2349168311809";
  const MODE_STUDY = "study";
  const MODE_CBT = "cbt";

  let studentMode = MODE_STUDY;
  let activeQuiz = null;

  const DEFAULT_SUBJECTS = [
    {
      id: "english",
      name: "English Language",
      description: "Comprehension, lexis, and sentence interpretation.",
      topics: ["Comprehension", "Lexis"],
      questions: [
        { question: "Choose the word nearest in meaning to rapid.", options: ["Slow", "Swift", "Calm", "Quiet"], answerIndex: 1, mode: MODE_STUDY, topic: "Lexis", explanation: "Rapid means very fast. Swift is the nearest meaning." },
        { question: "A passage mainly explains causes and effects. It is what type?", options: ["Narrative", "Descriptive", "Expository", "Poetic"], answerIndex: 2, mode: MODE_CBT, topic: "Comprehension", year: 2023, exam: "JAMB", explanation: "Expository writing explains ideas and relationships clearly." }
      ],
      updatedAt: new Date().toISOString()
    },
    {
      id: "math",
      name: "Mathematics",
      description: "Algebra, geometry, and arithmetic speed drills.",
      topics: ["Algebra", "Arithmetic"],
      questions: [
        { question: "If x + 5 = 13, what is x?", options: ["5", "6", "7", "8"], answerIndex: 3, mode: MODE_STUDY, topic: "Algebra", explanation: "Subtract 5 from both sides, giving x = 8." },
        { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], answerIndex: 1, mode: MODE_CBT, topic: "Arithmetic", year: 2022, exam: "JAMB", explanation: "15% of 200 is 30." }
      ],
      updatedAt: new Date().toISOString()
    }
  ];

  function getJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function safeText(value) {
    return String(value || "").replace(/[<>]/g, "");
  }

  function formatDate(iso) {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
  }

  function makeId(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function formatDuration(totalSeconds) {
    const value = Math.max(0, Number(totalSeconds) || 0);
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    if (hours > 0) {
      return String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
    }
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }

  function normalizeRole(role) {
    const cleanRole = String(role || "").trim().toLowerCase();
    if (cleanRole === "student" || cleanRole === "admin") return cleanRole;
    return "";
  }

  function normalizeAuthSource(source) {
    const cleanSource = String(source || "").trim().toLowerCase();
    return cleanSource === "local" ? "local" : "backend";
  }

  function normalizeTier(tier) {
    const cleanTier = String(tier || "").trim().toLowerCase();
    if (cleanTier === TIER_STANDARD || cleanTier === TIER_PREMIUM) return cleanTier;
    return "";
  }

  function normalizeAccountStatus(status) {
    const cleanStatus = String(status || "").trim().toLowerCase();
    if (cleanStatus === STATUS_PENDING || cleanStatus === STATUS_ACTIVE || cleanStatus === STATUS_DEACTIVATED) {
      return cleanStatus;
    }
    return STATUS_PENDING;
  }

  function getDeviceId() {
    const existing = String(localStorage.getItem(DEVICE_ID_KEY) || "").trim();
    if (existing && existing.length >= 8) return existing;
    const generated = (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
      ? crypto.randomUUID()
      : ("device-" + Date.now() + "-" + Math.random().toString(36).slice(2, 12));
    localStorage.setItem(DEVICE_ID_KEY, generated);
    return generated;
  }

  function buildActivationUrl(email) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanEmail) return "activation.html";
    return "activation.html?email=" + encodeURIComponent(cleanEmail);
  }

  function getWhatsAppActivationUrl() {
    return "https://wa.me/" + ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hello Admin, I need an activation code for my Testify account.");
  }

  function isPremiumAccess(auth) {
    return normalizeTier(auth && auth.effectiveTier) === TIER_PREMIUM;
  }

  function isStandardAccess(auth) {
    return normalizeTier(auth && auth.effectiveTier) === TIER_STANDARD;
  }

  function hasStudentAccess(auth) {
    if (!auth || auth.role !== "student") return false;
    if (auth.status === STATUS_DEACTIVATED) return false;
    return isPremiumAccess(auth) || isStandardAccess(auth);
  }

  function normalizeAuthPayload(auth) {
    if (!auth || typeof auth !== "object") return null;
    const role = normalizeRole(auth.role);
    const email = String(auth.email || "").trim().toLowerCase();
    if (!role || !isValidEmail(email)) return null;
    return {
      loggedIn: auth.loggedIn !== false,
      role,
      source: normalizeAuthSource(auth.source),
      name: role === "admin" ? "Admin" : "Student",
      email,
      username: auth.username ? String(auth.username).trim().toLowerCase() : "",
      userId: auth.userId ? String(auth.userId) : "",
      token: auth.token ? String(auth.token) : "",
      status: normalizeAccountStatus(auth.status),
      planTier: normalizeTier(auth.planTier),
      effectiveTier: normalizeTier(auth.effectiveTier),
      accessSource: String(auth.accessSource || "").trim().toLowerCase(),
      trialPremiumEndsAt: auth.trialPremiumEndsAt ? String(auth.trialPremiumEndsAt) : "",
      trialActive: !!auth.trialActive,
      loginAt: auth.loginAt ? String(auth.loginAt) : new Date().toISOString()
    };
  }

  function getAuth() {
    return normalizeAuthPayload(getJSON(AUTH_KEY, null));
  }

  function setAuth(auth) {
    const payload = normalizeAuthPayload(auth);
    if (!payload) {
      clearAuth();
      return;
    }
    setJSON(AUTH_KEY, payload);
  }

  function clearAuth() { localStorage.removeItem(AUTH_KEY); }
  function getSubjects() { return getJSON(SUBJECTS_KEY, []); }
  function setSubjects(v) { setJSON(SUBJECTS_KEY, v); }
  function getAttempts() { return getJSON(ATTEMPTS_KEY, []); }
  function setAttempts(v) { setJSON(ATTEMPTS_KEY, v); }
  function getBatches() { return getJSON(BATCHES_KEY, []); }
  function setBatches(v) { setJSON(BATCHES_KEY, v); }

  function ensureSeedData() {
    const subjects = getSubjects();
    if (!Array.isArray(subjects) || !subjects.length) setSubjects(DEFAULT_SUBJECTS);
  }

  function ensureBatchesData() {
    if (!Array.isArray(getBatches())) setBatches([]);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getLocalAdminCredentials() {
    const stored = getJSON(LOCAL_ADMIN_KEY, null);
    const email = String(stored && stored.email ? stored.email : DEFAULT_LOCAL_ADMIN_EMAIL).trim().toLowerCase();
    const password = String(stored && stored.password ? stored.password : DEFAULT_LOCAL_ADMIN_PASSWORD);
    return { email, password };
  }

  function getLocalStudents() {
    const stored = getJSON(LOCAL_STUDENTS_KEY, []);
    if (!Array.isArray(stored)) return [];
    return stored
      .map((item) => {
        const email = String(item && item.email ? item.email : "").trim().toLowerCase();
        const password = String(item && item.password ? item.password : "");
        if (!isValidEmail(email) || !password) return null;
        return { email, password };
      })
      .filter(Boolean);
  }

  function setLocalStudents(students) {
    const safeList = Array.isArray(students) ? students : [];
    setJSON(LOCAL_STUDENTS_KEY, safeList);
  }

  function registerLocalStudent(email, password) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPassword = String(password || "");
    if (!isValidEmail(cleanEmail) || cleanPassword.length < 6) {
      return { ok: false, message: "Provide valid email and password (min 6 characters)." };
    }

    const students = getLocalStudents();
    const exists = students.some((item) => item.email === cleanEmail);
    if (exists) {
      return { ok: false, message: "Email already exists (local mode)." };
    }

    students.push({ email: cleanEmail, password: cleanPassword });
    setLocalStudents(students);
    return { ok: true, message: "Student registered in local mode." };
  }

  function verifyLocalStudentCredentials(email, password) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPassword = String(password || "");
    return getLocalStudents().some((item) => item.email === cleanEmail && item.password === cleanPassword);
  }

  function verifyLocalAdminCredentials(email, password) {
    const creds = getLocalAdminCredentials();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPassword = String(password || "");
    return cleanEmail === creds.email && cleanPassword === creds.password;
  }

  function createLocalAuth(role, email) {
    const normalizedRole = normalizeRole(role);
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!normalizedRole || !isValidEmail(cleanEmail)) return null;
    return {
      loggedIn: true,
      role: normalizedRole,
      source: "local",
      name: normalizedRole === "admin" ? "Admin" : "Student",
      email: cleanEmail,
      userId: "local-" + normalizedRole,
      token: "local-token-" + normalizedRole,
      status: normalizedRole === "admin" ? STATUS_ACTIVE : STATUS_PENDING,
      planTier: "",
      effectiveTier: "",
      accessSource: "local",
      trialPremiumEndsAt: "",
      trialActive: false,
      loginAt: new Date().toISOString()
    };
  }

  function getApiBase() {
    const runtimeBaseExamForge = typeof window.EXAMFORGE_API_BASE === "string" ? window.EXAMFORGE_API_BASE : "";
    const runtimeBaseLegacy = typeof window.TESTIFY_API_BASE === "string" ? window.TESTIFY_API_BASE : "";
    const storedBase = localStorage.getItem(API_BASE_KEY) || "";
    const sameOrigin = (window.location && /^https?:$/i.test(String(window.location.protocol || "")))
      ? String(window.location.origin || "").trim()
      : "";
    const chosen = String(runtimeBaseExamForge || runtimeBaseLegacy || storedBase || sameOrigin || DEFAULT_API_BASE).trim();
    return chosen.replace(/\/+$/, "");
  }

  function getApiBaseCandidates() {
    const list = [];
    const primary = getApiBase();
    if (primary) list.push(primary);

    if (window.location && /^https?:$/i.test(String(window.location.protocol || ""))) {
      const sameOrigin = String(window.location.origin || "").trim().replace(/\/+$/, "");
      if (sameOrigin && !list.includes(sameOrigin)) {
        list.push(sameOrigin);
      }
    }

    const fallback = String(DEFAULT_API_BASE || "").trim().replace(/\/+$/, "");
    if (fallback && !list.includes(fallback)) {
      list.push(fallback);
    }

    return list;
  }

  async function apiRequest(path, options) {
    const baseCandidates = getApiBaseCandidates();
    const attemptedUrls = baseCandidates.map((base) => base + path);
    const requestOptions = Object.assign({}, options || {});
    const requestHeaders = Object.assign({}, requestOptions.headers || {});
    const auth = getAuth();

    if (!requestHeaders.Accept) requestHeaders.Accept = "application/json";
    if (!requestHeaders.Authorization && auth && auth.token) {
      requestHeaders.Authorization = "Bearer " + auth.token;
    }
    if (requestOptions.body !== undefined && !requestHeaders["Content-Type"]) {
      requestHeaders["Content-Type"] = "application/json";
    }

    requestOptions.headers = requestHeaders;
    if (requestOptions.body !== undefined && typeof requestOptions.body !== "string") {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }

    const attemptNotes = [];
    for (const url of attemptedUrls) {
      let response = null;
      try {
        // eslint-disable-next-line no-await-in-loop
        response = await fetch(url, requestOptions);
      } catch (error) {
        attemptNotes.push(url + " (network error)");
      }

      if (!response) continue;

      const contentType = String((response.headers && response.headers.get("content-type")) || "").toLowerCase();
      let payload = null;

      if (contentType.includes("application/json")) {
        try {
          // eslint-disable-next-line no-await-in-loop
          payload = await response.json();
        } catch (error) {
          payload = null;
        }
      } else {
        try {
          // Consume body to release stream. No parsing needed for non-JSON responses.
          // eslint-disable-next-line no-await-in-loop
          await response.text();
        } catch (error) {
          // ignore body read failure
        }
      }

      const isLikelyFrontendFallback =
        !response.ok &&
        (response.status === 404 || response.status === 405) &&
        /^\/api\//.test(path) &&
        !contentType.includes("application/json");

      const isLikelyFrontendApiMiss =
        response.ok &&
        /^\/api\//.test(path) &&
        !contentType.includes("application/json");

      if (isLikelyFrontendFallback || isLikelyFrontendApiMiss) {
        attemptNotes.push(url + " (non-API " + response.status + ")");
        continue;
      }

      const message = payload && payload.message
        ? String(payload.message)
        : (response.ok ? "Request successful." : ("Request failed (" + response.status + ")."));

      return {
        ok: response.ok,
        status: response.status,
        data: payload,
        message
      };
    }

    return {
      ok: false,
      status: 0,
      message: "Cannot reach backend API. Tried: " + (attemptNotes.length ? attemptNotes.join(", ") : attemptedUrls.join(", ")) + ". Make sure the backend server is running."
    };
  }

  function toAuthFromBackend(result) {
    const data = result && result.data ? result.data : {};
    const user = data && data.user ? data.user : {};
    const role = normalizeRole(user.role);
    const email = String(user.email || "").trim().toLowerCase();
    const token = String(data.token || "").trim();
    if (!role || !isValidEmail(email) || !token) return null;
    return {
      loggedIn: true,
      role,
      source: "backend",
      name: role === "admin" ? "Admin" : "Student",
      email,
      username: String(user.username || "").trim().toLowerCase(),
      userId: String(user.id || ""),
      token,
      status: normalizeAccountStatus(user.status),
      planTier: normalizeTier(user.planTier),
      effectiveTier: normalizeTier(user.effectiveTier),
      accessSource: String(user.accessSource || "").trim().toLowerCase(),
      trialPremiumEndsAt: user.trialPremiumEndsAt ? String(user.trialPremiumEndsAt) : "",
      trialActive: !!user.trialActive,
      loginAt: new Date().toISOString()
    };
  }

  function backendModeValue(mode) {
    return String(mode || "").trim().toUpperCase() === "CBT" ? MODE_CBT : MODE_STUDY;
  }

  function normalizeBackendQuestion(question, topicNameById) {
    const options = Array.isArray(question && question.options)
      ? question.options.map((option) => safeText(option)).filter(Boolean)
      : [];
    const mode = backendModeValue(question && question.mode);
    const topicId = safeText(question && question.topicId).trim();
    const topic = topicNameById[topicId] || (mode === MODE_STUDY ? "General" : "");
    const normalized = normalizeQuestion({
      id: safeText(question && question.id).trim(),
      question: safeText(question && question.prompt).trim(),
      options,
      answerIndex: Number(question && question.answerIndex),
      mode,
      topic,
      year: Number(question && question.year),
      exam: safeText(question && question.exam).trim() || "JAMB",
      explanation: safeText(question && question.explanation).trim()
    });
    return normalized;
  }

  function normalizeBackendSubject(subject) {
    if (!subject || typeof subject !== "object") return null;
    const name = safeText(subject.name).trim();
    const description = safeText(subject.description).trim();
    if (!name || !description) return null;

    const topicsRaw = Array.isArray(subject.topics) ? subject.topics : [];
    const topicNameById = {};
    const topics = [];
    topicsRaw.forEach((topic) => {
      const id = safeText(topic && topic.id).trim();
      const label = safeText(topic && topic.name).trim();
      if (!id || !label) return;
      topicNameById[id] = label;
      topics.push(label);
    });

    const questions = (Array.isArray(subject.questions) ? subject.questions : [])
      .map((question) => normalizeBackendQuestion(question, topicNameById))
      .filter(Boolean);

    questions.forEach((question) => {
      if (!question.topic) return;
      const exists = topics.some((item) => item.toLowerCase() === question.topic.toLowerCase());
      if (!exists) topics.push(question.topic);
    });

    return {
      id: safeText(subject.id).trim() || makeId("subject"),
      name,
      description,
      topics,
      questions,
      updatedAt: subject.updatedAt ? String(subject.updatedAt) : new Date().toISOString()
    };
  }

  function normalizeBackendAttempt(attempt) {
    if (!attempt || typeof attempt !== "object") return null;
    const score = Number(attempt.score);
    const total = Number(attempt.total);
    const percent = Number(attempt.percent);
    if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) return null;
    const fallbackName = attempt.subject && attempt.subject.name ? attempt.subject.name : "Practice Session";
    return {
      subjectId: safeText(attempt.subject && attempt.subject.id).trim() || safeText(attempt.subjectId).trim() || "",
      subjectName: safeText(attempt.focusLabel).trim() || safeText(fallbackName).trim() || "Practice Session",
      score: Math.round(score),
      total: Math.round(total),
      scorePercent: Number.isFinite(percent) ? Math.max(0, Math.min(100, Math.round(percent))) : Math.round((score / total) * 100),
      createdAt: attempt.createdAt ? String(attempt.createdAt) : new Date().toISOString()
    };
  }

  async function refreshAuthFromBackend() {
    const auth = getAuth();
    if (!auth || !auth.token) return auth;
    if (auth.source === "local") return auth;

    const result = await apiRequest("/api/auth/me");
    if (!result.ok) {
      if (result.status === 401) {
        clearAuth();
      } else if (result.status === 403 && result.data && result.data.needsActivation) {
        const pendingEmail = auth.email || "";
        clearAuth();
        return {
          loggedIn: false,
          role: "student",
          needsActivation: true,
          email: pendingEmail
        };
      }
      return null;
    }

    const user = result && result.data && result.data.user ? result.data.user : null;
    if (!user) return auth;

    const role = normalizeRole(user.role);
    const email = String(user.email || "").trim().toLowerCase();
    if (!role || !isValidEmail(email)) return auth;

    const merged = {
      loggedIn: true,
      role,
      source: "backend",
      name: role === "admin" ? "Admin" : "Student",
      email,
      username: String(user.username || "").trim().toLowerCase(),
      userId: String(user.id || auth.userId || ""),
      token: auth.token,
      status: normalizeAccountStatus(user.status),
      planTier: normalizeTier(user.planTier),
      effectiveTier: normalizeTier(user.effectiveTier),
      accessSource: String(user.accessSource || "").trim().toLowerCase(),
      trialPremiumEndsAt: user.trialPremiumEndsAt ? String(user.trialPremiumEndsAt) : "",
      trialActive: !!user.trialActive,
      loginAt: auth.loginAt || new Date().toISOString()
    };
    setAuth(merged);
    return merged;
  }

  async function syncSubjectsFromBackend() {
    const result = await apiRequest("/api/subjects?includeQuestions=1");
    if (!result.ok) {
      return { ok: false, message: result.message };
    }

    const list = Array.isArray(result && result.data && result.data.subjects) ? result.data.subjects : [];
    const subjects = list.map(normalizeBackendSubject).filter(Boolean);
    setSubjects(subjects);
    return { ok: true, count: subjects.length };
  }

  function getAttemptSyncQueue() {
    const queue = getJSON(ATTEMPT_SYNC_QUEUE_KEY, []);
    return Array.isArray(queue) ? queue : [];
  }

  function setAttemptSyncQueue(queue) {
    setJSON(ATTEMPT_SYNC_QUEUE_KEY, Array.isArray(queue) ? queue : []);
  }

  function queueAttemptSyncItems(items) {
    const valid = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!valid.length) return;
    const queue = getAttemptSyncQueue();
    setAttemptSyncQueue(queue.concat(valid));
  }

  async function flushAttemptSyncQueue() {
    const auth = getAuth();
    if (!auth || auth.role !== "student" || auth.source !== "backend" || !auth.token) return;

    const queue = getAttemptSyncQueue();
    if (!queue.length) return;

    const remaining = [];
    for (const item of queue) {
      if (!item || typeof item !== "object") continue;
      const subjectId = safeText(item.subjectId).trim();
      const mode = String(item.mode || "").trim().toUpperCase() === "CBT" ? "CBT" : "STUDY";
      const score = Number(item.score);
      const total = Number(item.total);
      const percent = Number(item.percent);
      if (!subjectId || !Number.isFinite(score) || !Number.isFinite(total) || total <= 0 || !Number.isFinite(percent)) {
        continue;
      }

      const payload = {
        subjectId,
        mode,
        focusLabel: safeText(item.focusLabel).trim() || undefined,
        score: Math.max(0, Math.round(score)),
        total: Math.max(1, Math.round(total)),
        percent: Math.max(0, Math.min(100, Math.round(percent)))
      };
      const result = await apiRequest("/api/attempts", {
        method: "POST",
        body: payload
      });

      if (!result.ok) {
        remaining.push(item);
        if (result.status === 401) {
          clearAuth();
          break;
        }
      }
    }

    setAttemptSyncQueue(remaining);
  }

  async function syncAttemptsFromBackend() {
    const auth = getAuth();
    if (!auth || auth.role !== "student") {
      setAttempts([]);
      return { ok: true, count: 0 };
    }
    if (auth.source !== "backend" || !auth.token) {
      const localAttempts = getAttempts();
      return { ok: true, count: Array.isArray(localAttempts) ? localAttempts.length : 0 };
    }

    const result = await apiRequest("/api/attempts/me?limit=100");
    if (!result.ok) {
      if (result.status === 401) clearAuth();
      return { ok: false, message: result.message };
    }

    const list = Array.isArray(result && result.data && result.data.attempts) ? result.data.attempts : [];
    const attempts = list.map(normalizeBackendAttempt).filter(Boolean).reverse();
    setAttempts(attempts);
    return { ok: true, count: attempts.length };
  }

  function questionMode(q) {
    const m = safeText(q && q.mode).trim().toLowerCase();
    if (m === MODE_STUDY || m === MODE_CBT) return m;
    return Number.isInteger(Number(q && q.year)) ? MODE_CBT : MODE_STUDY;
  }

  function normalizeQuestion(raw) {
    if (!raw || typeof raw !== "object") return null;
    const question = safeText(raw.question);
    const options = Array.isArray(raw.options) ? raw.options.map((x) => safeText(x)).filter(Boolean) : [];
    const answerIndex = Number(raw.answerIndex);
    const topic = safeText(raw.topic).trim();
    const yearNum = Number(raw.year);
    const year = Number.isInteger(yearNum) && yearNum >= 1980 && yearNum <= 2100 ? yearNum : null;
    const modeRaw = safeText(raw.mode).trim().toLowerCase();
    const mode = modeRaw === MODE_STUDY || modeRaw === MODE_CBT ? modeRaw : (year !== null ? MODE_CBT : MODE_STUDY);
    if (mode === MODE_CBT && year === null) return null;
    if (mode === MODE_STUDY && !topic) return null;
    if (!question || options.length < 2 || !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) return null;
    return {
      id: safeText(raw.id).trim() || makeId("q"),
      question,
      options,
      answerIndex,
      mode,
      topic,
      year,
      exam: safeText(raw.exam || raw.source).trim() || (year !== null ? "JAMB" : ""),
      explanation: safeText(raw.explanation).trim()
    };
  }

  function normalizeSubject(raw) {
    if (!raw || typeof raw !== "object") return null;
    const name = safeText(raw.name);
    const description = safeText(raw.description);
    if (!name || !description) return null;
    return {
      id: raw.id || (name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now()),
      name,
      description,
      topics: Array.isArray(raw.topics) ? raw.topics.map((t) => safeText(t)).filter(Boolean) : [],
      questions: (Array.isArray(raw.questions) ? raw.questions : []).map(normalizeQuestion).filter(Boolean),
      updatedAt: new Date().toISOString()
    };
  }

  function ensureQuestionIds() {
    const subjects = getSubjects();
    if (!Array.isArray(subjects) || !subjects.length) return;
    let changed = false;
    subjects.forEach((subject) => {
      if (!Array.isArray(subject.questions)) return;
      subject.questions = subject.questions.map((question) => {
        if (question && question.id) return question;
        changed = true;
        return Object.assign({}, question, { id: makeId("q") });
      });
    });
    if (changed) setSubjects(subjects);
  }

  function applyHapticsAndMotion() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsVibrate = typeof navigator.vibrate === "function";
    const page = document.body ? document.body.getAttribute("data-page") : "";
    const disableTilt = page === "admin" || page === "practice";
    const disableAllMotion = page === "practice";

    if (disableAllMotion) return;

    function vibrate(duration) {
      if (supportsVibrate) navigator.vibrate(duration);
    }

    function ripple(event, element) {
      const rect = element.getBoundingClientRect();
      const span = document.createElement("span");
      span.className = "ripple";
      span.style.left = event.clientX - rect.left + "px";
      span.style.top = event.clientY - rect.top + "px";
      element.appendChild(span);
      setTimeout(() => span.remove(), 620);
    }

    document.querySelectorAll(".interactive").forEach((element) => {
      if (element.dataset.interactiveBound === "1") return;
      element.dataset.interactiveBound = "1";
      element.style.position = "relative";
      element.style.overflow = "hidden";

      element.addEventListener("click", (event) => {
        ripple(event, element);
        vibrate(10);
      });
      element.addEventListener("touchstart", () => vibrate(8), { passive: true });
    });

    if (!reducedMotion && !disableTilt) {
      document.querySelectorAll(".tilt").forEach((card) => {
        if (card.dataset.tiltBound === "1") return;
        card.dataset.tiltBound = "1";

        card.addEventListener("pointermove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rx = ((y / rect.height) - 0.5) * -7;
          const ry = ((x / rect.width) - 0.5) * 7;
          card.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
        });

        card.addEventListener("pointerleave", () => {
          card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
        });
      });
    }
  }

  function requireRole(role) {
    const auth = getAuth();
    if (!auth || !auth.loggedIn || !auth.token) {
      window.location.href = role === "admin" ? "admin-login.html" : "hi.html";
      return null;
    }
    if (auth.role !== role) {
      window.location.href = auth.role === "admin" ? "admin.html" : "student.html";
      return null;
    }
    if (role === "student" && !hasStudentAccess(auth)) {
      clearAuth();
      window.location.href = buildActivationUrl(auth.email);
      return null;
    }
    return auth;
  }

  function initStudentLoginPage() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    const message = document.getElementById("loginMessage");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const payload = {
        email: String(email.value || "").trim().toLowerCase(),
        password: String(password.value || ""),
        deviceId: getDeviceId()
      };
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: payload
      });
      const authPayload = toAuthFromBackend(result);

      if (!result.ok || !authPayload || authPayload.role !== "student") {
        const needsActivation = !!(result && result.data && result.data.needsActivation);
        if (needsActivation) {
          message.textContent = result.message || "Activation is required for this account.";
          message.className = "message message-error";
          setTimeout(() => {
            window.location.href = buildActivationUrl(payload.email);
          }, 700);
          return;
        }

        message.textContent = result.message || "Invalid student credentials.";
        message.className = "message message-error";
        return;
      }
      setAuth(authPayload);
      window.location.href = "student.html";
    });
  }

  function initAdminLoginPage() {
    const form = document.getElementById("adminLoginForm");
    if (!form) return;
    const email = document.getElementById("adminLoginEmail");
    const password = document.getElementById("adminLoginPassword");
    const message = document.getElementById("adminLoginMessage");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const cleanEmail = String(email.value || "").trim().toLowerCase();
      const cleanPassword = String(password.value || "").trim();
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: {
          email: cleanEmail,
          password: cleanPassword,
          deviceId: getDeviceId()
        }
      });
      const authPayload = toAuthFromBackend(result);

      if (!result.ok || !authPayload || authPayload.role !== "admin") {
        const backendUnreachable = !result.ok && result.status === 0;
        if (backendUnreachable && verifyLocalAdminCredentials(cleanEmail, cleanPassword)) {
          const localAuth = createLocalAuth("admin", cleanEmail);
          if (localAuth) {
            setAuth(localAuth);
            window.location.href = "admin.html";
            return;
          }
        }

        message.textContent = !result.ok
          ? result.message
          : "This account is not an admin.";
        if (backendUnreachable) {
          message.textContent += " Offline fallback requires local admin credentials.";
        }
        message.className = "message message-error";
        return;
      }
      setAuth(authPayload);
      window.location.href = "admin.html";
    });
  }

  function initStudentRegisterPage() {
    const form = document.getElementById("studentRegisterForm");
    if (!form) return;
    const username = document.getElementById("studentRegisterUsername");
    const email = document.getElementById("studentRegisterEmail");
    const password = document.getElementById("studentRegisterPassword");
    const message = document.getElementById("studentRegisterMessage");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const cleanUsername = String((username && username.value) || "").trim().toLowerCase();
      const cleanEmail = String(email.value || "").trim().toLowerCase();
      const cleanPassword = String(password.value || "");
      if (!cleanUsername) {
        message.textContent = "Username is required.";
        message.className = "message message-error";
        return;
      }
      const result = await apiRequest("/api/auth/register/student", {
        method: "POST",
        body: {
          username: cleanUsername,
          email: cleanEmail,
          password: cleanPassword,
          deviceId: getDeviceId()
        }
      });
      if (result.ok) {
        message.textContent = (result.message || "Registration successful.") + " Login to continue.";
        message.className = "message message-success";
        form.reset();
        setTimeout(() => { window.location.href = "hi.html"; }, 900);
        return;
      }

      message.textContent = result.message;
      message.className = "message message-error";
    });
  }

  function initActivationPage() {
    const form = document.getElementById("activationForm");
    if (!form) return;
    const emailInput = document.getElementById("activationEmail");
    const passwordInput = document.getElementById("activationPassword");
    const codeInput = document.getElementById("activationCode");
    const message = document.getElementById("activationMessage");
    const getCodeBtn = document.getElementById("getActivationCodeBtn");
    const activateNowBtn = document.getElementById("activateNowBtn");

    const params = new URLSearchParams(window.location.search || "");
    const emailFromQuery = String(params.get("email") || "").trim().toLowerCase();
    if (emailFromQuery && emailInput) {
      emailInput.value = emailFromQuery;
    }
    if (getCodeBtn) {
      getCodeBtn.setAttribute("href", getWhatsAppActivationUrl());
    }
    if (activateNowBtn) {
      activateNowBtn.setAttribute("href", getWhatsAppActivationUrl());
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const payload = {
        email: String((emailInput && emailInput.value) || "").trim().toLowerCase(),
        password: String((passwordInput && passwordInput.value) || ""),
        code: String((codeInput && codeInput.value) || "").trim().toLowerCase(),
        deviceId: getDeviceId()
      };
      const result = await apiRequest("/api/auth/activate", {
        method: "POST",
        body: payload
      });
      const authPayload = toAuthFromBackend(result);
      if (!result.ok || !authPayload || authPayload.role !== "student") {
        message.textContent = result.message || "Invalid activation code.";
        message.className = "message message-error";
        return;
      }

      setAuth(authPayload);
      message.textContent = "Activation successful. Redirecting...";
      message.className = "message message-success";
      setTimeout(() => {
        window.location.href = "student.html";
      }, 600);
    });
  }

  function renderAdminTable() {
    const tbody = document.getElementById("subjectTableBody");
    if (!tbody) return;
    const subjects = getSubjects();
    const totalQuestions = subjects.reduce((sum, s) => sum + (s.questions ? s.questions.length : 0), 0);
    const now = new Date().toDateString();
    const updatedToday = subjects.filter((s) => new Date(s.updatedAt).toDateString() === now).length;

    const kpiSubjects = document.getElementById("kpiSubjects");
    const kpiQuestions = document.getElementById("kpiQuestions");
    const kpiUpdated = document.getElementById("kpiUpdated");
    if (kpiSubjects) kpiSubjects.textContent = String(subjects.length);
    if (kpiQuestions) kpiQuestions.textContent = String(totalQuestions);
    if (kpiUpdated) kpiUpdated.textContent = String(updatedToday);

    if (!subjects.length) {
      tbody.innerHTML = "<tr><td colspan=\"6\">No subjects yet. Create one above.</td></tr>";
      return;
    }

    tbody.innerHTML = subjects.map((subject) => {
      const studyCount = (subject.questions || []).filter((question) => questionMode(question) === MODE_STUDY).length;
      const cbtCount = (subject.questions || []).filter((question) => questionMode(question) === MODE_CBT).length;
      return "<tr>" +
        "<td>" + safeText(subject.name) + "</td>" +
        "<td>" + (subject.topics ? subject.topics.length : 0) + "</td>" +
        "<td>" + studyCount + "</td>" +
        "<td>" + cbtCount + "</td>" +
        "<td>" + formatDate(subject.updatedAt) + "</td>" +
        "<td><button class=\"btn btn-soft btn-mini interactive\" type=\"button\" data-delete-id=\"" + safeText(subject.id) + "\">Delete</button></td>" +
      "</tr>";
    }).join("");

    tbody.querySelectorAll("[data-delete-id]").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-delete-id");
        if (hasAdminApiSession()) {
          const result = await apiRequest("/api/admin/subjects/" + encodeURIComponent(String(id || "")), {
            method: "DELETE"
          });
          if (!result.ok && result.status !== 204) return;
          await syncSubjectsFromBackend();
        } else {
          setSubjects(getSubjects().filter((s) => s.id !== id));
        }
        setBatches(getBatches().filter((batch) => batch.subjectId !== id));
        renderAdminTable();
        renderBatchTable();
      });
    });

    refreshAdminSelectors();
    applyHapticsAndMotion();
  }

  function refreshStudyTopicOptions() {
    const subjectSelect = document.getElementById("studySubjectSelect");
    const topicSelect = document.getElementById("studyTopicSelect");
    if (!subjectSelect || !topicSelect) return;

    const subjectId = subjectSelect.value;
    const subject = getSubjects().find((item) => item.id === subjectId);
    if (!subject) {
      topicSelect.innerHTML = "<option value=\"\">No topics yet</option>";
      topicSelect.disabled = true;
      return;
    }

    const topics = subjectTopics(subject, MODE_STUDY);
    if (!topics.length) {
      topicSelect.innerHTML = "<option value=\"\">No topics yet</option>";
      topicSelect.disabled = true;
      return;
    }

    topicSelect.innerHTML = topics.map((topic) => {
      return "<option value=\"" + safeText(topic) + "\">" + safeText(topic) + "</option>";
    }).join("");
    topicSelect.disabled = false;
  }

  function refreshAdminSelectors() {
    const subjects = getSubjects();
    const selects = [
      document.getElementById("topicSubjectSelect"),
      document.getElementById("studySubjectSelect"),
      document.getElementById("jambSubjectSelect"),
      document.getElementById("bulkStudySubjectSelect"),
      document.getElementById("bulkCbtSubjectSelect")
    ].filter(Boolean);

    if (!selects.length) return;

    if (!subjects.length) {
      selects.forEach((select) => {
        select.innerHTML = "<option value=\"\">Create a subject first</option>";
        select.disabled = true;
      });
      refreshStudyTopicOptions();
      return;
    }

    const options = subjects.map((subject) => {
      return "<option value=\"" + safeText(subject.id) + "\">" + safeText(subject.name) + "</option>";
    }).join("");

    selects.forEach((select) => {
      const previous = select.value;
      select.innerHTML = options;
      const exists = subjects.some((subject) => subject.id === previous);
      if (exists) select.value = previous;
      select.disabled = false;
    });

    refreshStudyTopicOptions();
  }

  function hasAdminApiSession() {
    const auth = getAuth();
    return !!(auth && auth.role === "admin" && auth.source === "backend" && auth.token);
  }

  function resolveQuestionMode(rawQuestion, forcedMode) {
    if (forcedMode === MODE_STUDY || forcedMode === MODE_CBT) return forcedMode;
    const modeRaw = safeText(rawQuestion && rawQuestion.mode).trim().toLowerCase();
    if (modeRaw === MODE_STUDY || modeRaw === MODE_CBT) return modeRaw;
    const yearNum = Number(rawQuestion && rawQuestion.year);
    const hasYear = Number.isInteger(yearNum) && yearNum >= 1980 && yearNum <= 2100;
    return hasYear ? MODE_CBT : MODE_STUDY;
  }

  function describeQuestionValidationError(rawQuestion, forcedMode) {
    if (!rawQuestion || typeof rawQuestion !== "object") {
      return "Question item must be an object.";
    }

    const mode = resolveQuestionMode(rawQuestion, forcedMode);
    const questionText = safeText(rawQuestion.question).trim();
    if (!questionText) return "Missing 'question' text.";

    const options = Array.isArray(rawQuestion.options)
      ? rawQuestion.options.map((item) => safeText(item).trim()).filter(Boolean)
      : [];
    if (options.length < 2) return "Provide at least 2 non-empty options.";

    const answerIndex = Number(rawQuestion.answerIndex);
    if (!Number.isInteger(answerIndex)) return "'answerIndex' must be an integer.";
    if (answerIndex < 0 || answerIndex >= options.length) {
      return "'answerIndex' is out of range for the provided options.";
    }

    if (mode === MODE_CBT) {
      const year = Number(rawQuestion.year);
      if (!Number.isInteger(year) || year < 1980 || year > 2100) {
        return "CBT question requires 'year' between 1980 and 2100.";
      }
    }

    if (mode === MODE_STUDY) {
      const topic = safeText(rawQuestion.topic).trim();
      if (!topic) return "Study question requires a 'topic'.";
    }

    return "";
  }

  function extractQuestionYear(rawQuestion) {
    const yearNum = Number(rawQuestion && rawQuestion.year);
    if (Number.isInteger(yearNum) && yearNum >= 1980 && yearNum <= 2100) return yearNum;
    return null;
  }

  function makeInvalidEntry(rawQuestion, index, reason) {
    return {
      index,
      year: extractQuestionYear(rawQuestion),
      reason: safeText(reason).trim() || "Invalid question payload."
    };
  }

  function summarizeInvalidEntries(invalidEntries, limit) {
    if (!Array.isArray(invalidEntries) || !invalidEntries.length) return "";
    const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 5;
    const parts = invalidEntries.slice(0, safeLimit).map((item) => {
      const rowText = "Row " + (Number(item.index) + 1);
      const yearText = Number.isInteger(Number(item.year)) ? " (year " + Number(item.year) + ")" : "";
      const reason = safeText(item.reason).trim() || "Invalid question payload.";
      return rowText + yearText + ": " + reason;
    });
    const remaining = Math.max(invalidEntries.length - safeLimit, 0);
    return parts.join(" ") + (remaining ? " +" + remaining + " more." : "");
  }

  function prepareBulkBackendQuestions(rawQuestions, forcedMode) {
    const prepared = [];
    const invalidEntries = [];

    rawQuestions.forEach((rawQuestion, index) => {
      const reason = describeQuestionValidationError(rawQuestion, forcedMode);
      if (reason) {
        invalidEntries.push(makeInvalidEntry(rawQuestion, index, reason));
        return;
      }

      const payload = toBackendQuestionPayload(rawQuestion, forcedMode);
      if (!payload) {
        invalidEntries.push(makeInvalidEntry(rawQuestion, index, "Question could not be normalized."));
        return;
      }

      prepared.push({
        index,
        mode: payload.mode,
        payload: payload.payload
      });
    });

    return { prepared, invalidEntries };
  }

  function toBackendQuestionPayload(rawQuestion, forcedMode) {
    const input = Object.assign({}, rawQuestion || {});
    if (forcedMode === MODE_STUDY || forcedMode === MODE_CBT) input.mode = forcedMode;
    if (input.mode === MODE_CBT && !input.exam) input.exam = "JAMB";

    const question = normalizeQuestion(input);
    if (!question) return null;

    const payload = {
      question: question.question,
      options: question.options,
      answerIndex: question.answerIndex
    };

    if (questionMode(question) === MODE_STUDY) {
      payload.topicName = question.topic || "General";
      if (question.explanation) payload.explanation = question.explanation;
      return { mode: MODE_STUDY, payload, question };
    }

    payload.topicName = question.topic || undefined;
    payload.year = Number(question.year);
    payload.exam = question.exam || "JAMB";
    return { mode: MODE_CBT, payload, question };
  }

  async function addTopicToSubject(subjectId, topicName) {
    const topic = safeText(topicName).trim();
    if (!subjectId || !topic) return false;

    if (hasAdminApiSession()) {
      const result = await apiRequest("/api/admin/topics", {
        method: "POST",
        body: {
          subjectId,
          name: topic
        }
      });
      if (!result.ok) return false;
      await syncSubjectsFromBackend();
      return true;
    }

    const subjects = getSubjects();
    const index = subjects.findIndex((subject) => subject.id === subjectId);
    if (index < 0) return false;

    const subject = subjects[index];
    const existing = (subject.topics || []).some((item) => item.toLowerCase() === topic.toLowerCase());
    if (!existing) {
      subject.topics = (subject.topics || []).concat(topic);
    }
    subject.updatedAt = new Date().toISOString();
    subjects[index] = subject;
    setSubjects(subjects);
    return true;
  }

  async function addQuestionToSubject(subjectId, rawQuestion) {
    const result = await addQuestionsToSubjectBulk(subjectId, [rawQuestion], rawQuestion && rawQuestion.mode ? rawQuestion.mode : null);
    return { ok: result.added > 0 };
  }

  function parseQuestionBulkPayload(rawParsed) {
    if (Array.isArray(rawParsed)) return rawParsed;
    if (rawParsed && typeof rawParsed === "object") {
      if (Array.isArray(rawParsed.questions)) return rawParsed.questions;
      if (Array.isArray(rawParsed.items)) return rawParsed.items;
      return [rawParsed];
    }
    return [];
  }

  function parseCbtQuestionBulkPayload(rawParsed) {
    function toYear(value) {
      const year = Number(value);
      return Number.isInteger(year) && year >= 1980 && year <= 2100 ? year : null;
    }

    function withDefaults(rawQuestion, forcedYear, forcedExam, forcedTopic) {
      if (!rawQuestion || typeof rawQuestion !== "object") return null;
      const question = Object.assign({}, rawQuestion);
      if ((question.year === undefined || question.year === null || question.year === "") && forcedYear !== null) {
        question.year = forcedYear;
      }
      if (!question.exam) question.exam = forcedExam || "JAMB";
      if (!question.topic && forcedTopic) question.topic = forcedTopic;
      return question;
    }

    function parseQuestionsWithContext(list, forcedYear, forcedExam, forcedTopic) {
      const rows = [];
      parseQuestionBulkPayload(list).forEach((question) => {
        const normalized = withDefaults(question, forcedYear, forcedExam, forcedTopic);
        if (normalized) rows.push(normalized);
      });
      return rows;
    }

    function parseMultiYearBlocks(multiYear, baseExam, baseTopic) {
      const rows = [];
      if (Array.isArray(multiYear)) {
        multiYear.forEach((block) => {
          if (!block || typeof block !== "object") return;
          const year = toYear(block.year || block.examYear);
          const exam = safeText(block.exam).trim() || baseExam;
          const topic = safeText(block.topic).trim() || baseTopic;
          rows.push.apply(rows, parseQuestionsWithContext(block, year, exam, topic));
        });
        return rows;
      }

      if (multiYear && typeof multiYear === "object") {
        Object.keys(multiYear).forEach((key) => {
          const year = toYear(key);
          const block = multiYear[key];
          if (Array.isArray(block)) {
            rows.push.apply(rows, parseQuestionsWithContext(block, year, baseExam, baseTopic));
            return;
          }
          if (block && typeof block === "object") {
            const exam = safeText(block.exam).trim() || baseExam;
            const topic = safeText(block.topic).trim() || baseTopic;
            rows.push.apply(rows, parseQuestionsWithContext(block, year, exam, topic));
          }
        });
      }
      return rows;
    }

    function parseByShape(value, baseExam, baseTopic) {
      if (Array.isArray(value)) {
        const arrayRows = parseMultiYearBlocks(value, baseExam, baseTopic);
        if (arrayRows.length) return arrayRows;
        return parseQuestionsWithContext(value, null, baseExam, baseTopic);
      }

      if (!value || typeof value !== "object") {
        return parseQuestionsWithContext(value, null, baseExam, baseTopic);
      }

      const exam = safeText(value.exam).trim() || baseExam || "JAMB";
      const topic = safeText(value.topic).trim() || baseTopic;
      const multiYear = value.years || value.byYear || value.questionsByYear;
      const multiYearRows = parseMultiYearBlocks(multiYear, exam, topic);
      if (multiYearRows.length) return multiYearRows;

      // Handle wrapped payloads such as { data: {...} }, { payload: {...} }, { cbtQuestions: {...} }.
      const wrappers = [value.payload, value.data, value.cbt, value.cbtQuestions, value.questionsData];
      for (const wrapper of wrappers) {
        if (!wrapper || wrapper === value) continue;
        const wrapperRows = parseByShape(wrapper, exam, topic);
        if (wrapperRows.length) return wrapperRows;
      }

      return parseQuestionsWithContext(value, null, exam, topic);
    }

    return parseByShape(rawParsed, "JAMB", "");
  }

  async function addQuestionsToSubjectBulk(subjectId, rawQuestions, forcedMode) {
    if (!subjectId || !Array.isArray(rawQuestions)) return { added: 0, skipped: 0, addedIds: [], invalidEntries: [] };

    if (hasAdminApiSession()) {
      const prep = prepareBulkBackendQuestions(rawQuestions, forcedMode);
      const prepared = prep.prepared;
      const invalidEntries = prep.invalidEntries.slice();

      if (!prepared.length) {
        return { added: 0, skipped: rawQuestions.length, addedIds: [], invalidEntries };
      }

      const mode = forcedMode === MODE_CBT ? MODE_CBT : forcedMode === MODE_STUDY ? MODE_STUDY : prepared[0].mode;
      const rows = prepared.filter((item) => item.mode === mode);
      if (!rows.length) {
        return { added: 0, skipped: rawQuestions.length, addedIds: [], invalidEntries };
      }

      const path = mode === MODE_CBT ? "/api/admin/questions/bulk/cbt" : "/api/admin/questions/bulk/study";
      const chunkSize = 120;
      let added = 0;
      let skipped = invalidEntries.length;
      const addedIds = [];

      for (let index = 0; index < rows.length; index += chunkSize) {
        const chunk = rows.slice(index, index + chunkSize);
        // eslint-disable-next-line no-await-in-loop
        const result = await apiRequest(path, {
          method: "POST",
          body: {
            subjectId,
            questions: chunk.map((item) => item.payload)
          }
        });

        if (!result.ok) {
          skipped += chunk.length;
          chunk.forEach((item) => {
            invalidEntries.push(makeInvalidEntry(rawQuestions[item.index], item.index, result.message || "Server rejected this question."));
          });
          continue;
        }

        const stats = result && result.data && result.data.stats ? result.data.stats : {};
        const chunkAddedRaw = Number(stats.added);
        const chunkAdded = Number.isFinite(chunkAddedRaw) ? chunkAddedRaw : chunk.length;
        const chunkSkippedRaw = Number(stats.skipped);
        const chunkSkipped = Number.isFinite(chunkSkippedRaw)
          ? chunkSkippedRaw
          : Math.max(chunk.length - chunkAdded, 0);
        added += chunkAdded;
        skipped += chunkSkipped;

        if (Array.isArray(result && result.data && result.data.errors)) {
          result.data.errors.forEach((serverError) => {
            const localIndex = Number(serverError && serverError.index);
            if (!Number.isInteger(localIndex) || localIndex < 0 || localIndex >= chunk.length) return;
            const row = chunk[localIndex];
            invalidEntries.push(makeInvalidEntry(
              rawQuestions[row.index],
              row.index,
              serverError && serverError.message
                ? serverError.message
                : "Server rejected this question."
            ));
          });
        }

        if (Array.isArray(result && result.data && result.data.ids)) {
          result.data.ids.forEach((id) => {
            const text = String(id || "").trim();
            if (text) addedIds.push(text);
          });
        }
      }

      if (added > 0) await syncSubjectsFromBackend();
      return { added, skipped, addedIds, invalidEntries };
    }

    const subjects = getSubjects();
    const index = subjects.findIndex((subject) => subject.id === subjectId);
    if (index < 0) return { added: 0, skipped: rawQuestions.length, addedIds: [], invalidEntries: [] };

    const subject = subjects[index];
    const validQuestions = [];
    const invalidEntries = [];

    rawQuestions.forEach((rawQuestion, rowIndex) => {
      const input = Object.assign({}, rawQuestion || {});
      if (forcedMode === MODE_STUDY || forcedMode === MODE_CBT) {
        input.mode = forcedMode;
      }
      if (input.mode === MODE_CBT && !input.exam) {
        input.exam = "JAMB";
      }

      const reason = describeQuestionValidationError(input, forcedMode);
      if (reason) {
        invalidEntries.push(makeInvalidEntry(rawQuestion, rowIndex, reason));
        return;
      }

      const question = normalizeQuestion(input);
      if (question) {
        validQuestions.push(question);
      } else {
        invalidEntries.push(makeInvalidEntry(rawQuestion, rowIndex, "Question could not be normalized."));
      }
    });

    if (!validQuestions.length) {
      return { added: 0, skipped: rawQuestions.length, addedIds: [], invalidEntries };
    }

    subject.questions = (subject.questions || []).concat(validQuestions);
    validQuestions.forEach((question) => {
      if (!question.topic) return;
      const exists = (subject.topics || []).some((item) => item.toLowerCase() === question.topic.toLowerCase());
      if (!exists) {
        subject.topics = (subject.topics || []).concat(question.topic);
      }
    });
    subject.updatedAt = new Date().toISOString();
    subjects[index] = subject;
    setSubjects(subjects);

    return {
      added: validQuestions.length,
      skipped: Math.max(rawQuestions.length - validQuestions.length, 0),
      addedIds: validQuestions.map((question) => question.id),
      invalidEntries
    };
  }

  function recordImportBatch(type, subjectId, addedIds, fileName) {
    if (!subjectId || !Array.isArray(addedIds) || !addedIds.length) return;
    const subject = getSubjects().find((item) => item.id === subjectId);
    const batches = getBatches();
    batches.push({
      id: makeId("batch"),
      type: type === MODE_CBT ? MODE_CBT : MODE_STUDY,
      subjectId,
      subjectName: subject ? subject.name : subjectId,
      questionIds: addedIds.slice(),
      count: addedIds.length,
      fileName: safeText(fileName).trim() || "upload.json",
      createdAt: new Date().toISOString()
    });
    setBatches(batches);
  }

  async function deleteBatchQuestions(batchId) {
    const batches = getBatches();
    const index = batches.findIndex((batch) => batch.id === batchId);
    if (index < 0) return 0;
    const batch = batches[index];
    const ids = new Set(Array.isArray(batch.questionIds) ? batch.questionIds : []);
    if (!ids.size) {
      batches.splice(index, 1);
      setBatches(batches);
      return 0;
    }

    if (hasAdminApiSession()) {
      const result = await apiRequest("/api/admin/questions", {
        method: "DELETE",
        body: {
          ids: Array.from(ids)
        }
      });
      if (!result.ok) return 0;
      const deleted = Number(result && result.data && result.data.deleted);
      batches.splice(index, 1);
      setBatches(batches);
      await syncSubjectsFromBackend();
      return Number.isFinite(deleted) ? deleted : ids.size;
    }

    const subjects = getSubjects();
    let removed = 0;
    subjects.forEach((subject) => {
      const before = Array.isArray(subject.questions) ? subject.questions.length : 0;
      subject.questions = (subject.questions || []).filter((question) => !ids.has(question.id));
      const diff = Math.max(before - subject.questions.length, 0);
      if (diff > 0) subject.updatedAt = new Date().toISOString();
      removed += diff;
    });
    setSubjects(subjects);
    batches.splice(index, 1);
    setBatches(batches);
    return removed;
  }

  async function clearSubjectsData() {
    if (hasAdminApiSession()) {
      const subjects = getSubjects();
      let failed = 0;
      for (const subject of subjects) {
        // eslint-disable-next-line no-await-in-loop
        const result = await apiRequest("/api/admin/subjects/" + encodeURIComponent(subject.id), {
          method: "DELETE"
        });
        if (!result.ok && result.status !== 204) failed += 1;
      }
      if (failed > 0) {
        await syncSubjectsFromBackend();
      } else {
        setSubjects([]);
      }
      setBatches([]);
      return;
    }

    setSubjects([]);
    setBatches([]);
  }

  async function clearTopicsData() {
    if (hasAdminApiSession()) {
      const result = await apiRequest("/api/admin/topics", { method: "DELETE" });
      if (!result.ok) return;
      await syncSubjectsFromBackend();
      return;
    }

    const subjects = getSubjects();
    subjects.forEach((subject) => {
      subject.topics = [];
      subject.updatedAt = new Date().toISOString();
    });
    setSubjects(subjects);
  }

  async function clearQuestionsByMode(mode) {
    if (hasAdminApiSession()) {
      const modeValue = mode === MODE_CBT ? "CBT" : "STUDY";
      const result = await apiRequest("/api/admin/questions", {
        method: "DELETE",
        body: {
          mode: modeValue
        }
      });
      if (!result.ok) return;
      await syncSubjectsFromBackend();
      if (mode === MODE_STUDY || mode === MODE_CBT) {
        setBatches(getBatches().filter((batch) => batch.type !== mode));
      }
      return;
    }

    const subjects = getSubjects();
    subjects.forEach((subject) => {
      subject.questions = (subject.questions || []).filter((question) => questionMode(question) !== mode);
      subject.updatedAt = new Date().toISOString();
    });
    setSubjects(subjects);
    if (mode === MODE_STUDY || mode === MODE_CBT) {
      setBatches(getBatches().filter((batch) => batch.type !== mode));
    }
  }

  async function clearAllBatchQuestions() {
    const batchIds = getBatches().map((batch) => batch.id);
    let removed = 0;
    for (const id of batchIds) {
      // eslint-disable-next-line no-await-in-loop
      removed += await deleteBatchQuestions(id);
    }
    return removed;
  }

  function renderBatchTable() {
    const tbody = document.getElementById("batchTableBody");
    if (!tbody) return;
    const batches = getBatches().slice().reverse();
    if (!batches.length) {
      tbody.innerHTML = "<tr><td colspan=\"6\">No upload batches yet.</td></tr>";
      return;
    }

    tbody.innerHTML = batches.map((batch) => {
      return "<tr>" +
        "<td>" + (batch.type === MODE_CBT ? "CBT" : "Study") + "</td>" +
        "<td>" + safeText(batch.subjectName) + "</td>" +
        "<td>" + Number(batch.count || 0) + "</td>" +
        "<td>" + safeText(batch.fileName) + "</td>" +
        "<td>" + formatDate(batch.createdAt) + "</td>" +
        "<td><button type=\"button\" class=\"btn btn-soft btn-mini\" data-delete-batch=\"" + safeText(batch.id) + "\">Delete Batch Questions</button></td>" +
      "</tr>";
    }).join("");

    tbody.querySelectorAll("[data-delete-batch]").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-delete-batch");
        const removed = await deleteBatchQuestions(id);
        const message = document.getElementById("adminCleanupMessage");
        if (message) {
          message.textContent = "Batch removed. Deleted " + removed + " question(s).";
          message.className = "message message-success";
        }
        renderBatchTable();
        renderAdminTable();
      });
    });
  }

  function renderActivationCodeTable(codes) {
    const tbody = document.getElementById("activationCodeTableBody");
    if (!tbody) return;
    const rows = Array.isArray(codes) ? codes : [];
    if (!rows.length) {
      tbody.innerHTML = "<tr><td colspan=\"6\">No activation codes generated yet.</td></tr>";
      return;
    }

    tbody.innerHTML = rows.map((item) => {
      const usedBy = item.usedBy
        ? (safeText(item.usedBy.username || "") || safeText(item.usedBy.email || ""))
        : "-";
      return "<tr>" +
        "<td>" + safeText(item.code) + "</td>" +
        "<td>" + safeText(String(item.tier || "").toUpperCase()) + "</td>" +
        "<td>" + (item.isActive ? "Unused" : "Used") + "</td>" +
        "<td>" + usedBy + "</td>" +
        "<td>" + formatDate(item.createdAt) + "</td>" +
        "<td>" + (item.usedAt ? formatDate(item.usedAt) : "-") + "</td>" +
      "</tr>";
    }).join("");
  }

  async function loadActivationCodes(limit) {
    const result = await apiRequest("/api/admin/activation-codes?limit=" + encodeURIComponent(String(limit || 50)));
    if (!result.ok) return { ok: false, message: result.message, codes: [] };
    const codes = Array.isArray(result && result.data && result.data.codes) ? result.data.codes : [];
    renderActivationCodeTable(codes);
    return { ok: true, codes };
  }

  function renderAdminUserTable(users) {
    const tbody = document.getElementById("adminUserTableBody");
    if (!tbody) return;
    const rows = Array.isArray(users) ? users : [];
    if (!rows.length) {
      tbody.innerHTML = "<tr><td colspan=\"8\">No users found.</td></tr>";
      return;
    }

    tbody.innerHTML = rows.map((user) => {
      return "<tr>" +
        "<td>" + safeText(user.username || "-") + "</td>" +
        "<td>" + safeText(user.email) + "</td>" +
        "<td>" + safeText(user.status || "-") + "</td>" +
        "<td>" + safeText(user.effectiveTier || user.planTier || "-") + "</td>" +
        "<td>" + safeText(user.deviceId || "-") + "</td>" +
        "<td>" + (user.trialPremiumEndsAt ? formatDate(user.trialPremiumEndsAt) : "-") + "</td>" +
        "<td>" + formatDate(user.createdAt) + "</td>" +
        "<td class=\"admin-actions\">" +
          "<button type=\"button\" class=\"btn btn-soft btn-mini\" data-user-action=\"activate-standard\" data-user-id=\"" + safeText(user.id) + "\">Activate Standard</button>" +
          "<button type=\"button\" class=\"btn btn-soft btn-mini\" data-user-action=\"activate-premium\" data-user-id=\"" + safeText(user.id) + "\">Activate Premium</button>" +
          "<button type=\"button\" class=\"btn btn-soft btn-mini\" data-user-action=\"deactivate\" data-user-id=\"" + safeText(user.id) + "\">Deactivate</button>" +
          "<button type=\"button\" class=\"btn btn-soft btn-mini\" data-user-action=\"delete\" data-user-id=\"" + safeText(user.id) + "\">Delete</button>" +
        "</td>" +
      "</tr>";
    }).join("");
  }

  async function loadAdminUsers(query) {
    const cleanQuery = String(query || "").trim();
    const path = cleanQuery
      ? "/api/admin/users?query=" + encodeURIComponent(cleanQuery) + "&limit=100"
      : "/api/admin/users?limit=100";
    const result = await apiRequest(path);
    if (!result.ok) return { ok: false, message: result.message, users: [] };
    const users = Array.isArray(result && result.data && result.data.users) ? result.data.users : [];
    renderAdminUserTable(users);
    return { ok: true, users };
  }

  function initAdminAccessTools() {
    const codeForm = document.getElementById("activationCodeForm");
    const codeTier = document.getElementById("activationCodeTier");
    const codeCount = document.getElementById("activationCodeCount");
    const codeMessage = document.getElementById("activationCodeMessage");
    const userSearchForm = document.getElementById("adminUserSearchForm");
    const userSearchQuery = document.getElementById("adminUserSearchQuery");
    const userSearchMessage = document.getElementById("adminUserSearchMessage");
    const userTable = document.getElementById("adminUserTableBody");

    if (!codeForm && !userSearchForm && !userTable) return;

    if (!hasAdminApiSession()) {
      if (codeMessage) {
        codeMessage.textContent = "Activation tools require backend admin login.";
        codeMessage.className = "message message-error";
      }
      if (userSearchMessage) {
        userSearchMessage.textContent = "User management requires backend admin login.";
        userSearchMessage.className = "message message-error";
      }
      return;
    }

    if (codeForm && codeTier && codeCount) {
      codeForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const tierValue = String(codeTier.value || "").trim().toUpperCase() === "PREMIUM" ? "PREMIUM" : "STANDARD";
        const countValue = Number(codeCount.value);
        const result = await apiRequest("/api/admin/activation-codes", {
          method: "POST",
          body: {
            tier: tierValue,
            count: Number.isInteger(countValue) ? countValue : 1
          }
        });

        if (!result.ok) {
          if (codeMessage) {
            codeMessage.textContent = result.message || "Could not generate activation code(s).";
            codeMessage.className = "message message-error";
          }
          return;
        }

        const codes = Array.isArray(result && result.data && result.data.codes) ? result.data.codes : [];
        if (codeMessage) {
          codeMessage.textContent = "Generated " + codes.length + " code(s).";
          codeMessage.className = "message message-success";
        }
        await loadActivationCodes(100);
      });
    }

    if (userSearchForm && userSearchQuery) {
      userSearchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const result = await loadAdminUsers(userSearchQuery.value);
        if (userSearchMessage) {
          userSearchMessage.textContent = result.ok ? ("Found " + result.users.length + " user(s).") : result.message;
          userSearchMessage.className = result.ok ? "message message-success" : "message message-error";
        }
      });
    }

    if (userTable) {
      userTable.addEventListener("click", async (event) => {
        const target = event.target;
        if (!target || !target.getAttribute) return;
        const action = target.getAttribute("data-user-action");
        const userId = target.getAttribute("data-user-id");
        if (!action || !userId) return;

        if (action === "delete") {
          const result = await apiRequest("/api/admin/users/" + encodeURIComponent(userId), { method: "DELETE" });
          if (!result.ok && result.status !== 204) {
            if (userSearchMessage) {
              userSearchMessage.textContent = result.message || "Could not delete user.";
              userSearchMessage.className = "message message-error";
            }
            return;
          }
        } else if (action === "deactivate") {
          const result = await apiRequest("/api/admin/users/" + encodeURIComponent(userId) + "/state", {
            method: "PATCH",
            body: { action: "deactivate" }
          });
          if (!result.ok) {
            if (userSearchMessage) {
              userSearchMessage.textContent = result.message || "Could not deactivate user.";
              userSearchMessage.className = "message message-error";
            }
            return;
          }
        } else {
          const tier = action === "activate-premium" ? "PREMIUM" : "STANDARD";
          const result = await apiRequest("/api/admin/users/" + encodeURIComponent(userId) + "/state", {
            method: "PATCH",
            body: { action: "activate", tier }
          });
          if (!result.ok) {
            if (userSearchMessage) {
              userSearchMessage.textContent = result.message || "Could not activate user.";
              userSearchMessage.className = "message message-error";
            }
            return;
          }
        }

        const refreshed = await loadAdminUsers(userSearchQuery ? userSearchQuery.value : "");
        if (userSearchMessage) {
          userSearchMessage.textContent = refreshed.ok ? "User updated successfully." : refreshed.message;
          userSearchMessage.className = refreshed.ok ? "message message-success" : "message message-error";
        }
      });
    }

    loadActivationCodes(100);
    loadAdminUsers("");
  }

  function initAdminPage() {
    const auth = requireRole("admin");
    if (!auth) return;
    ensureBatchesData();

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => { clearAuth(); window.location.href = "admin-login.html"; });

    const subjectForm = document.getElementById("adminSubjectForm");
    const subjectMessage = document.getElementById("adminSubjectMessage");
    if (subjectForm) {
      subjectForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("adminSubjectName").value.trim();
        const description = document.getElementById("adminSubjectDescription").value.trim();
        const subject = normalizeSubject({ name, description, topics: [], questions: [] });

        if (!subject) {
          subjectMessage.textContent = "Subject name and description are required.";
          subjectMessage.className = "message message-error";
          return;
        }

        const subjects = getSubjects();
        const exists = subjects.some((item) => item.name.toLowerCase() === subject.name.toLowerCase());
        if (exists) {
          subjectMessage.textContent = "A subject with this name already exists.";
          subjectMessage.className = "message message-error";
          return;
        }

        if (hasAdminApiSession()) {
          const result = await apiRequest("/api/admin/subjects", {
            method: "POST",
            body: {
              name: subject.name,
              description: subject.description
            }
          });
          if (!result.ok) {
            subjectMessage.textContent = result.message || "Could not create subject.";
            subjectMessage.className = "message message-error";
            return;
          }
          await syncSubjectsFromBackend();
        } else {
          subjects.push(subject);
          setSubjects(subjects);
        }
        subjectForm.reset();
        subjectMessage.textContent = "Subject created successfully.";
        subjectMessage.className = "message message-success";
        renderAdminTable();
      });
    }

    const topicForm = document.getElementById("topicForm");
    const topicMessage = document.getElementById("topicMessage");
    if (topicForm) {
      topicForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const subjectId = document.getElementById("topicSubjectSelect").value;
        const topicName = document.getElementById("topicName").value.trim();
        const ok = await addTopicToSubject(subjectId, topicName);
        if (!ok) {
          topicMessage.textContent = "Select a subject and enter a valid topic.";
          topicMessage.className = "message message-error";
          return;
        }

        topicForm.reset();
        topicMessage.textContent = "Topic added successfully.";
        topicMessage.className = "message message-success";
        renderAdminTable();
      });
    }

    const studySubjectSelect = document.getElementById("studySubjectSelect");
    if (studySubjectSelect) {
      studySubjectSelect.addEventListener("change", refreshStudyTopicOptions);
    }

    const studyForm = document.getElementById("studyQuestionForm");
    const studyMessage = document.getElementById("studyQuestionMessage");
    if (studyForm) {
      studyForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const subjectId = document.getElementById("studySubjectSelect").value;
        const topic = document.getElementById("studyTopicSelect").value;
        const question = document.getElementById("studyQuestionText").value.trim();
        const options = [
          document.getElementById("studyOptionA").value.trim(),
          document.getElementById("studyOptionB").value.trim(),
          document.getElementById("studyOptionC").value.trim(),
          document.getElementById("studyOptionD").value.trim()
        ];
        const answerIndex = Number(document.getElementById("studyAnswerIndex").value);
        const explanation = document.getElementById("studyExplanation").value.trim();

        if (!topic) {
          studyMessage.textContent = "Create/select a topic before adding study questions.";
          studyMessage.className = "message message-error";
          return;
        }

        const result = await addQuestionToSubject(subjectId, {
          question,
          options,
          answerIndex,
          mode: MODE_STUDY,
          topic,
          explanation
        });

        if (!result.ok) {
          studyMessage.textContent = "Invalid study question data.";
          studyMessage.className = "message message-error";
          return;
        }

        studyForm.reset();
        studyMessage.textContent = "Study question added.";
        studyMessage.className = "message message-success";
        renderAdminTable();
      });
    }

    const jambForm = document.getElementById("jambQuestionForm");
    const jambMessage = document.getElementById("jambQuestionMessage");
    if (jambForm) {
      jambForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const subjectId = document.getElementById("jambSubjectSelect").value;
        const topic = document.getElementById("jambTopic").value.trim();
        const year = Number(document.getElementById("jambYear").value);
        const exam = document.getElementById("jambExam").value.trim() || "JAMB";
        const question = document.getElementById("jambQuestionText").value.trim();
        const options = [
          document.getElementById("jambOptionA").value.trim(),
          document.getElementById("jambOptionB").value.trim(),
          document.getElementById("jambOptionC").value.trim(),
          document.getElementById("jambOptionD").value.trim()
        ];
        const answerIndex = Number(document.getElementById("jambAnswerIndex").value);

        const result = await addQuestionToSubject(subjectId, {
          question,
          options,
          answerIndex,
          mode: MODE_CBT,
          topic,
          year,
          exam
        });

        if (!result.ok) {
          jambMessage.textContent = "Invalid JAMB question data.";
          jambMessage.className = "message message-error";
          return;
        }

        jambForm.reset();
        document.getElementById("jambExam").value = "JAMB";
        jambMessage.textContent = "JAMB question added.";
        jambMessage.className = "message message-success";
        renderAdminTable();
      });
    }

    const bulkStudyBtn = document.getElementById("bulkStudyImportBtn");
    const bulkStudyFile = document.getElementById("bulkStudyFile");
    const bulkStudySubject = document.getElementById("bulkStudySubjectSelect");
    const bulkStudyMessage = document.getElementById("bulkStudyMessage");
    if (bulkStudyBtn && bulkStudyFile && bulkStudySubject && bulkStudyMessage) {
      bulkStudyBtn.addEventListener("click", () => {
        const file = bulkStudyFile.files && bulkStudyFile.files[0];
        const subjectId = bulkStudySubject.value;

        if (!subjectId) {
          bulkStudyMessage.textContent = "Select a subject first.";
          bulkStudyMessage.className = "message message-error";
          return;
        }
        if (!file) {
          bulkStudyMessage.textContent = "Select a study questions JSON file.";
          bulkStudyMessage.className = "message message-error";
          return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const parsed = JSON.parse(String(reader.result || ""));
            const rows = parseQuestionBulkPayload(parsed);
            const result = await addQuestionsToSubjectBulk(subjectId, rows, MODE_STUDY);

            if (!result.added) {
              const details = summarizeInvalidEntries(result.invalidEntries, 5);
              throw new Error(details ? "No valid study questions. " + details : "No valid study questions.");
            }

            renderAdminTable();
            recordImportBatch(MODE_STUDY, subjectId, result.addedIds, file.name);
            renderBatchTable();
            let message = "Imported " + result.added + " study question(s).";
            if (result.skipped) {
              message += " Skipped " + result.skipped + " invalid item(s).";
              const details = summarizeInvalidEntries(result.invalidEntries, 4);
              if (details) message += " " + details;
            }
            bulkStudyMessage.textContent = message;
            bulkStudyMessage.className = result.skipped ? "message message-error" : "message message-success";
            bulkStudyFile.value = "";
          } catch (error) {
            bulkStudyMessage.textContent = safeText(error && error.message).trim() || "Study import failed. Ensure JSON contains valid study questions.";
            bulkStudyMessage.className = "message message-error";
          }
        };

        reader.readAsText(file);
      });
    }

    const bulkCbtBtn = document.getElementById("bulkCbtImportBtn");
    const bulkCbtFile = document.getElementById("bulkCbtFile");
    const bulkCbtSubject = document.getElementById("bulkCbtSubjectSelect");
    const bulkCbtMessage = document.getElementById("bulkCbtMessage");
    if (bulkCbtBtn && bulkCbtFile && bulkCbtSubject && bulkCbtMessage) {
      bulkCbtBtn.addEventListener("click", () => {
        const file = bulkCbtFile.files && bulkCbtFile.files[0];
        const subjectId = bulkCbtSubject.value;

        if (!subjectId) {
          bulkCbtMessage.textContent = "Select a subject first.";
          bulkCbtMessage.className = "message message-error";
          return;
        }
        if (!file) {
          bulkCbtMessage.textContent = "Select a CBT questions JSON file.";
          bulkCbtMessage.className = "message message-error";
          return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const parsed = JSON.parse(String(reader.result || ""));
            const rows = parseCbtQuestionBulkPayload(parsed);
            const result = await addQuestionsToSubjectBulk(subjectId, rows, MODE_CBT);

            if (!result.added) {
              const details = summarizeInvalidEntries(result.invalidEntries, 6);
              throw new Error(details ? "No valid CBT questions. " + details : "No valid CBT questions.");
            }

            renderAdminTable();
            recordImportBatch(MODE_CBT, subjectId, result.addedIds, file.name);
            renderBatchTable();
            let message = "Imported " + result.added + " CBT question(s).";
            if (result.skipped) {
              message += " Skipped " + result.skipped + " invalid item(s).";
              const details = summarizeInvalidEntries(result.invalidEntries, 6);
              if (details) message += " " + details;
            }
            bulkCbtMessage.textContent = message;
            bulkCbtMessage.className = result.skipped ? "message message-error" : "message message-success";
            bulkCbtFile.value = "";
          } catch (error) {
            bulkCbtMessage.textContent = safeText(error && error.message).trim() || "CBT import failed. Use valid JSON with year data (array or multi-year years{} format).";
            bulkCbtMessage.className = "message message-error";
          }
        };

        reader.readAsText(file);
      });
    }

    const clearSubjectsBtn = document.getElementById("clearSubjectsBtn");
    const clearTopicsBtn = document.getElementById("clearTopicsBtn");
    const clearStudyQuestionsBtn = document.getElementById("clearStudyQuestionsBtn");
    const clearCbtQuestionsBtn = document.getElementById("clearCbtQuestionsBtn");
    const clearBatchQuestionsBtn = document.getElementById("clearBatchQuestionsBtn");
    const clearBatchLogBtn = document.getElementById("clearBatchLogBtn");
    const cleanupMessage = document.getElementById("adminCleanupMessage");

    if (clearSubjectsBtn) {
      clearSubjectsBtn.addEventListener("click", async () => {
        await clearSubjectsData();
        if (cleanupMessage) {
          cleanupMessage.textContent = "All subjects deleted.";
          cleanupMessage.className = "message message-success";
        }
        renderAdminTable();
        renderBatchTable();
      });
    }

    if (clearTopicsBtn) {
      clearTopicsBtn.addEventListener("click", async () => {
        await clearTopicsData();
        if (cleanupMessage) {
          cleanupMessage.textContent = "All topics deleted.";
          cleanupMessage.className = "message message-success";
        }
        renderAdminTable();
      });
    }

    if (clearStudyQuestionsBtn) {
      clearStudyQuestionsBtn.addEventListener("click", async () => {
        await clearQuestionsByMode(MODE_STUDY);
        if (cleanupMessage) {
          cleanupMessage.textContent = "All study questions deleted.";
          cleanupMessage.className = "message message-success";
        }
        renderAdminTable();
        renderBatchTable();
      });
    }

    if (clearCbtQuestionsBtn) {
      clearCbtQuestionsBtn.addEventListener("click", async () => {
        await clearQuestionsByMode(MODE_CBT);
        if (cleanupMessage) {
          cleanupMessage.textContent = "All CBT questions deleted.";
          cleanupMessage.className = "message message-success";
        }
        renderAdminTable();
        renderBatchTable();
      });
    }

    if (clearBatchQuestionsBtn) {
      clearBatchQuestionsBtn.addEventListener("click", async () => {
        const removed = await clearAllBatchQuestions();
        if (cleanupMessage) {
          cleanupMessage.textContent = "All batch-linked questions deleted (" + removed + ").";
          cleanupMessage.className = "message message-success";
        }
        renderAdminTable();
        renderBatchTable();
      });
    }

    if (clearBatchLogBtn) {
      clearBatchLogBtn.addEventListener("click", () => {
        setBatches([]);
        if (cleanupMessage) {
          cleanupMessage.textContent = "Batch log cleared.";
          cleanupMessage.className = "message message-success";
        }
        renderBatchTable();
      });
    }

    refreshAdminSelectors();
    renderAdminTable();
    renderBatchTable();
    initAdminAccessTools();
  }

  function attemptPercent(attempt) {
    const value = Number(attempt && attempt.scorePercent);
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  function formatRelativeTime(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "Unknown time";
    const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
    const abs = Math.abs(diffSeconds);
    const scales = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 }
    ];
    const scale = scales.find((item) => abs >= item.seconds) || scales[scales.length - 1];
    const value = Math.round(diffSeconds / scale.seconds);
    try {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(value, scale.unit);
    } catch (error) {
      const label = Math.abs(value) + " " + scale.unit + (Math.abs(value) === 1 ? "" : "s");
      return value < 0 ? label + " ago" : "in " + label;
    }
  }

  function computeActivityStreak(attempts) {
    const uniqueDays = Array.from(new Set(
      attempts.map((attempt) => {
        const date = new Date(attempt.createdAt);
        if (Number.isNaN(date.getTime())) return null;
        return Math.floor(date.getTime() / 86400000);
      }).filter((value) => value !== null)
    )).sort((a, b) => b - a);

    if (!uniqueDays.length) return 0;
    const today = Math.floor(Date.now() / 86400000);
    if (today - uniqueDays[0] > 1) return 0;

    let streak = 1;
    for (let i = 1; i < uniqueDays.length; i += 1) {
      if (uniqueDays[i - 1] - uniqueDays[i] !== 1) break;
      streak += 1;
    }
    return streak;
  }

  function readinessLabel(percent) {
    if (percent >= 85) return "Excellent";
    if (percent >= 70) return "Ready";
    if (percent >= 55) return "Progressing";
    return "Building";
  }

  function computeDashboardInsights(subjects, attempts) {
    const avgScore = attempts.length
      ? Math.round(attempts.reduce((sum, attempt) => sum + attemptPercent(attempt), 0) / attempts.length)
      : 0;
    const activityBase = Math.max(subjects.length * 3, 1);
    const activity = Math.min(100, Math.round((attempts.length / activityBase) * 100));
    const readiness = Math.max(0, Math.min(100, Math.round((avgScore * 0.7) + (activity * 0.3))));
    const goalAverage = Math.round((avgScore / 100) * 400);
    const goalProgress = Math.max(0, Math.min(100, Math.round((goalAverage / 320) * 100)));
    const streak = computeActivityStreak(attempts);
    const rank = Math.max(1, 500 - Math.round(readiness * 3.1) - attempts.length);

    return {
      readiness,
      goalAverage,
      goalProgress,
      streak,
      rank
    };
  }

  function resolvePerformanceRows(subjects, attempts, source) {
    const result = getJSON(RESULT_KEY, null);
    const useBank = source === "bank";

    if (!useBank && result && Array.isArray(result.subjectResults) && result.subjectResults.length) {
      return result.subjectResults
        .map((item) => ({
          name: safeText(item.subjectName),
          score: Math.max(0, Math.min(100, Number(item.score) || 0))
        }))
        .filter((item) => item.name)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);
    }

    if (!useBank && attempts.length) {
      const grouped = {};
      attempts.forEach((attempt) => {
        const key = safeText(attempt.subjectName).trim() || "General";
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(attemptPercent(attempt));
      });
      return Object.keys(grouped).map((name) => {
        const values = grouped[name];
        const avg = values.length ? Math.round(values.reduce((sum, score) => sum + score, 0) / values.length) : 0;
        return { name, score: avg };
      }).sort((a, b) => b.score - a.score).slice(0, 6);
    }

    const counts = subjects.map((subject) => ({
      name: safeText(subject.name),
      count: Array.isArray(subject.questions) ? subject.questions.length : 0
    }));
    const max = counts.reduce((highest, item) => Math.max(highest, item.count), 1);
    return counts.map((item) => ({
      name: item.name,
      score: max ? Math.round((item.count / max) * 100) : 0
    })).sort((a, b) => b.score - a.score).slice(0, 6);
  }

  function renderSubjectPerformance(subjects, attempts) {
    const container = document.getElementById("subjectPerformanceBars");
    if (!container) return;

    const range = document.getElementById("performanceRange");
    const rows = resolvePerformanceRows(subjects, attempts, range ? String(range.value || "latest") : "latest");
    if (!rows.length) {
      container.innerHTML = "<div class=\"empty-state\">No performance data yet. Complete at least one exam.</div>";
      return;
    }

    const topScore = rows.reduce((best, item) => Math.max(best, item.score), 0);
    container.innerHTML = rows.map((item) => {
      const score = Math.max(6, Math.min(100, Math.round(item.score)));
      const shortName = safeText(item.name).length > 13 ? safeText(item.name).slice(0, 12) + "..." : safeText(item.name);
      return "<article class=\"perf-item\">" +
        "<div class=\"perf-bar-track\">" +
          "<div class=\"perf-bar-fill" + (score === topScore ? " perf-bar-fill-top" : "") + "\" style=\"height:" + score + "%;\"></div>" +
        "</div>" +
        "<p class=\"perf-label\">" + shortName + "</p>" +
        "<p class=\"perf-score\">" + score + "%</p>" +
      "</article>";
    }).join("");
  }

  function renderDashboardInsights(subjects, attempts) {
    const data = computeDashboardInsights(subjects, attempts);
    const streakEl = document.getElementById("streakValue");
    const rankEl = document.getElementById("rankValue");
    const readinessEl = document.getElementById("readinessPercent");
    const labelEl = document.getElementById("readinessLabel");
    const goalTextEl = document.getElementById("goalAverageText");
    const goalBarEl = document.getElementById("goalProgressBar");
    const readinessCircle = document.getElementById("readinessCircle");

    if (streakEl) streakEl.textContent = String(data.streak);
    if (rankEl) rankEl.textContent = "#" + String(data.rank);
    if (readinessEl) readinessEl.textContent = String(data.readiness) + "%";
    if (labelEl) labelEl.textContent = readinessLabel(data.readiness);
    if (goalTextEl) goalTextEl.textContent = String(data.goalAverage) + " Avg.";
    if (goalBarEl) goalBarEl.style.width = String(data.goalProgress) + "%";
    if (readinessCircle) {
      const circumference = 440;
      const dashOffset = circumference - ((data.readiness / 100) * circumference);
      readinessCircle.setAttribute("stroke-dashoffset", String(dashOffset));
    }

    renderSubjectPerformance(subjects, attempts);
  }

  function renderStudentSummary(subjects) {
    const subjectCount = document.getElementById("subjectCount");
    const questionCount = document.getElementById("questionCount");
    const attemptCount = document.getElementById("attemptCount");
    const attempts = getAttempts();
    const totalQuestions = subjects.reduce((sum, s) => sum + (s.questions ? s.questions.length : 0), 0);
    if (subjectCount) subjectCount.textContent = String(subjects.length);
    if (questionCount) questionCount.textContent = String(totalQuestions);
    if (attemptCount) attemptCount.textContent = String(attempts.length);
    renderDashboardInsights(subjects, attempts);
  }

  function renderAttemptHistory() {
    const container = document.getElementById("attemptList");
    if (!container) return;
    const attempts = getAttempts().slice().reverse();
    if (!attempts.length) {
      container.innerHTML = "<div class=\"empty-state\">No attempts yet. Start a study or CBT session to see activity here.</div>";
      return;
    }

    container.innerHTML = attempts.slice(0, 8).map((attempt) => {
      const score = attemptPercent(attempt);
      const passed = score >= 60;
      const statusLabel = passed ? "Completed" : "Needs Review";
      return "<div class=\"row\">" +
        "<div><strong>" + safeText(attempt.subjectName) + "</strong><small>" + safeText(formatRelativeTime(attempt.createdAt)) + " | Score: " + score + "%</small></div>" +
        "<span class=\"pill " + (passed ? "ok" : "alert") + "\">" + statusLabel + "</span>" +
      "</div>";
    }).join("");
  }

  function subjectQuestionsByMode(subject, mode) {
    return (subject.questions || []).filter((q) => questionMode(q) === mode);
  }

  function subjectTopics(subject, mode) {
    const seen = new Set();
    const list = [];
    function push(value) {
      const topic = safeText(value).trim();
      if (!topic) return;
      const key = topic.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      list.push(topic);
    }

    if (mode === MODE_STUDY) (subject.topics || []).forEach(push);
    subjectQuestionsByMode(subject, mode).forEach((q) => push(q.topic));
    return list;
  }

  function subjectPastSets(subject, mode) {
    const seen = new Set();
    const list = [];
    subjectQuestionsByMode(subject, mode).forEach((q) => {
      const year = Number(q.year);
      if (!Number.isInteger(year)) return;
      const exam = safeText(q.exam).trim() || "JAMB";
      const key = year + "|" + exam.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      list.push({ value: year + "|" + exam, label: year + " " + exam });
    });
    list.sort((a, b) => b.value.localeCompare(a.value));
    return list;
  }

  function canUseStudyMode(auth) {
    return !!(auth && auth.role === "student" && isPremiumAccess(auth));
  }

  function getStudentAccessMessage(auth) {
    if (!auth || auth.role !== "student") {
      return "Account access is locked. Redeem an activation code to continue.";
    }
    if (auth.trialActive && auth.trialPremiumEndsAt) {
      return "Free premium trial is active until " + formatDate(auth.trialPremiumEndsAt) + ".";
    }
    if (isPremiumAccess(auth)) {
      return "Premium package active. You have access to all features.";
    }
    if (isStandardAccess(auth)) {
      return "Standard package active. You can use CBT mode only.";
    }
    return "Account access is locked. Redeem an activation code to continue.";
  }

  function initStudentActivationPanel(auth) {
    const form = document.getElementById("dashboardActivationForm");
    const codeInput = document.getElementById("dashboardActivationCode");
    const referralInput = document.getElementById("dashboardActivationReferral");
    const redeemBtn = document.getElementById("dashboardActivationRedeemBtn");
    const message = document.getElementById("dashboardActivationMessage");
    const status = document.getElementById("dashboardActivationStatus");
    const getCodeBtn = document.getElementById("dashboardGetCodeBtn");
    const dashboardMessage = document.getElementById("dashboardMessage");

    if (status) status.textContent = getStudentAccessMessage(auth);
    if (getCodeBtn) getCodeBtn.setAttribute("href", getWhatsAppActivationUrl());
    if (!form || !codeInput || !message) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const code = String(codeInput.value || "").trim().toLowerCase();
      const referralCode = String((referralInput && referralInput.value) || "").trim();
      if (!code) {
        message.textContent = "Enter your activation code.";
        message.className = "message message-error";
        return;
      }

      if (redeemBtn) redeemBtn.disabled = true;
      const result = await apiRequest("/api/auth/activate/me", {
        method: "POST",
        body: {
          code,
          referralCode: referralCode || undefined,
          deviceId: getDeviceId()
        }
      });
      const authPayload = toAuthFromBackend(result);

      if (!result.ok || !authPayload || authPayload.role !== "student") {
        message.textContent = result.message || "Invalid activation code.";
        message.className = "message message-error";
        if (redeemBtn) redeemBtn.disabled = false;
        return;
      }

      setAuth(authPayload);
      if (status) status.textContent = getStudentAccessMessage(authPayload);
      if (dashboardMessage) {
        dashboardMessage.textContent = getStudentAccessMessage(authPayload);
        dashboardMessage.className = "message";
        dashboardMessage.classList.remove("hidden");
      }
      message.textContent = "Activation successful.";
      message.className = "message message-success";
      form.reset();
      if (redeemBtn) redeemBtn.disabled = false;
      setStudentMode(canUseStudyMode(authPayload) ? MODE_STUDY : MODE_CBT);
    });
  }

  function renderModeHeader(mode) {
    const title = document.getElementById("modeTitle");
    const hint = document.getElementById("modeHint");
    if (!title || !hint) return;
    if (mode === MODE_CBT) {
      title.textContent = "JAMB CBT Simulation Subjects";
      hint.textContent = "Choose up to 4 subjects, then open CBT setup.";
    } else {
      title.textContent = "Study Mode Subjects";
      hint.textContent = "Open a subject to launch a focused study exam setup.";
    }
  }

  function openPractice(mode, subjectId) {
    const params = new URLSearchParams({ mode: mode === MODE_CBT ? MODE_CBT : MODE_STUDY });
    if (subjectId) params.set("preselect", subjectId);
    window.location.href = "practice.html?" + params.toString();
  }

  function buildPracticeUrl(mode, config, runNow) {
    const params = new URLSearchParams({ mode: mode === MODE_CBT ? MODE_CBT : MODE_STUDY });
    const preselect = Array.isArray(config && config.preselect) ? config.preselect.filter(Boolean) : [];
    const selected = Array.isArray(config && config.subjects) ? config.subjects.filter(Boolean) : [];
    const questionCount = Number(config && config.questionCount);
    const totalMinutes = Number(config && config.totalMinutes);
    const examYear = Number(config && config.examYear);
    if (preselect.length) params.set("preselect", preselect.join(","));
    if (selected.length) params.set("subjects", selected.join(","));
    if (Number.isInteger(questionCount) && questionCount > 0) params.set("qps", String(questionCount));
    if (Number.isInteger(totalMinutes) && totalMinutes > 0) params.set("mins", String(totalMinutes));
    if (mode === MODE_CBT && Number.isInteger(examYear) && examYear > 0) params.set("year", String(examYear));
    if (runNow) params.set("run", "1");
    return "practice.html?" + params.toString();
  }

  function renderSubjectCards(subjects, query, mode) {
    const container = document.getElementById("subjectList");
    if (!container) return;
    const auth = getAuth();
    if (mode === MODE_STUDY && !canUseStudyMode(auth)) {
      container.innerHTML = "<div class=\"empty-state\">" +
        "Study mode is available on premium package only. " +
        "<a href=\"" + buildActivationUrl(auth && auth.email) + "\">Activate premium access</a>." +
      "</div>";
      return;
    }

    const term = String(query || "").trim().toLowerCase();
    const searched = !term ? subjects : subjects.filter((subject) => {
      return (
        subject.name.toLowerCase().includes(term) ||
        subject.description.toLowerCase().includes(term) ||
        (subject.topics || []).some((topic) => topic.toLowerCase().includes(term)) ||
        (subject.questions || []).some((q) => safeText(q.topic).toLowerCase().includes(term))
      );
    });

    const available = searched.filter((subject) => subjectQuestionsByMode(subject, mode).length > 0);
    if (!available.length) {
      container.innerHTML = "<div class=\"empty-state\">No subject has " + (mode === MODE_CBT ? "CBT" : "study") + " questions for this filter.</div>";
      return;
    }

    if (mode === MODE_CBT) {
      container.innerHTML = "<article class=\"subject-card\">" +
        "<h4>Select CBT Subjects</h4>" +
        "<p>Choose up to 4 subjects for JAMB CBT setup.</p>" +
        "<div class=\"subject-check-grid\">" +
          available.map((subject, idx) => {
            const questionCount = subjectQuestionsByMode(subject, mode).length;
            return "<label class=\"subject-check-item\">" +
              "<input type=\"checkbox\" data-cbt-select=\"" + safeText(subject.id) + "\"" + (idx < 4 ? " checked" : "") + ">" +
              "<span>" + safeText(subject.name) + " (" + questionCount + ")</span>" +
            "</label>";
          }).join("") +
        "</div>" +
        "<div class=\"button-row\">" +
          "<button id=\"openCbtSetupBtn\" type=\"button\" class=\"btn btn-primary\">Open CBT Setup</button>" +
        "</div>" +
        "<p id=\"cbtSubjectMessage\" class=\"message\"></p>" +
      "</article>";

      const setupBtn = document.getElementById("openCbtSetupBtn");
      const cbtMessage = document.getElementById("cbtSubjectMessage");
      if (setupBtn) {
        setupBtn.addEventListener("click", () => {
          const selectedIds = Array.from(container.querySelectorAll("[data-cbt-select]:checked")).map((node) => node.getAttribute("data-cbt-select") || "");
          if (!selectedIds.length) {
            if (cbtMessage) {
              cbtMessage.textContent = "Select at least one subject.";
              cbtMessage.className = "message message-error";
            }
            return;
          }
          if (selectedIds.length > 4) {
            if (cbtMessage) {
              cbtMessage.textContent = "Maximum of 4 subjects allowed.";
              cbtMessage.className = "message message-error";
            }
            return;
          }
          if (cbtMessage) {
            cbtMessage.textContent = "";
            cbtMessage.className = "message";
          }
          window.location.href = buildPracticeUrl(MODE_CBT, {
            preselect: selectedIds,
            subjects: [],
            questionCount: Number(localStorage.getItem("testify_qps_cbt") || 40),
            totalMinutes: Number(localStorage.getItem("testify_minutes_cbt") || 120)
          }, false);
        });
      }
      applyHapticsAndMotion();
      return;
    }

    container.innerHTML = available.map((subject) => {
      const questions = subjectQuestionsByMode(subject, mode);
      const topics = subjectTopics(subject, mode);
      const sets = subjectPastSets(subject, mode);
      const meta = "Topics: " + topics.length + " | Past sets: " + sets.length;
      const chips = topics.length
        ? topics.slice(0, 4).map((topic) => "<span class=\"chip chip-inline\">" + safeText(topic) + "</span>").join(" ")
        : "<span class=\"chip chip-inline\">General</span>";

      return "<article class=\"subject-card interactive tilt\">" +
        "<h4>" + safeText(subject.name) + "</h4>" +
        "<p>" + safeText(subject.description) + "</p>" +
        "<div class=\"chips\">" + chips + "</div>" +
        "<div class=\"subject-meta\">" +
          "<small>Questions: " + questions.length + " | " + meta + "</small>" +
          "<button type=\"button\" class=\"btn btn-primary btn-mini interactive\" data-open-subject=\"" + safeText(subject.id) + "\" data-open-mode=\"" + safeText(mode) + "\">Open Study Exam</button>" +
        "</div>" +
      "</article>";
    }).join("");

    container.querySelectorAll("[data-open-subject]").forEach((button) => {
      button.addEventListener("click", () => {
        openPractice(button.getAttribute("data-open-mode") || MODE_STUDY, button.getAttribute("data-open-subject") || "");
      });
    });

    applyHapticsAndMotion();
  }

  function setStudentMode(mode) {
    const auth = getAuth();
    const premium = canUseStudyMode(auth);
    const requestedMode = mode === MODE_CBT ? MODE_CBT : MODE_STUDY;
    studentMode = requestedMode === MODE_STUDY && !premium ? MODE_CBT : requestedMode;
    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.classList.toggle("mode-tab-active", button.getAttribute("data-mode") === studentMode);
    });
    renderModeHeader(studentMode);
    const search = document.getElementById("subjectSearch");
    renderSubjectCards(getSubjects(), search ? search.value : "", studentMode);
  }

  function shuffle(items) {
    const list = items.slice();
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = list[i];
      list[i] = list[j];
      list[j] = t;
    }
    return list;
  }

  function stopQuizTimer() {
    if (!activeQuiz || !activeQuiz.timerId) return;
    clearInterval(activeQuiz.timerId);
    activeQuiz.timerId = null;
  }

  function renderQuizTimer() {
    const timerEl = document.getElementById("quizTimer");
    if (!timerEl || !activeQuiz) return;
    timerEl.textContent = "Time Left: " + formatDuration(activeQuiz.remainingSeconds);
  }

  function startQuizTimer() {
    stopQuizTimer();
    if (!activeQuiz) return;
    renderQuizTimer();
    activeQuiz.timerId = window.setInterval(() => {
      if (!activeQuiz || activeQuiz.completed) return;
      activeQuiz.remainingSeconds -= 1;
      if (activeQuiz.remainingSeconds <= 0) {
        activeQuiz.remainingSeconds = 0;
        renderQuizTimer();
        finishQuiz(true);
        return;
      }
      renderQuizTimer();
    }, 1000);
  }

  function endQuiz(silent) {
    const empty = document.getElementById("quizEmpty");
    const panel = document.getElementById("quizPanel");
    const feedback = document.getElementById("quizFeedback");
    const submitTopBtn = document.getElementById("submitExamTopBtn");
    const navBar = document.getElementById("questionNavBar");
    const timerEl = document.getElementById("quizTimer");
    stopQuizTimer();
    activeQuiz = null;
    if (panel) panel.classList.add("hidden");
    if (empty) empty.classList.remove("hidden");
    if (submitTopBtn) submitTopBtn.classList.add("hidden");
    if (navBar) navBar.classList.add("hidden");
    if (timerEl) timerEl.textContent = "";
    if (!silent && feedback) {
      feedback.textContent = "Session ended.";
      feedback.className = "message";
    }
  }

  function renderQuestionNavigator() {
    const navBar = document.getElementById("questionNavBar");
    if (!navBar || !activeQuiz || activeQuiz.completed) {
      if (navBar) navBar.classList.add("hidden");
      return;
    }

    navBar.classList.remove("hidden");
    navBar.innerHTML = activeQuiz.questions.map((_, idx) => {
      const classes = ["question-nav-btn"];
      if (idx === activeQuiz.index) classes.push("question-nav-btn-current");
      if (activeQuiz.answers[idx] !== null) classes.push("question-nav-btn-answered");
      return "<button type=\"button\" class=\"" + classes.join(" ") + "\" data-nav-index=\"" + idx + "\">" + (idx + 1) + "</button>";
    }).join("");

    navBar.querySelectorAll("[data-nav-index]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!activeQuiz || activeQuiz.completed) return;
        activeQuiz.index = Number(button.getAttribute("data-nav-index"));
        showQuizQuestion();
      });
    });
  }

  function showQuizQuestion() {
    if (!activeQuiz) return;
    const subjectEl = document.getElementById("quizSubject");
    const progressEl = document.getElementById("quizProgress");
    const yearEl = document.getElementById("quizYear");
    const questionEl = document.getElementById("quizQuestion");
    const optionsEl = document.getElementById("quizOptions");
    const feedbackEl = document.getElementById("quizFeedback");
    const nextBtn = document.getElementById("nextQuestionBtn");
    const prevBtn = document.getElementById("prevQuestionBtn");
    if (!subjectEl || !progressEl || !questionEl || !optionsEl || !feedbackEl || !nextBtn || !prevBtn) return;

    const current = activeQuiz.questions[activeQuiz.index];
    if (!current) return;
    const chosen = activeQuiz.answers[activeQuiz.index];
    const year = Number(current.year);
    const exam = safeText(current.exam).trim();

    subjectEl.textContent = "Subject: " + safeText(current.subjectName);
    progressEl.textContent = "Question " + (activeQuiz.index + 1) + " of " + activeQuiz.questions.length;
    if (yearEl) {
      if (Number.isInteger(year)) {
        yearEl.textContent = "Source: " + year + (exam ? " " + exam : "");
      } else if (exam) {
        yearEl.textContent = "Source: " + exam;
      } else {
        yearEl.textContent = "Source: Year not specified";
      }
    }
    questionEl.textContent = current.question;
    feedbackEl.textContent = "";
    feedbackEl.className = "message";
    prevBtn.disabled = activeQuiz.index === 0 || activeQuiz.completed;
    nextBtn.disabled = activeQuiz.index >= activeQuiz.questions.length - 1 || activeQuiz.completed;

    optionsEl.innerHTML = current.options.map((option, idx) => {
      const classes = ["option-btn"];
      if (chosen === idx) classes.push("option-selected");
      return "<button type=\"button\" class=\"" + classes.join(" ") + "\" data-option-index=\"" + idx + "\"" + (activeQuiz.completed ? " disabled" : "") + ">" + safeText(option) + "</button>";
    }).join("");

    optionsEl.querySelectorAll("[data-option-index]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!activeQuiz || activeQuiz.completed) return;
        const picked = Number(button.getAttribute("data-option-index"));
        activeQuiz.answers[activeQuiz.index] = picked;
        optionsEl.querySelectorAll("button").forEach((item) => item.classList.remove("option-selected"));
        button.classList.add("option-selected");
        feedbackEl.textContent = "Answer saved.";
        renderQuestionNavigator();
      });
    });

    renderQuestionNavigator();
    renderQuizTimer();
  }

  function computeQuizResult(quiz) {
    const answers = Array.isArray(quiz.answers) ? quiz.answers : [];
    const buckets = {};
    let answered = 0;
    let correct = 0;

    quiz.questions.forEach((question, idx) => {
      const subjectId = question.subjectId;
      if (!buckets[subjectId]) {
        buckets[subjectId] = {
          subjectId,
          subjectName: question.subjectName,
          total: 0,
          correct: 0
        };
      }
      buckets[subjectId].total += 1;

      const picked = answers[idx];
      if (picked === null || picked === undefined || Number.isNaN(Number(picked))) return;
      answered += 1;
      if (Number(picked) === question.answerIndex) {
        correct += 1;
        buckets[subjectId].correct += 1;
      }
    });

    const subjectResults = Object.keys(buckets).map((key) => {
      const item = buckets[key];
      const score = item.total ? Math.round((item.correct / item.total) * 100) : 0;
      return {
        subjectId: item.subjectId,
        subjectName: item.subjectName,
        correct: item.correct,
        total: item.total,
        score
      };
    });

    const overallScore = subjectResults.reduce((sum, item) => sum + item.score, 0);
    const maxOverall = subjectResults.length * 100;
    const overallPercent = maxOverall ? Math.round((overallScore / maxOverall) * 100) : 0;
    const wrong = answered - correct;
    const unanswered = quiz.questions.length - answered;

    return {
      answered,
      correct,
      wrong,
      unanswered,
      totalQuestions: quiz.questions.length,
      overallScore,
      maxOverall,
      overallPercent,
      subjectResults
    };
  }

  function finishQuiz(autoSubmitted) {
    if (!activeQuiz || activeQuiz.completed) return;
    stopQuizTimer();
    activeQuiz.completed = true;

    const result = computeQuizResult(activeQuiz);
    const attempts = getAttempts();
    let attemptLabel = (activeQuiz.mode === MODE_CBT ? "CBT" : "Study") + " Multi-Subject (" + activeQuiz.subjectIds.length + " subject" + (activeQuiz.subjectIds.length > 1 ? "s" : "") + ")";
    if (activeQuiz.mode === MODE_STUDY && activeQuiz.subjectIds.length === 1) {
      const subject = getSubjects().find((item) => item.id === activeQuiz.subjectIds[0]);
      const subjectName = subject ? safeText(subject.name) : "Study";
      attemptLabel = subjectName;
    } else if (activeQuiz.mode === MODE_CBT && activeQuiz.examYear) {
      attemptLabel += " (" + activeQuiz.examYear + ")";
    }
    attempts.push({
      subjectId: activeQuiz.subjectIds.join(","),
      subjectName: attemptLabel,
      score: result.overallScore,
      total: result.maxOverall,
      scorePercent: result.overallPercent,
      createdAt: new Date().toISOString()
    });
    setAttempts(attempts);

    const backendAttemptItems = result.subjectResults.map((item) => {
      return {
        subjectId: item.subjectId,
        mode: activeQuiz.mode === MODE_CBT ? "CBT" : "STUDY",
        focusLabel: attemptLabel,
        score: item.correct,
        total: item.total,
        percent: item.score
      };
    });
    queueAttemptSyncItems(backendAttemptItems);
    flushAttemptSyncQueue();

    const payload = {
      createdAt: new Date().toISOString(),
      mode: activeQuiz.mode,
      autoSubmitted: !!autoSubmitted,
      examYear: activeQuiz.examYear || null,
      totalMinutes: activeQuiz.totalMinutes,
      totalSeconds: activeQuiz.totalSeconds,
      remainingSeconds: activeQuiz.remainingSeconds,
      timeSpentSeconds: Math.max(activeQuiz.totalSeconds - activeQuiz.remainingSeconds, 0),
      totalQuestions: result.totalQuestions,
      answered: result.answered,
      correct: result.correct,
      wrong: result.wrong,
      unanswered: result.unanswered,
      overallScore: result.overallScore,
      maxOverall: result.maxOverall,
      overallPercent: result.overallPercent,
      subjectResults: result.subjectResults
    };
    setJSON(RESULT_KEY, payload);
    window.location.href = "result.html";
  }

  function startQuiz(mode, subjectIds, questionCountPerSubject, totalMinutes, options) {
    const selectedIds = Array.isArray(subjectIds) ? subjectIds.filter(Boolean) : [];
    const subjects = getSubjects().filter((subject) => selectedIds.includes(subject.id));
    const examYear = Number(options && options.examYear);
    const hasYearFilter = mode === MODE_CBT && Number.isInteger(examYear) && examYear > 0;
    const questions = [];

    subjects.forEach((subject) => {
      const modePool = subjectQuestionsByMode(subject, mode);
      const pool = modePool.filter((question) => {
        if (hasYearFilter && Number(question.year) !== examYear) return false;
        return true;
      });
      const selected = shuffle(pool).slice(0, Math.min(questionCountPerSubject, pool.length));
      selected.forEach((question) => {
        questions.push({
          question: question.question,
          options: question.options,
          answerIndex: question.answerIndex,
          explanation: question.explanation,
          topic: question.topic,
          year: question.year,
          exam: question.exam,
          subjectId: subject.id,
          subjectName: subject.name
        });
      });
    });

    const setupMessage = document.getElementById("setupMessage");
    if (!questions.length) {
      if (setupMessage) {
        let message = "No questions found for selected filters.";
        if (hasYearFilter) message = "No questions found for selected subjects in " + examYear + ".";
        setupMessage.textContent = message;
        setupMessage.className = "message message-error";
      }
      return false;
    }

    activeQuiz = {
      mode,
      subjectIds: subjects.map((s) => s.id),
      index: 0,
      completed: false,
      questions,
      answers: questions.map(() => null),
      totalMinutes,
      totalSeconds: totalMinutes * 60,
      remainingSeconds: totalMinutes * 60,
      examYear: hasYearFilter ? examYear : null,
      timerId: null
    };

    const empty = document.getElementById("quizEmpty");
    const panel = document.getElementById("quizPanel");
    const submitTopBtn = document.getElementById("submitExamTopBtn");
    if (empty) empty.classList.add("hidden");
    if (panel) panel.classList.remove("hidden");
    if (submitTopBtn) submitTopBtn.classList.remove("hidden");
    if (setupMessage) {
      setupMessage.textContent = "Loaded " + questions.length + " question(s).";
      setupMessage.className = "message message-success";
    }

    showQuizQuestion();
    startQuizTimer();
    return true;
  }

  function initStudentPage() {
    const auth = requireRole("student");
    if (!auth) return;
    const premiumAccess = canUseStudyMode(auth);

    const rawName = (auth.name && auth.name !== "Student")
      ? auth.name
      : String(auth.email || "student").split("@")[0];
    const displayName = safeText(rawName)
      .replace(/[._-]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ") || "Student";

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : (hour < 17 ? "Good afternoon" : "Good evening");
    const greetingTitle = document.getElementById("greetingTitle");
    const welcomeText = document.getElementById("welcomeText");
    const profileName = document.getElementById("profileName");
    if (greetingTitle) greetingTitle.textContent = greeting + ", " + displayName;
    if (welcomeText) welcomeText.textContent = "Your dashboard is live. Continue your JAMB preparation with focused daily sessions.";
    if (profileName) profileName.textContent = displayName;

    const dashboardMessage = document.getElementById("dashboardMessage");
    if (dashboardMessage) {
      dashboardMessage.textContent = getStudentAccessMessage(auth);
      dashboardMessage.className = "message";
      dashboardMessage.classList.remove("hidden");
    }
    initStudentActivationPanel(auth);

    const subjects = getSubjects();
    renderStudentSummary(subjects);
    renderAttemptHistory();

    const search = document.getElementById("subjectSearch");
    if (search) search.addEventListener("input", () => renderSubjectCards(getSubjects(), search.value, studentMode));

    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => setStudentMode(button.getAttribute("data-mode") || MODE_STUDY));
    });
    const modeStudyBtn = document.getElementById("modeStudyBtn");
    if (modeStudyBtn && !premiumAccess) {
      modeStudyBtn.disabled = true;
      modeStudyBtn.classList.add("mode-tab-disabled");
    }
    setStudentMode(premiumAccess ? MODE_STUDY : MODE_CBT);

    document.querySelectorAll("[data-section-link]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-section-link");
        const target = targetId ? document.getElementById(targetId) : null;
        if (target && typeof target.scrollIntoView === "function") {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    const startSimulationBtn = document.getElementById("startSimulationBtn");
    if (startSimulationBtn) {
      startSimulationBtn.addEventListener("click", () => {
        window.location.href = buildPracticeUrl(MODE_CBT, {
          preselect: [],
          subjects: [],
          questionCount: Number(localStorage.getItem("testify_qps_cbt") || 40),
          totalMinutes: Number(localStorage.getItem("testify_minutes_cbt") || 120)
        }, false);
      });
    }

    const openLibraryBtn = document.getElementById("openLibraryBtn");
    if (openLibraryBtn) {
      if (!premiumAccess) {
        openLibraryBtn.disabled = true;
      }
      openLibraryBtn.addEventListener("click", () => {
        if (!premiumAccess) {
          window.location.href = buildActivationUrl(auth.email);
          return;
        }
        setStudentMode(MODE_STUDY);
        const target = document.getElementById("subjectsSection");
        if (target && typeof target.scrollIntoView === "function") {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    const viewHistoryBtn = document.getElementById("viewHistoryBtn");
    if (viewHistoryBtn) {
      viewHistoryBtn.addEventListener("click", () => {
        const target = document.getElementById("activitySection");
        if (target && typeof target.scrollIntoView === "function") {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    const performanceRange = document.getElementById("performanceRange");
    if (performanceRange) {
      performanceRange.addEventListener("change", () => {
        renderSubjectPerformance(getSubjects(), getAttempts());
      });
    }

    const renewPlanBtn = document.getElementById("renewPlanBtn");
    if (renewPlanBtn && dashboardMessage) {
      renewPlanBtn.addEventListener("click", () => {
        window.location.href = buildActivationUrl(auth.email);
      });
    }

    const logout = () => {
      clearAuth();
      window.location.href = "hi.html";
    };
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutBtnMobile = document.getElementById("logoutBtnMobile");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", logout);

    document.body.classList.remove("student-booting");
  }

  function initPracticePage() {
    const auth = requireRole("student");
    if (!auth) return;

    const params = new URLSearchParams(window.location.search || "");
    const mode = params.get("mode") === MODE_CBT ? MODE_CBT : MODE_STUDY;
    if (mode === MODE_STUDY && !canUseStudyMode(auth)) {
      window.location.href = "student.html";
      return;
    }
    const runNow = params.get("run") === "1";
    const preselect = String(params.get("preselect") || "").split(",").map((x) => x.trim()).filter(Boolean);
    const selectedFromQuery = String(params.get("subjects") || "").split(",").map((x) => x.trim()).filter(Boolean);
    const countParam = Number(params.get("qps"));
    const minutesParam = Number(params.get("mins"));
    const yearParam = Number(params.get("year"));
    const allSubjects = getSubjects();

    const availableSubjects = allSubjects.filter((subject) => subjectQuestionsByMode(subject, mode).length > 0);
    if (!availableSubjects.length) {
      window.location.href = "student.html";
      return;
    }

    const validSubjectIds = new Set(availableSubjects.map((s) => s.id));
    const defaultSelected = (selectedFromQuery.length ? selectedFromQuery : preselect).filter((id) => validSubjectIds.has(id));
    const heading = document.getElementById("practiceHeading");
    const modeTag = document.getElementById("practiceModeTag");
    const subtitle = document.getElementById("practiceSubtitle");
    const setupSubjectChecks = document.getElementById("setupSubjectChecks");
    const setupYearSection = document.getElementById("setupYearSection");
    const setupYearButtons = document.getElementById("setupYearButtons");
    const setupSelectedCount = document.getElementById("setupSelectedCount");
    const countInput = document.getElementById("setupQuestionPerSubject");
    const minutesInput = document.getElementById("setupTotalMinutes");
    const countLabel = document.getElementById("setupCountLabel");
    const timeLabel = document.getElementById("setupTimeLabel");
    const beginBtn = document.getElementById("beginPracticeBtn");
    const nextBtn = document.getElementById("nextQuestionBtn");
    const prevBtn = document.getElementById("prevQuestionBtn");
    const endBtn = document.getElementById("endQuizBtn");
    const submitTopBtn = document.getElementById("submitExamTopBtn");
    const setupCard = document.getElementById("setupCard");
    const setupMessage = document.getElementById("setupMessage");
    const backBtn = document.getElementById("practiceBackBtn");
    const logoutBtn = document.getElementById("practiceLogoutBtn");

    const label = mode === MODE_CBT ? "JAMB CBT Simulation" : "Study Mode";
    if (heading) heading.textContent = label + " Setup";
    if (modeTag) modeTag.textContent = "Mode: " + label;
    if (subtitle) subtitle.textContent = mode === MODE_CBT
      ? "Select up to 4 subjects, choose question/time settings, then start exam."
      : "Pick a subject and launch a focused practice session.";
    if (countLabel) countLabel.textContent = "Questions per subject (1-100)";
    if (timeLabel) timeLabel.textContent = "Total exam time (minutes, 10-240)";
    if (submitTopBtn) submitTopBtn.classList.add("hidden");
    if (setupCard) setupCard.classList.remove("hidden");

    const countStorageKey = mode === MODE_CBT ? "testify_qps_cbt" : "testify_qps_study";
    const minutesStorageKey = mode === MODE_CBT ? "testify_minutes_cbt" : "testify_minutes_study";
    const yearStorageKey = "testify_year_cbt";

    function subjectIcon(name) {
      const key = String(name || "").toLowerCase();
      if (key.includes("english")) return "language";
      if (key.includes("mathematics") || key.includes("math")) return "function";
      if (key.includes("physics")) return "science";
      if (key.includes("chemistry")) return "experiment";
      if (key.includes("biology")) return "biotech";
      if (key.includes("economics")) return "payments";
      return "auto_stories";
    }

    function selectedIds() {
      if (!setupSubjectChecks) return [];
      return Array.from(setupSubjectChecks.querySelectorAll("[data-subject-check]:checked")).map((node) => node.getAttribute("data-subject-check") || "");
    }

    function updateSelectedCount() {
      if (!setupSelectedCount) return;
      const current = selectedIds().length;
      setupSelectedCount.textContent = mode === MODE_CBT
        ? String(current) + "/4 Selected"
        : String(current) + " Selected";
    }

    const availableYears = Array.from(new Set(
      availableSubjects.flatMap((subject) => subjectQuestionsByMode(subject, MODE_CBT))
        .map((question) => Number(question.year))
        .filter((year) => Number.isInteger(year) && year > 0)
    )).sort((a, b) => b - a);
    const fallbackYear = new Date().getFullYear();
    const storedYear = Number(localStorage.getItem(yearStorageKey));
    let selectedYear = Number.isInteger(yearParam) && yearParam > 0
      ? yearParam
      : (Number.isInteger(storedYear) && storedYear > 0 ? storedYear : (availableYears[0] || fallbackYear));
    if (availableYears.length && !availableYears.includes(selectedYear)) selectedYear = availableYears[0];

    if (setupYearSection) setupYearSection.classList.toggle("hidden", mode !== MODE_CBT);
    if (setupYearButtons && mode === MODE_CBT) {
      const yearsToShow = availableYears.length ? availableYears.slice(0, 6) : [selectedYear];
      const renderYearButtons = () => {
        setupYearButtons.innerHTML = yearsToShow.map((year) => {
          const active = year === selectedYear;
          return "<button type=\"button\" data-exam-year=\"" + year + "\" class=\"" +
            (active
              ? "year-btn year-btn-active"
              : "year-btn") +
            "\">" + year + "</button>";
        }).join("");
        setupYearButtons.querySelectorAll("[data-exam-year]").forEach((button) => {
          button.addEventListener("click", () => {
            selectedYear = Number(button.getAttribute("data-exam-year")) || selectedYear;
            renderYearButtons();
          });
        });
      };
      renderYearButtons();
    }

    if (setupSubjectChecks) {
      const preselectedSet = new Set(defaultSelected);
      setupSubjectChecks.innerHTML = availableSubjects.map((subject, index) => {
        const checked = preselectedSet.has(subject.id) || (!preselectedSet.size && index === 0);
        const count = subjectQuestionsByMode(subject, mode).length;
        return "<label class=\"subject-check-item group\">" +
          "<input type=\"checkbox\" data-subject-check=\"" + safeText(subject.id) + "\"" + (checked ? " checked" : "") + ">" +
          "<span class=\"subject-check-body\">" +
            "<span class=\"subject-check-icon material-symbols-outlined\">" + subjectIcon(subject.name) + "</span>" +
            "<span class=\"subject-check-main\"><strong>" + safeText(subject.name) + "</strong><small>" + count + " questions</small></span>" +
          "</span>" +
        "</label>";
      }).join("");

      setupSubjectChecks.querySelectorAll("[data-subject-check]").forEach((input) => {
        input.addEventListener("change", () => {
          const checked = selectedIds();
          if (mode === MODE_STUDY && checked.length > 1) {
            setupSubjectChecks.querySelectorAll("[data-subject-check]").forEach((other) => {
              if (other !== input) other.checked = false;
            });
            updateSelectedCount();
            return;
          }
          if (checked.length <= 4) {
            updateSelectedCount();
            return;
          }
          input.checked = false;
          if (setupMessage) {
            setupMessage.textContent = "Maximum of 4 subjects allowed.";
            setupMessage.className = "message message-error";
          }
          updateSelectedCount();
        });
      });
      updateSelectedCount();
    }

    if (countInput) {
      const stored = Number(localStorage.getItem(countStorageKey));
      const fallbackCount = mode === MODE_CBT ? 40 : 20;
      const pickedCount = Number.isInteger(countParam) && countParam > 0
        ? Math.min(countParam, 100)
        : (Number.isInteger(stored) && stored > 0 ? Math.min(stored, 100) : fallbackCount);
      countInput.value = String(Math.max(1, pickedCount));
    }
    if (minutesInput) {
      const stored = Number(localStorage.getItem(minutesStorageKey));
      const fallbackMinutes = mode === MODE_CBT ? 120 : 60;
      const pickedMinutes = Number.isInteger(minutesParam) && minutesParam > 0
        ? Math.min(minutesParam, 240)
        : (Number.isInteger(stored) && stored > 0 ? Math.min(stored, 240) : fallbackMinutes);
      minutesInput.value = String(Math.max(10, pickedMinutes));
    }

    if (beginBtn) beginBtn.textContent = mode === MODE_CBT ? "Start Exam" : "Start Study Exam";
    if (endBtn) endBtn.textContent = "Back to Setup";
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.history.length > 1) window.history.back();
        else window.location.href = "student.html";
      });
    }

    if (beginBtn) {
      beginBtn.addEventListener("click", () => {
        if (!setupSubjectChecks) return;
        let subjectIds = selectedIds();
        const questionCount = Number(countInput ? countInput.value : 0);
        const totalMinutes = Number(minutesInput ? minutesInput.value : 0);

        if (!subjectIds.length) {
          if (setupMessage) {
            setupMessage.textContent = "Select at least one subject.";
            setupMessage.className = "message message-error";
          }
          return;
        }
        if (mode === MODE_STUDY && subjectIds.length > 1) {
          subjectIds = subjectIds.slice(0, 1);
        }
        if (mode === MODE_CBT && subjectIds.length > 4) {
          if (setupMessage) {
            setupMessage.textContent = "Maximum of 4 subjects allowed.";
            setupMessage.className = "message message-error";
          }
          return;
        }
        if (!Number.isInteger(questionCount) || questionCount < 1 || questionCount > 100) {
          if (setupMessage) {
            setupMessage.textContent = "Questions per subject must be between 1 and 100.";
            setupMessage.className = "message message-error";
          }
          return;
        }
        if (!Number.isInteger(totalMinutes) || totalMinutes < 10 || totalMinutes > 240) {
          if (setupMessage) {
            setupMessage.textContent = "Total exam time must be between 10 and 240 minutes.";
            setupMessage.className = "message message-error";
          }
          return;
        }
        if (mode === MODE_CBT && (!Number.isInteger(selectedYear) || selectedYear < 1990)) {
          if (setupMessage) {
            setupMessage.textContent = "Select a valid exam year.";
            setupMessage.className = "message message-error";
          }
          return;
        }

        localStorage.setItem(countStorageKey, String(questionCount));
        localStorage.setItem(minutesStorageKey, String(totalMinutes));
        if (mode === MODE_CBT) localStorage.setItem(yearStorageKey, String(selectedYear));

        const nextUrl = buildPracticeUrl(mode, {
          preselect: subjectIds,
          subjects: subjectIds,
          questionCount,
          totalMinutes,
          examYear: mode === MODE_CBT ? selectedYear : null
        }, true);
        window.location.href = nextUrl;
      });
    }

    if (runNow) {
      if (modeTag) modeTag.textContent = "Mode: " + label + " (Running)";
      if (subtitle) subtitle.textContent = "Exam started. Submit from the top-right button when done.";

      const runSubjectIds = selectedFromQuery.filter((id) => validSubjectIds.has(id)).slice(0, 4);
      if (mode === MODE_STUDY && runSubjectIds.length > 1) runSubjectIds.splice(1);
      const questionCount = Number.isInteger(countParam) && countParam > 0
        ? Math.min(countParam, 100)
        : Number(localStorage.getItem(countStorageKey) || (mode === MODE_CBT ? 40 : 20));
      const totalMinutes = Number.isInteger(minutesParam) && minutesParam > 0
        ? Math.min(minutesParam, 240)
        : Number(localStorage.getItem(minutesStorageKey) || (mode === MODE_CBT ? 120 : 60));
      const runExamYear = mode === MODE_CBT && Number.isInteger(yearParam) && yearParam > 0
        ? yearParam
        : (mode === MODE_CBT ? selectedYear : null);

      if (!runSubjectIds.length) {
        if (setupMessage) {
          setupMessage.textContent = "No valid subject selected for this exam.";
          setupMessage.className = "message message-error";
        }
      } else if (startQuiz(mode, runSubjectIds, questionCount, Math.max(10, totalMinutes), { examYear: runExamYear }) && setupCard) {
        setupCard.classList.add("hidden");
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (!activeQuiz || activeQuiz.completed) return;
        if (activeQuiz.index >= activeQuiz.questions.length - 1) return;
        activeQuiz.index += 1;
        showQuizQuestion();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (!activeQuiz || activeQuiz.completed) return;
        if (activeQuiz.index <= 0) return;
        activeQuiz.index -= 1;
        showQuizQuestion();
      });
    }

    if (submitTopBtn) submitTopBtn.addEventListener("click", finishQuiz);

    if (endBtn) {
      endBtn.addEventListener("click", () => {
        if (runNow) {
          const selectedIds = selectedFromQuery.filter((id) => validSubjectIds.has(id));
          if (mode === MODE_STUDY && selectedIds.length > 1) selectedIds.splice(1);
          window.location.href = buildPracticeUrl(mode, {
            preselect: selectedIds,
            subjects: [],
            questionCount: Number(countInput ? countInput.value : 40),
            totalMinutes: Number(minutesInput ? minutesInput.value : 60),
            examYear: mode === MODE_CBT ? selectedYear : null
          }, false);
          return;
        }
        endQuiz(false);
      });
    }
    if (logoutBtn) logoutBtn.addEventListener("click", () => { clearAuth(); window.location.href = "hi.html"; });
  }

  function initResultPage() {
    const auth = requireRole("student");
    if (!auth) return;
    const payload = getJSON(RESULT_KEY, null);
    const modeEl = document.getElementById("resultMode");
    const overallEl = document.getElementById("resultOverall");
    const metaEl = document.getElementById("resultMeta");
    const tableBody = document.getElementById("resultTableBody");
    const canvas = document.getElementById("resultPie");
    const answeredEl = document.getElementById("resultAnswered");
    const correctEl = document.getElementById("resultCorrect");
    const wrongEl = document.getElementById("resultWrong");
    const unansweredEl = document.getElementById("resultUnanswered");
    const weakTopicsEl = document.getElementById("resultWeakTopics");
    const backBtn = document.getElementById("resultBackBtn");
    const logoutBtn = document.getElementById("resultLogoutBtn");

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.history.length > 1) window.history.back();
        else window.location.href = "student.html";
      });
    }
    if (logoutBtn) logoutBtn.addEventListener("click", () => { clearAuth(); window.location.href = "hi.html"; });

    if (!payload || !Array.isArray(payload.subjectResults)) {
      if (overallEl) overallEl.textContent = "No result found.";
      if (metaEl) metaEl.textContent = "Run an exam first.";
      if (tableBody) tableBody.innerHTML = "<tr><td colspan=\"4\">No data.</td></tr>";
      if (weakTopicsEl) weakTopicsEl.innerHTML = "<div class=\"empty-state\">No topic insight yet.</div>";
      return;
    }

    if (modeEl) {
      let modeText = payload.mode === MODE_CBT ? "CBT Exam Result" : "Study Exam Result";
      if (payload.examYear) modeText += " | Year " + payload.examYear;
      modeEl.textContent = modeText;
    }
    if (overallEl) overallEl.textContent = payload.overallScore + "/" + payload.maxOverall + " (" + payload.overallPercent + "%)";
    if (metaEl) {
      metaEl.textContent = "Answered " + payload.answered + "/" + payload.totalQuestions +
        " | Correct: " + payload.correct +
        " | Wrong: " + payload.wrong +
        " | Unanswered: " + payload.unanswered +
        " | Time Used: " + formatDuration(payload.timeSpentSeconds || 0);
    }
    if (answeredEl) answeredEl.textContent = payload.answered + "/" + payload.totalQuestions;
    if (correctEl) correctEl.textContent = String(payload.correct);
    if (wrongEl) wrongEl.textContent = String(payload.wrong);
    if (unansweredEl) unansweredEl.textContent = String(payload.unanswered);
    if (tableBody) {
      tableBody.innerHTML = payload.subjectResults.map((item) => {
        return "<tr>" +
          "<td>" + safeText(item.subjectName) + "</td>" +
          "<td>" + item.correct + "/" + item.total + "</td>" +
          "<td>" + item.score + "/100</td>" +
          "<td>" + item.score + "%</td>" +
        "</tr>";
      }).join("");
    }
    if (weakTopicsEl) {
      weakTopicsEl.innerHTML = "<div class=\"empty-state\">Topic insight is not available in this version.</div>";
    }

    if (canvas && typeof canvas.getContext === "function") {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const values = [payload.correct, payload.wrong, payload.unanswered];
        const colors = ["#15803d", "#dc2626", "#1d4ed8"];
        const total = values.reduce((sum, value) => sum + value, 0) || 1;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = Math.min(cx, cy) - 10;
        let start = -Math.PI / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        values.forEach((value, index) => {
          const slice = (value / total) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, start, start + slice);
          ctx.closePath();
          ctx.fillStyle = colors[index];
          ctx.fill();
          start += slice;
        });
      }
    }
  }

  async function init() {
    const page = document.body.getAttribute("data-page");
    ensureBatchesData();
    applyHapticsAndMotion();

    const auth = await refreshAuthFromBackend();
    if (auth && auth.needsActivation && (page === "student" || page === "practice" || page === "result")) {
      window.location.href = buildActivationUrl(auth.email);
      return;
    }

    if (page === "admin" || page === "student" || page === "practice") {
      if (auth && auth.source === "backend") {
        const subjectSync = await syncSubjectsFromBackend();
        if (!subjectSync.ok) ensureSeedData();
      } else {
        ensureSeedData();
      }
      ensureQuestionIds();
    }

    if (page === "student" || page === "practice" || page === "result") {
      if (auth && auth.source === "backend" && auth.role === "student") {
        await flushAttemptSyncQueue();
        await syncAttemptsFromBackend();
      }
    }

    if (page === "login") initStudentLoginPage();
    if (page === "student-register") initStudentRegisterPage();
    if (page === "activation") initActivationPage();
    if (page === "admin-login") initAdminLoginPage();
    if (page === "admin") initAdminPage();
    if (page === "student") initStudentPage();
    if (page === "practice") initPracticePage();
    if (page === "result") initResultPage();
  }

  init().catch(() => {
    // Keep app usable with local data when backend bootstrap fails.
    ensureSeedData();
    ensureQuestionIds();
    if (document.body.getAttribute("data-page") === "student") {
      document.body.classList.remove("student-booting");
    }
  });
})();
