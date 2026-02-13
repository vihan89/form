
const statesData = {
    india: [
        "Maharashtra",
        "Gujarat",
        "Karnataka",
        "Tamil Nadu",
        "Delhi",
        "Rajasthan",
        "Uttar Pradesh"
    ],
    usa: [
        "California",
        "Texas",
        "Florida",
        "New York",
        "Illinois"
    ]
};


function updateStates() {
    const country = document.getElementById("country").value;
    const stateSelect = document.getElementById("state");

    stateSelect.innerHTML = '<option value="">Select State</option>';

    if (country && statesData[country]) {
        statesData[country].forEach(state => {
            const option = document.createElement("option");
            option.value = state.toLowerCase().replace(/\s/g, "");
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    let isValid = true;

    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const state = document.getElementById("state").value;
    const pincode = document.getElementById("pincode").value.trim();
    const terms = document.getElementById("terms").checked;

    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passPattern.test(password)) {
        document.getElementById("passwordError").textContent =
            "Password must be 8+ chars with uppercase, lowercase & special char";
        isValid = false;
    }


if (phone.length < 10) {
    document.getElementById("phoneError").textContent =
        "Mobile number must be exactly 10 digits (too short)";
    isValid = false;
} 
else if (phone.length > 10) {
    document.getElementById("phoneError").textContent =
        "Mobile number must be exactly 10 digits (too long)";
    isValid = false;
} 
else if (!/^[6-9]/.test(phone)) {
    document.getElementById("phoneError").textContent =
        "Mobile number must start with digit between 6 and 9";
    isValid = false;
} 
else if (!/^\d{10}$/.test(phone)) {
    document.getElementById("phoneError").textContent =
        "Mobile number must contain only digits";
    isValid = false;
}



    if (dob === "") {
        document.getElementById("dobError").textContent = "Date of Birth required";
        isValid = false;
    } else {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

        if (age < 18 || age > 60) {
            document.getElementById("dobError").textContent =
                "Age must be between 18 and 60";
            isValid = false;
        }
    }

    if (state === "") {
        document.getElementById("stateError").textContent = "Select state";
        isValid = false;
    }


    if (!/^\d{6}$/.test(pincode)) {
        document.getElementById("pincodeError").textContent =
            "Enter valid 6-digit pincode";
        isValid = false;
    }


    if (!terms) {
        document.getElementById("termsError").textContent =
            "You must agree to terms";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById("regForm").reset();
        document.getElementById("state").innerHTML =
            '<option value="">Select State</option>';
    }

    return false;
}
