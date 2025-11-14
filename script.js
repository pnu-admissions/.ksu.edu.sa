// =================== عرض نموذج التقديم ===================
function hideAllForms() {
    document.getElementById("forms-section").classList.add("hidden");
    document.getElementById("application-form-container").classList.add("hidden");
}

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
}

// عرض نموذج التقديم
function showApplicationForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("application-form-container").classList.remove("hidden");
    scrollToElement("forms-section");

    const applicationForm = document.getElementById("applicationForm");
    const successMessage = document.getElementById("successMessage");

    // إزالة أي مستمع أحداث سابق
    applicationForm.replaceWith(applicationForm.cloneNode(true));
    const newForm = document.getElementById("applicationForm");

    newForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(newForm);

        fetch("https://script.google.com/macros/s/AKfycbxglQ_oGCF_ICL56X9dofD56F1mF89vIef6NrN7BObysCTEs5xQVfQ9wGc8N4aWwkG2/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            successMessage.classList.remove("hidden");
            newForm.reset();
        })
        .catch(error => alert("حدث خطأ أثناء إرسال البيانات: " + error));
    });
}

// =================== الاستعلام عن القبول ===================
function showInquiryForm() {
    hideAllForms();
    document.getElementById("forms-section").classList.remove("hidden");
    document.getElementById("inquiry-form").classList.remove("hidden");
    scrollToElement("forms-section");
}

document.addEventListener("DOMContentLoaded", () => {
    hideAllForms();
});
