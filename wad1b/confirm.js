function addRow(container, label, value) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value));
    container.appendChild(p);
}

function renderDetails() {
    const raw = sessionStorage.getItem("formData");
    if (!raw) {
        window.location.href = "index.html";
        return;
    }
    const data = JSON.parse(raw);
    const details = document.getElementById("details");
    details.innerHTML = "";

    addRow(details, "Name", data.name || "-");
    addRow(details, "Email", data.email || "-");
    const maskedPassword = data.password ? "*".repeat(data.password.length) : "-";
    addRow(details, "Password", maskedPassword);
    addRow(details, "Phone", data.phone || "-");
    addRow(details, "Date of Birth", data.dob || "-");
    addRow(details, "Address", data.address || "-");
    addRow(details, "Gender", data.gender || "-");
    addRow(details, "Country", data.country || "-");
    addRow(details, "State", data.state || "-");
    addRow(details, "Pin Code", data.pincode || "-");
    addRow(details, "Photo", data.photo || "Not provided");
    addRow(details, "Terms Accepted", data.terms ? "Yes" : "No");

    document.getElementById("confirmBtn").onclick = () => {
        submitData(data);
    };
    document.getElementById("editBtn").onclick = () => {
        window.location.href = "index.html";
    };
}

window.onload = renderDetails;

async function submitData(payload) {
    const status = document.getElementById("status");
    status.textContent = "";
    try {
        status.textContent = "Submitting...";
        const res = await fetch("https://example.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Request failed");
        status.textContent = "Submitted successfully!";
        sessionStorage.removeItem("formData");
    } catch (err) {
        status.textContent = "Submission failed. Please try again.";
    }
}
