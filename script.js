// إخفاء جميع النماذج والنتائج
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("results-section").classList.add("hidden");
    document.getElementById("inquiry-form").classList.add("hidden");
    document.getElementById("application-form").classList.add("hidden");
}

// تمرير الصفحة لأي عنصر
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// إظهار نموذج الاستعلام
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("inquiry-form").classList.remove("hidden");
    scrollToElement("forms-section");
}

// إظهار نموذج التقديم
function showApplicationForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("application-form").classList.remove("hidden");
    scrollToElement("forms-section");
}

// إرسال نموذج التقديم
function submitApplication() {
    const form = document.getElementById("applicationForm");
    form.addEventListener('submit', function(e){
        e.preventDefault();

        document.getElementById("application-form").classList.add("hidden");
        document.getElementById("successMessage").classList.remove("hidden");

        // هنا يمكنك إرسال البيانات إلى Google Apps Script أو أي رابط
        const url = "https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec";
        const formData = new FormData(form);
        fetch(url, { method: 'POST', body: formData })
            .then(response => response.text())
            .then(data => console.log("تم الإرسال بنجاح:", data))
            .catch(error => console.error("خطأ في الإرسال:", error));
    });
}

// تفعيل الروابط الداخلية
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
});

// تهيئة الصفحة عند التحميل
document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
