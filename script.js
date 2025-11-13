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
    document.getElementById("inquiry-form")?.classList.add("hidden");
    document.getElementById("application-form-container")?.classList.add("hidden");
}

function scrollToElement(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =================== الاستعلام عن القبول ===================
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
            <div class="invoice-item"><span>الرسوم الدراسية:</span><span>${currentStudent.fees.tuition} ريال</span></div>
            <div class="invoice-item"><span>رسوم التسجيل:</span><span>${currentStudent.fees.registration} ريال</span></div>
            <div class="invoice-item"><span>رسوم الكتب:</span><span>${currentStudent.fees.books} ريال</span></div>
            <div class="invoice-total"><span>المجموع الكلي:</span><span>${currentStudent.fees.total} ريال سعودي</span></div>
        </div>
        <div class="bank-info">
            <h4>معلومات التحويل البنكي</h4>
            <p>اسم البنك: راجحي</p>
            <p>رقم الحساب المحول منه:</p>
            <input type="text" id="fromAccount" placeholder="رقم الحساب">
            <p>تاريخ العملية:</p>
            <input type="date" id="transferDate">
            <p>اسم الشخص المحول:</p>
            <input type="text" id="fromName" placeholder="الاسم">
        </div>
        <div class="upload-section">
            <h5>رفع إيصال السداد</h5>
            <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png">
            <button class="submit-btn" onclick="submitPayment()">إرسال إيصال السداد</button>
        </div>
    </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// إرسال إيصال السداد
function submitPayment() {
    const fileInput = document.getElementById("receipt-upload");
    const fromAcc = document.getElementById("fromAccount").value;
    const date = document.getElementById("transferDate").value;
    const fromName = document.getElementById("fromName").value;

    if (!fileInput.files[0] || !fromAcc || !date || !fromName) {
        alert("يرجى تعبئة جميع البيانات ورفع الإيصال أولاً");
        return;
    }

    const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";
    const formData = new FormData();
    formData.append("receipt", fileInput.files[0]);
    formData.append("fromAccount", fromAcc);
    formData.append("transferDate", date);
    formData.append("fromName", fromName);
    formData.append("studentName", currentStudent.name);

    fetch(url, { method: 'POST', body: formData })
        .then(res => res.text())
        .then(data => alert("تم إرسال الإيصال بنجاح!"))
        .catch(err => alert("حدث خطأ في الإرسال."));
}

// =================== نموذج تقديم طلب جديد ===================
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

    formContainer.innerHTML = `
    <h3>نموذج تقديم طلب جديد</h3>
    <form id="applicationForm" enctype="multipart/form-data">
        <div class="form-group"><label>الاسم الكامل</label><input type="text" name="fullName" required></div>
        <div class="form-group"><label>رقم الهوية / الإقامة</label><input type="text" name="idNumber" required></div>
        <div class="form-group"><label>تاريخ الميلاد</label><input type="date" name="dob" required></div>
        <div class="form-group"><label>الجنس</label>
            <select name="gender" required>
                <option value="">اختر</option>
                <option>ذكر</option>
                <option>أنثى</option>
            </select>
        </div>
        <div class="form-group"><label>الجنسية</label><input type="text" name="nationality" required></div>
        <div class="form-group"><label>الدولة</label><input type="text" name="country" required></div>
        <div class="form-group"><label>المدينة</label><input type="text" name="city" required></div>
        <div class="form-group"><label>العنوان الكامل</label><input type="text" name="address" required></div>

        <div class="form-group"><label>رقم الجوال</label><input type="text" name="phone" required></div>
        <div class="form-group"><label>البريد الإلكتروني</label><input type="email" name="email" required></div>
        <div class="form-group"><label>رقم جوال ولي الأمر (اختياري)</label><input type="text" name="guardianPhone"></div>

        <div class="form-group"><label>نوع المؤهل الدراسي</label><input type="text" name="degreeType" required></div>
        <div class="form-group"><label>سنة التخرج</label><input type="number" name="graduationYear" required></div>
        <div class="form-group"><label>المعدل</label><input type="text" name="gpa" required></div>
        <div class="form-group"><label>اسم المدرسة / الجامعة السابقة</label><input type="text" name="prevInstitution" required></div>
        <div class="form-group"><label>تخصص المؤهل السابق</label><input type="text" name="prevMajor"></div>

        <div class="form-group"><label>رفع صورة الهوية</label><input type="file" name="idFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
        <div class="form-group"><label>رفع شهادة التخرج</label><input type="file" name="certificateFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
        <div class="form-group"><label>صورة شخصية (اختياري)</label><input type="file" name="photoFile" accept=".jpg,.jpeg,.png"></div>

        <div class="form-group"><label>البرنامج المطلوب</label><input type="text" name="program" required></div>
        <div class="form-group"><label>نوع الدراسة</label>
            <select name="studyType" required>
                <option value="">اختر</option>
                <option>انتظام</option>
                <option>انتساب</option>
                <option>مسائي</option>
            </select>
        </div>
        <div class="form-group"><label>الرغبة الأولى</label><input type="text" name="choice1" required></div>
        <div class="form-group"><label>الرغبة الثانية</label><input type="text" name="choice2"></div>
        <div class="form-group"><label>سبب اختيار البرنامج</label><textarea name="reason" rows="3"></textarea></div>

        <button type="submit" class="submit-btn">إرسال الطلب</button>
    </form>
    <div id="successMessage" class="success-msg hidden">تم استلام جميع بياناتك بنجاح. سيتم التواصل معك لإعطائك الرقم الجامعي.</div>
    `;

    formContainer.classList.remove("hidden");
    scrollToElement("forms-section");

    const applicationForm = document.getElementById("applicationForm");
    applicationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";
        const formData = new FormData(applicationForm);
        fetch(url, { method: 'POST', body: formData })
            .then(res => res.text())
            .then(data => {
                document.getElementById("successMessage").classList.remove("hidden");
                applicationForm.reset();
            })
            .catch(err => alert("حدث خطأ أثناء إرسال النموذج."));
    });
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
