// =================== إخفاء جميع النماذج ===================
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("inquiry-form").classList.add("hidden");
    document.getElementById("application-form")?.classList.add("hidden");
}

// تمرير إلى عنصر معين
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// =================== نموذج تقديم طلب جديد ===================
function showApplicationForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");

    const formContainer = document.getElementById("application-form");
    formContainer.classList.remove("hidden");
    scrollToElement("forms-section");

    const applicationForm = document.getElementById("applicationForm");

    applicationForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData(applicationForm);

        // رابط Google Apps Script الجديد
        const scriptURL = "https://script.google.com/macros/s/AKfycbznURoAH2jX4rQKUxFkUyBiEwmn7hAnlIkAfw3wNpxKRhai2cQZKcAY9el_UsWbPc1J/exec";

        fetch(scriptURL, { method: "POST", body: formData })
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
    const formData = new FormData();
    formData.append("receipt", fileInput.files[0]);
    formData.append("studentName", studentName);

    const scriptURL = "https://script.google.com/macros/s/AKfycbznURoAH2jX4rQKUxFkUyBiEwmn7hAnlIkAfw3wNpxKRhai2cQZKcAY9el_UsWbPc1J/exec";

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.text())
        .then(data => alert("تم إرسال إيصال السداد بنجاح!"))
        .catch(error => console.error("خطأ في الإرسال:", error));
}

// =================== تهيئة الصفحة ===================
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
