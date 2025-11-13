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

    const existForm = document.getElementById("application-form-container");
    if (existForm) existForm.classList.add("hidden");

    document.getElementById("inquiry-form").classList.add("hidden");
}

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// =================== الاستعلام ===================
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

    if (!id || !phone) return alert("الرجاء إدخال رقم الهوية ورقم الجوال.");

    if (studentData[id] && studentData[id].phone === phone) {
        currentStudent = studentData[id];
        showAdmissionResult();
    } else {
        alert("عذراً، لا توجد بيانات مطابقة.");
    }
}

function showAdmissionResult() {
    hideAllForms();
    const box = document.getElementById("results-section");

    box.innerHTML = `
        <div class="result-card">
            <h3>تم قبولك بنجاح</h3>
            <p class="status-accepted">مبروك! تم قبولك في جامعة الملك سعود</p>

            <div class="student-info">
                <div class="info-item"><label>الاسم:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>الدرجة:</label><span>${currentStudent.degree}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
                <div class="info-item"><label>تاريخ القبول:</label><span>${currentStudent.admissionDate}</span></div>
            </div>

            <button class="submit-btn" onclick="showConfirmationSuccess()">تأكيد القبول</button>
        </div>
    `;

    box.classList.remove("hidden");
    scrollToElement("results-section");
}

// =================== تأكيد القبول ===================
function showConfirmationSuccess() {
    hideAllForms();

    const box = document.getElementById("results-section");
    box.innerHTML = `
        <div class="result-card">
            <h3>تم تأكيد القبول</h3>
            <p class="status-accepted">تم تأكيد قبولك بنجاح</p>

            <div class="student-info">
                <div class="info-item"><label>الاسم:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
            </div>

            <button class="submit-btn" onclick="showPaymentInvoice()">السداد</button>
        </div>
    `;
    box.classList.remove("hidden");
    scrollToElement("results-section");
}

// =================== فاتورة السداد ===================
function showPaymentInvoice() {
    hideAllForms();

    const box = document.getElementById("results-section");
    box.innerHTML = `
        <div class="result-card">
            <h3>فاتورة السداد</h3>
            <p>الرجاء سداد الرسوم لإتمام تسجيلك</p>

            <div class="student-info">
                <div class="info-item"><label>الطالب:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
            </div>

            <div class="payment-invoice">
                <h4>تفاصيل الرسوم</h4>
                <div class="invoice-item"><span>الرسوم الدراسية:</span> <span>${currentStudent.fees.tuition} ريال</span></div>
                <div class="invoice-item"><span>المجموع الكلي:</span> <span>${currentStudent.fees.total} ريال</span></div>
            </div>

            <h3 style="margin-top:20px;">بيانات التحويل البنكي</h3>
            <p><b>البنك:</b> الراجحي</p>
            <p><b>رقم الحساب / الآيبان:</b> SA3380000984608016472540</p>

            <h4 style="margin-top:20px;">أدخل بيانات عملية التحويل</h4>

            <form id="paymentForm">
                <div class="form-group"><label>اسم المحوّل</label><input type="text" name="senderName" required></div>
                <div class="form-group"><label>رقم الحساب المُحَوَّل منه</label><input type="text" name="senderAccount" required></div>
                <div class="form-group"><label>تاريخ العملية</label><input type="date" name="transferDate" required></div>
                <div class="form-group"><label>رفع إيصال التحويل</label><input type="file" name="receipt" required></div>

                <button class="submit-btn" type="submit">إرسال بيانات السداد</button>
            </form>

            <div id="paymentSuccess" class="hidden" style="margin-top:15px; background:#d4edda; padding:10px; border-radius:5px;">
                تم استلام بيانات السداد بنجاح.
            </div>
        </div>
    `;

    box.classList.remove("hidden");
    scrollToElement("results-section");

    document.getElementById("paymentForm").addEventListener("submit", e => {
        e.preventDefault();
        const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";

        const formData = new FormData(e.target);

        // أرسل بيانات السداد لنفس Google Script
        fetch(url, { method: "POST", body: formData })
            .then(res => res.text())
            .then(() => {
                document.getElementById("paymentSuccess").classList.remove("hidden");
                e.target.reset();
            })
            .catch(() => alert("خطأ أثناء الإرسال"));
    });
}

// =================== نموذج تقديم طلب جديد ===================
function showApplicationForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");

    let box = document.getElementById("application-form-container");
    if (!box) {
        box = document.createElement("div");
        box.id = "application-form-container";
        document.getElementById("forms-section").appendChild(box);
    }

    box.classList.remove("hidden");

    box.innerHTML = `
        <h2>نموذج التقديم الرسمي</h2>
        <form id="applicationForm" enctype="multipart/form-data">

            <h3>البيانات الشخصية</h3>
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

            <h3>بيانات التواصل</h3>
            <div class="form-group"><label>رقم الجوال</label><input type="text" name="phone" required></div>
            <div class="form-group"><label>البريد الإلكتروني</label><input type="email" name="email" required></div>
            <div class="form-group"><label>رقم ولي الأمر (اختياري)</label><input type="text" name="parentPhone"></div>

            <h3>بيانات المؤهل الدراسي</h3>
            <div class="form-group"><label>نوع المؤهل</label>
                <select name="degreeType" required>
                    <option value="">اختر</option>
                    <option>ثانوي</option>
                    <option>بكالوريوس</option>
                    <option>دبلوم</option>
                    <option>ماجستير</option>
                </select>
            </div>
            <div class="form-group"><label>سنة التخرج</label><input type="text" name="gradYear" required></div>
            <div class="form-group"><label>المعدل</label><input type="text" name="gpa" required></div>
            <div class="form-group"><label>اسم المدرسة / الجامعة</label><input type="text" name="school" required></div>
            <div class="form-group"><label>تخصص المؤهل السابق (إن وجد)</label><input type="text" name="prevMajor"></div>

            <h3>مرفقات مطلوبة</h3>
            <div class="form-group"><label>صورة الهوية</label><input type="file" name="idFile" required></div>
            <div class="form-group"><label>شهادة التخرج</label><input type="file" name="certificateFile" required></div>
            <div class="form-group"><label>صورة شخصية (اختياري)</label><input type="file" name="personalPhoto"></div>

            <h3>بيانات البرنامج المطلوب</h3>
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
            <div class="form-group"><label>الرغبة الثانية</label><input type="text" name="choice2" required></div>

            <h3>معلومات إضافية</h3>
            <div class="form-group"><label>سبب اختيار البرنامج</label><textarea name="reason" required></textarea></div>

            <button type="submit" class="submit-btn">إرسال الطلب</button>
        </form>

        <div id="successMessage" class="hidden" style="margin-top:15px; background:#d4edda; padding:10px; border-radius:5px;">
            تم استلام طلبك بنجاح. سيتم التواصل معك قريباً.
        </div>
    `;

    scrollToElement("forms-section");

    const form = document.getElementById("applicationForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";

        const formData = new FormData(form);

        fetch(url, { method: "POST", body: formData })
            .then(res => res.text())
            .then(() => {
                document.getElementById("successMessage").classList.remove("hidden");
                form.reset();
            })
            .catch(() => alert("خطأ أثناء الإرسال"));
    });
}

// =================== تحميل الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
