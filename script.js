// =================== بيانات الطالب ===================
const studentData = {
    "1121094377": {
        name: "أملاك فواز غربي الشمري",
        degree: "بكالوريوس",
        major: "قانون تجاري",
        status: "مقبول",
        admissionDate: "2025/09/01",
        phone: "0501733515",
        fees: {
            tuition: 1500,
            registration: 0,
            books: 0,
            total: 1500
        }
    }
};

let currentStudent = null;

// =================== دوال مساعدة ===================
function hideAllForms() {
    ["forms-section", "results-section", "inquiry-form"].forEach(id => document.getElementById(id)?.classList.add("hidden"));
}

function scrollToElement(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =================== الاستعلام عن القبول ===================
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section")?.classList.remove("hidden");
    document.getElementById("inquiry-form")?.classList.remove("hidden");
    document.getElementById("inquiry-id").value = "";
    document.getElementById("inquiry-phone").value = "";
    scrollToElement("forms-section");
}

function checkAdmission() {
    const id = document.getElementById("inquiry-id").value.trim();
    const phone = document.getElementById("inquiry-phone").value.trim();

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
            <button class="submit-btn" id="confirm-btn">تأكيد القبول</button>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
    document.getElementById("confirm-btn").addEventListener("click", showConfirmationSuccess);
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
            <button class="submit-btn" id="pay-btn">السداد</button>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
    document.getElementById("pay-btn").addEventListener("click", showPaymentInvoice);
}

// =================== شاشة السداد ===================
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
                    <div class="bank-item"><span>الآيبان:</span><span>SA8280000859608014826386</span></div>
                    <div class="bank-item"><span>اسم المستفيد:</span><span>أملاك فواز غربي الشمري</span></div>
                </div>
            </div>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
