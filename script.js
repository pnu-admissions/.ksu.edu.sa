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
            <div class="form-group"><label>نوع المؤهل الدراسي</label><input type="text" name="qualification" required></div>
            <div class="form-group"><label>سنة التخرج</label><input type="text" name="graduationYear" required></div>
            <div class="form-group"><label>المعدل</label><input type="text" name="gpa" required></div>
            <div class="form-group"><label>اسم المدرسة / الجامعة السابقة</label><input type="text" name="previousSchool" required></div>
            <div class="form-group"><label>تخصص المؤهل السابق</label><input type="text" name="previousMajor"></div>
            <div class="form-group"><label>صورة الهوية</label><input type="file" name="idFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
            <div class="form-group"><label>شهادة التخرج</label><input type="file" name="certificateFile" accept=".jpg,.jpeg,.png,.pdf" required></div>
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
            <div class="form-group"><label>الرغبة الأولى</label><input type="text" name="firstChoice" required></div>
            <div class="form-group"><label>الرغبة الثانية</label><input type="text" name="secondChoice"></div>
            <div class="form-group"><label>سبب اختيار البرنامج</label><input type="text" name="programReason" required></div>
            <button type="submit" class="submit-btn">إرسال الطلب</button>
        </form>
    `;
    formContainer.classList.remove("hidden");
    scrollToElement("forms-section");

    // إرسال البيانات على البريد ورفع الملفات للدرايف مع رسالة رسمية
    const applicationForm = document.getElementById("applicationForm");
    applicationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(applicationForm);
        const scriptURL = "https://script.google.com/macros/s/AKfycbznURoAH2jX4rQKUxFkUyBiEwmn7hAnlIkAfw3wNpxKRhai2cQZKcAY9el_UsWbPc1J/exec";

        fetch(scriptURL, { method: "POST", body: formData })
        .then(response => response.text())
        .then(data => {
            // إخفاء النموذج
            applicationForm.classList.add("hidden");

            // إنشاء وعرض رسالة رسمية
            let officialMessage = document.createElement("div");
            officialMessage.style.padding = "15px";
            officialMessage.style.background = "#d4edda";
            officialMessage.style.color = "#155724";
            officialMessage.style.borderRadius = "5px";
            officialMessage.style.marginTop = "10px";
            officialMessage.innerText = "تم استلام جميع بياناتك بنجاح. سيتم التواصل معك لإعطائك رقم القبول والموافقة عبر البريد الإلكتروني أو WhatsApp الخاص بك.";

            applicationForm.parentNode.appendChild(officialMessage);
            scrollToElement("forms-section");
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
    const url = "https://script.google.com/macros/s/AKfycbznURoAH2jX4rQKUxFkUyBiEwmn7hAnlIkAfw3wNpxKRhai2cQZKcAY9el_UsWbPc1J/exec";
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
