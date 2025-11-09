// function for checking if inputs are empty 
function isEmpty(ie) {
    return ie.value.trim() === "";
}

function isValidName(ie) {
    // allows letters and spaces only
    const regEx = /^[A-Za-z\s]+$/;
    return regEx.test(ie.value.trim());
}

function isValidEmail(ie) {
    // simple email check
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(ie.value.trim());
}

function showError(ie, show) {
    const icon = ie.parentElement.querySelector(".errorIcon");
    if (show) {
        ie.classList.add("error");
        if (icon) icon.style.display = "block";
    } else {
        ie.classList.remove("error");
        if (icon) icon.style.display = "none";
    }
}