// Function to generate resume HTML content
function generateResumeHTML(data) {
    return "\n        <div class=\"resume\">\n            <h1>".concat(data.name, "</h1>\n            <p><strong>Email:</strong> ").concat(data.email, "</p>\n            <p><strong>Contact:</strong> ").concat(data.contact, "</p>\n            <p><strong>Address:</strong> ").concat(data.address, "</p>\n            \n            <h3>Education</h3>\n            <ul>\n                ").concat(data.education.filter(function (edu) { return edu; }).map(function (edu) { return "<li>".concat(edu, "</li>"); }).join(''), "\n            </ul>\n            \n            <h3>Work Experience</h3>\n            <p>").concat(data.workExperience, "</p>\n            \n            <h3>Skills</h3>\n            <p>").concat(data.skills, "</p>\n        </div>\n    ");
}
// Function to download the resume as a PDF using jsPDF
function downloadPDF(data) {
    var doc = new jsPDF();
    doc.setFont("times");
    doc.setFontSize(12);
    format: 'a4';
    unit: 'pt';
    doc.text("Resume", 10, 10);
    doc.text("Name: " + data.name, 10, 20);
    doc.text("Email: " + data.email, 10, 30);
    doc.text("Contact: " + data.contact, 10, 40);
    doc.text("Address: " + data.address, 10, 50);
    doc.text("Education:", 10, 60);
    data.education.forEach(function (edu, index) {
        doc.text(edu, 10, 70 + index * 10);
    });
    doc.text("Work Experience:", 10, 90);
    doc.text(data.workExperience, 10, 100);
    doc.text("Skills:", 10, 120);
    doc.text(data.skills, 10, 130);
    doc.save(data.name.toLowerCase().replace(/\s+/g, '_') + '-resume.pdf');
}
// Function to handle form submission
document.getElementById('resume-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    // Collect the data from the form
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var address = document.getElementById('address').value;
    // Collect education entries
    var education = [
        document.getElementById('education1').value,
        document.getElementById('education2').value,
        document.getElementById('education3').value,
        document.getElementById('education4').value,
    ].filter(function (e) { return e; }); // Filter out empty entries
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    // Create the resume data object
    var resumeData = { name: name, email: email, contact: contact, address: address, education: education, workExperience: workExperience, skills: skills };
    // Generate and display resume HTML
    var resumeHTML = generateResumeHTML(resumeData);
    document.getElementById('resume-output').innerHTML = resumeHTML;
    // Show the share and download buttons
    document.getElementById('share-download-buttons').style.display = 'block';
    // Generate a unique URL for sharing
    var resumeLink = "".concat(window.location.origin, "/resume/").concat(name.toLowerCase().replace(/\s+/g, '_'));
    // Set up share link button
    document.getElementById('share-link-btn').addEventListener('click', function () {
        navigator.clipboard.writeText(resumeLink).then(function () {
            alert('Resume link copied to clipboard!');
        });
    });
    // Set up PDF download button
    document.getElementById('download-pdf-btn').addEventListener('click', function () {
        window.print();
        downloadPDF(resumeData);
    });
});
