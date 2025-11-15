<!-- HTML -->
<div id="hero">
    <div id="inquiry-card" class="card">
        <h3>استعلام عن القبول</h3>
        <button class="submit-btn" onclick="showInquiryForm()">ابدأ الاستعلام</button>
    </div>
    <div id="confirmation-card" class="card">
        <h3>تأكيد القبول</h3>
        <button class="submit-btn" onclick="() => alert('يرجى البدء بالاستعلام عن القبول أولاً')">تأكيد القبول</button>
    </div>
    <div id="payment-card" class="card">
        <h3>السداد</h3>
        <button class="submit-btn" onclick="() => alert('يرجى البدء بالاستعلام عن القبول أولاً')">السداد</button>
    </div>
</div>

<div id="forms-section"></div>
<div id="results-section"></div>

<div id="inquiry-form" class="hidden">
    <h3>استعلام عن القبول</h3>
    <label>رقم الهوية</label><input type="text" id="inquiry-id">
    <label>رقم الجوال</label><input type="text" id="inquiry-phone">
    <button class="submit-btn" onclick="checkAdmission()">استعلام</button>
</div>

<script>
// =================== بيانات الطلاب ===================
const studentData = {
    "1121094377": {
        name: "أملاك فواز غربي الشمري",
        degree: "بكالوريوس",
        major: "قانون تجاري",
        status: "مقبول",
        admissionDate: "2025/09/01",
        phone: "0501733515",
        fees: { tuition: 1500, registration: 0, books: 0, total: 1500 }
    }
};

let currentStudent = null;

// =================== دوال مساعدة ===================
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("inquiry-form").classList.add("hidden");
}

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// =================== استعلام القبول ===================
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("inquiry-form").classList.remove("hidden");
    document.getElementById("inquiry-id").value = "";
    document.getElementById("inquiry-phone").value = "";
    scrollToElement("forms-section");

    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = showInquiryForm;
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
}

function checkAdmission() {
    const id = document.getElementById("inquiry-id").value;
    const phone = document.getElementById("inquiry-phone").value;

    if (!id || !phone) { alert("الرجاء إدخال رقم الهوية ورقم الجوال."); return; }

    if (studentData[id] && studentData[id].phone === phone) {
        currentStudent = studentData[id];
        showAdmissionResult();
    } else { alert("عذراً، لا توجد بيانات قبول مطابقة."); }
}

// =================== عرض نتيجة القبول ===================
function showAdmissionResult() {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم قبولك بنجاح!</h3>
                <p class="status-accepted">مبروك! تم قبولك في جامعة الملك سعود</p>
            </div>
            <div class="student-info">
                <div class="info-item"><label>الاسم:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>الدرجة العلمية:</label><span>${currentStudent.degree}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
                <div class="info-item"><label>حالة القبول:</label><span>${currentStudent.status}</span></div>
                <div class="info-item"><label>تاريخ القبول:</label><span>${currentStudent.admissionDate}</span></div>
            </div>
            <button class="submit-btn" onclick="showConfirmationSuccess()">تأكيد القبول</button>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");

    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = () => alert("لقد استعلمت بالفعل عن القبول.");
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = showConfirmationSuccess;
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = () => alert("يرجى تأكيد القبول أولاً");
}

// =================== تأكيد القبول ===================
function showConfirmationSuccess() {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم تأكيد قبولك بنجاح!</h3>
                <p class="status-accepted">مبروك! تم تأكيد قبولك في جامعة الملك سعود</p>
            </div>
            <div class="student-info">
                <div class="info-item"><label>الاسم:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>الدرجة العلمية:</label><span>${currentStudent.degree}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
            </div>
            <button class="submit-btn" onclick="showPaymentInvoice()">السداد</button>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// =================== فاتورة السداد ===================
function showPaymentInvoice() {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>فاتورة السداد</h3>
                <p>الرجاء سداد الرسوم المستحقة لإتمام التسجيل</p>
            </div>
            <div class="student-info">
                <div class="info-item"><label>الطالب:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
            </div>
            <div class="payment-invoice">
                <div class="invoice-details">
                    <div class="invoice-item"><span>الرسوم الدراسية:</span><span>${currentStudent.fees.tuition} ريال</span></div>
                    <div class="invoice-item"><span>رسوم التسجيل:</span><span>${currentStudent.fees.registration} ريال</span></div>
                    <div class="invoice-item"><span>رسوم الكتب:</span><span>${currentStudent.fees.books} ريال</span></div>
                </div>
                <div class="invoice-total">
                    <p>المجموع الكلي</p>
                    <p class="total-amount">${currentStudent.fees.total} ريال سعودي</p>
                </div>
            </div>

            <div class="bank-info">
                <h5>معلومات التحويل البنكي</h5>
                <div class="bank-details">
                    <div class="bank-item"><span>اسم البنك:</span><span>البنك الراجحي السعودي</span></div>
                    <div class="bank-item"><span>رقم الحساب:</span><span>SA8280000859608014826386</span></div>
                    <div class="bank-item"><span>اسم المستفيد:</span><span>جامعة الملك سعود</span></div>
                </div>
            </div>

            <div class="upload-section">
                <h5>رفع إيصال السداد</h5>
                <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png" onchange="displayFileName()">
                <p id="file-name" style="font-size:16px; color:#00563F; font-weight:bold;"></p>
                <button class="submit-btn mt-20" onclick="submitPayment()">إرسال إيصال السداد</button>
            </div>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// عرض اسم الملف المرفوع
function displayFileName() {
    const fileInput = document.getElementById("receipt-upload");
    const fileNameDisplay = document.getElementById("file-name");
    if (fileInput.files.length > 0) fileNameDisplay.textContent = `الملف المحدد: ${fileInput.files[0].name}`;
    else fileNameDisplay.textContent = "";
}

// محاكاة إرسال السداد
function submitPayment() {
    const fileInput = document.getElementById("receipt-upload");
    if (!fileInput.files[0]) { alert("يرجى رفع إيصال السداد أولاً"); return; }
    setTimeout(() => { alert("تم إرسال إيصال السداد بنجاح!"); }, 1000);
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
</script>
