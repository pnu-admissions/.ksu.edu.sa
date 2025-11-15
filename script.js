// =================== بيانات الطلاب ===================
const studentData = {
    "1121094377": {
        name: "أملاك فواز غربي الشمري",
        degree: "بكالوريوس",
        major: "قانون تجاري",
        status: "مقبول",
        admissionDate: "2025/09/01",
        phone: "0501733515",
        fees: { tuition: 1800, registration: 100, books: 200, total: 2100 }
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

// =================== الاستعلام عن القبول ===================
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("inquiry-form").classList.remove("hidden");
    document.getElementById("inquiry-id").value = "";
    document.getElementById("inquiry-phone").value = "";
    scrollToElement("forms-section");
}

function checkAdmission() {
    const id = document.getElementById("inquiry-id").value;
    const phone = document.getElementById("inquiry-phone").value;

    if (!id || !phone) { alert("الرجاء إدخال رقم الهوية ورقم الجوال."); return; }

    if (studentData[id] && studentData[id].phone === phone) {
        currentStudent = studentData[id];
        showAdmissionResult();
    } else {
        alert("عذراً، لا توجد بيانات قبول مطابقة.");
    }
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
}

// =================== تأكيد القبول ===================
function showConfirmationSuccess() {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <h3>تم تأكيد قبولك بنجاح!</h3>
            <p>مبروك! تم تأكيد قبولك في جامعة الملك سعود</p>
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
            <h3>فاتورة السداد</h3>
            <p>الرجاء سداد الرسوم المستحقة لإتمام التسجيل</p>
            <div class="student-info">
                <div class="info-item"><label>الطالب:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
            </div>
            <div class="payment-invoice">
                <div class="invoice-header"><h4>تفاصيل الرسوم</h4></div>
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
                    <div class="bank-item"><span>رقم الآيبان:</span><span>SA8280000859608014826386</span></div>
                </div>
            </div>
            <div class="upload-section">
                <h5>رفع إيصال السداد</h5>
                <div class="upload-area" onclick="document.getElementById('receipt-upload').click()">
                    <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png" onchange="displayFileName()">
                    <div class="upload-icon">📄</div>
                    <p>اضغط هنا لرفع إيصال السداد</p>
                    <p id="file-name" style="font-size:16px;color:#00563F;font-weight:bold;margin-top:10px;"></p>
                </div>
                <button class="submit-btn mt-20" onclick="submitPayment()">إرسال إيصال السداد</button>
            </div>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// =================== رفع وعرض اسم الملف ===================
function displayFileName() {
    const fileInput = document.getElementById("receipt-upload");
    const fileNameDisplay = document.getElementById("file-name");
    if (fileInput.files.length > 0) fileNameDisplay.textContent = `الملف المحدد: ${fileInput.files[0].name}`;
    else fileNameDisplay.textContent = "";
}

// =================== إرسال إيصال السداد ===================
function submitPayment() {
    const fileInput = document.getElementById("receipt-upload");
    if (!fileInput.files[0]) { alert("يرجى رفع إيصال السداد أولاً"); return; }

    setTimeout(() => { showPaymentSuccess(); }, 1500);
}

// =================== رسالة نجاح السداد ===================
function showPaymentSuccess() {
    hideAllForms();
    const refNum = `KSU-${Date.now()}`;
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <h3>تم إرسال إيصال السداد بنجاح!</h3>
            <p class="status-accepted">شكراً لك! سيتم مراجعة إيصال السداد خلال 24 ساعة</p>
            <div style="background: rgba(40,167,69,0.1); padding:20px; border-radius:15px; text-align:center; margin:20px 0;">
                <h4 style="color:#28a745;margin-bottom:15px;">تم استلام إيصال السداد</h4>
                <p style="color:#333;margin-bottom:10px;">رقم المرجع: ${refNum}</p>
            </div>
            <div class="student-info">
                <div class="info-item"><label>الاسم:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>المبلغ المدفوع:</label><span>${currentStudent.fees.total} ريال سعودي</span></div>
                <div class="info-item"><label>تاريخ الإرسال:</label><span>${new Date().toLocaleDateString("ar-SA")}</span></div>
            </div>
            <div class="text-center mt-20">
                <button class="submit-btn" onclick="goHome()" style="width:auto;padding:15px 40px;">العودة للرئيسية</button>
            </div>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// العودة للرئيسية
function goHome() {
    hideAllForms();
    currentStudent = null;
    scrollToElement("hero");
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => { hideAllForms(); });
