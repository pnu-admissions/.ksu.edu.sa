// =================== بيانات الطلاب ===================
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

    // أزرار التحكم
    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = showInquiryForm;
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = () => alert("يرجى البدء بالاستعلام عن القبول أولاً");
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

    document.getElementById("inquiry-card").querySelector(".submit-btn").onclick = () => alert("لقد استعلمت بالفعل عن القبول.");
    document.getElementById("confirmation-card").querySelector(".submit-btn").onclick = () => alert("لقد أكدت قبولك بالفعل.");
    document.getElementById("payment-card").querySelector(".submit-btn").onclick = showPaymentInvoice;
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
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// =================== نموذج تقديم طلب جديد ===================
function showApplicationForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");

    // إنشاء النموذج داخل div مخصص
    let formContainer = document.getElementById("application-form-container");
    if (!formContainer) {
        formContainer = document.createElement("div");
        formContainer.id = "application-form-container";
        formContainer.classList.add("form-container");
        document.getElementById("forms-section").appendChild(formContainer);
    }

    formContainer.innerHTML = `
        <h3>نموذج تقديم طلب جديد</h3>
        <form id="applicationForm" enctype="multipart/form-data">
            <div class="form-group"><label>الاسم الكامل</label><input type="text" name="fullName" required></div>
            <div class="form-group"><label>رقم الهوية / الإقامة</label><input type="text" name="idNumber" required></div>
            <div class="form-group"><label>تاريخ الميلاد</label><input type="date" name="dob" required></div>
            <div class="form-group"><label>البريد الإلكتروني</label><input type="email" name="email" required></div>
            <div class="form-group"><label>رقم الجوال</label><input type="text" name="phone" required></div>
            <div class="form-group"><label>البرنامج الدراسي</label>
                <select name="program" required>
                    <option value="">اختر البرنامج</option>
                    <option>بكالوريوس</option>
                    <option>ماجستير</option>
                    <option>دكتوراه</option>
                    <option>دبلوم عالي</option>
                </select>
            </div>
            <div class="form-group"><label>التخصص</label><input type="text" name="major" required></div>
            <div class="form-group"><label>المعدل النهائي</label><input type="text" name="gpa" required></div>
            <div class="form-group"><label>رفع صورة الشهادة</label><input type="file" name="certificateFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
            <div class="form-group"><label>رفع صورة الهوية</label><input type="file" name="idFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
            <button type="submit" class="submit-btn">إرسال الطلب</button>
        </form>
        <div id="successMessage" class="hidden" style="margin-top:15px; padding:10px; background:#d4edda; color:#155724; border-radius:5px;">
            تم استلام جميع بياناتك بنجاح. سيتم التواصل معك لإعطائك الرقم الجامعي.
        </div>
    `;
    formContainer.classList.remove("hidden");
    scrollToElement("forms-section");

    // معالجة الإرسال
    const applicationForm = document.getElementById("applicationForm");
    applicationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("successMessage").classList.remove("hidden");
        this.reset();
    });
        }
