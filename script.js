// =================== إخفاء جميع النماذج ===================
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("inquiry-form").classList.add("hidden");
    document.getElementById("application-form-container")?.classList.add("hidden");
}

// تمرير إلى عنصر معين
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
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
            <div class="form-group"><label>البريد الإلكتروني</label><input type="email" name="email" required></div>
            <div class="form-group"><label>رقم الجوال</label><input type="text" name="phone" required></div>
            <div class="form-group"><label>البرنامج الدراسي المطلوب</label><input type="text" name="program" required></div>
            <div class="form-group"><label>التخصص المطلوب</label><input type="text" name="major" required></div>
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

    // إرسال البيانات على البريد ورفع الملفات للدرايف
    const applicationForm = document.getElementById("applicationForm");
    applicationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(applicationForm);

        fetch("https://script.google.com/macros/s/AKfycbztcGi1ZecXiI7avhz6MbugwOhf-92VUnunG3PsqgtTzrCRCYXUdEqJY2Csy2rChk-I/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("successMessage").classList.remove("hidden");
            applicationForm.reset();
        })
        .catch(error => alert("حدث خطأ أثناء إرسال البيانات: " + error));
    });
}

// =================== رفع إيصال السداد ===================
function showPaymentInvoice(studentName) {
    hideAllForms();
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = `
        <div class="result-card">
            <h3>رفع إيصال السداد</h3>
            <input type="file" id="receipt-upload" accept=".pdf,.jpg,.png">
            <p id="file-name" style="font-size:14px;"></p>
            <button class="submit-btn" onclick="submitPayment('${studentName}')">إرسال إيصال السداد</button>
        </div>
    `;
    resultsSection.classList.remove("hidden");
}

function submitPayment(studentName) {
    const fileInput = document.getElementById("receipt-upload");
    if (!fileInput.files[0]) {
        alert("يرجى رفع إيصال السداد أولاً");
        return;
    }
    const url = "https://script.google.com/macros/s/AKfycbztcGi1ZecXiI7avhz6MbugwOhf-92VUnunG3PsqgtTzrCRCYXUdEqJY2Csy2rChk-I/exec";
    const formData = new FormData();
    formData.append("receipt", fileInput.files[0]);
    formData.append("studentName", studentName);

    fetch(url, { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => alert("تم إرسال إيصال السداد بنجاح!"))
        .catch(error => console.error("خطأ في الإرسال:", error));
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
