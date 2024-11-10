



// Declare jsPDF to avoid TypeScript errors
declare var jsPDF: any;

// Define types for the form data
interface ResumeData {
    name: string;
    email: string;
    contact: string;
    address: string;
    education: string[];
    workExperience: string;
    skills: string;
}

// Function to generate resume HTML content
function generateResumeHTML(data: ResumeData): string {
    return `
        <div class="resume">
            <h1>${data.name}</h1>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Contact:</strong> ${data.contact}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            
            <h3>Education</h3>
            <ul>
                ${data.education.filter(edu => edu).map(edu => `<li>${edu}</li>`).join('')}
            </ul>
            
            <h3>Work Experience</h3>
            <p>${data.workExperience}</p>
            
            <h3>Skills</h3>
            <p>${data.skills}</p>
        </div>
    `;
}

// Function to download the resume as a PDF using jsPDF
function downloadPDF(data: ResumeData): void {
    const doc = new jsPDF();
    doc.setFont("times");
    doc.setFontSize(12);
    format:'a4';
    unit:'pt'
    doc.text("Resume", 10, 10);
    doc.text("Name: " + data.name, 10, 20);
    doc.text("Email: " + data.email, 10, 30);
    doc.text("Contact: " + data.contact, 10, 40);
    doc.text("Address: " + data.address, 10, 50);

    doc.text("Education:", 10, 60);
    data.education.forEach((edu, index) => {
        doc.text(edu, 10, 70 + index * 10);
    });

    doc.text("Work Experience:", 10, 90);
    doc.text(data.workExperience, 10, 100);

    doc.text("Skills:", 10, 120);
    doc.text(data.skills, 10, 130);

    doc.save(data.name.toLowerCase().replace(/\s+/g, '_') + '-resume.pdf');
}

// Function to handle form submission
document.getElementById('resume-form')!.addEventListener('submit', function (event: Event) {
    event.preventDefault(); // Prevent form submission

    // Collect the data from the form
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;

    // Collect education entries
    const education = [
        (document.getElementById('education1') as HTMLInputElement).value,
        (document.getElementById('education2') as HTMLInputElement).value,
        (document.getElementById('education3') as HTMLInputElement).value,
        (document.getElementById('education4') as HTMLInputElement).value,
    ].filter(e => e); // Filter out empty entries

    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    // Create the resume data object
    const resumeData: ResumeData = { name, email, contact, address, education, workExperience, skills };

    // Generate and display resume HTML
    const resumeHTML = generateResumeHTML(resumeData);
    document.getElementById('resume-output')!.innerHTML = resumeHTML;

    // Show the share and download buttons
     document.getElementById('share-download-buttons')!.style.display = 'block';

    
    // Generate a unique URL for sharing
    const resumeLink = `${window.location.origin}/resume/${name.toLowerCase().replace(/\s+/g, '_')}`;

    // Set up share link button
    document.getElementById('share-link-btn')!.addEventListener('click', () => {
        navigator.clipboard.writeText(resumeLink).then(() => {
            alert('Resume link copied to clipboard!');
        });
    });

    // Set up PDF download button
     document.getElementById('download-pdf-btn')!.addEventListener('click', () => {
      window.print()
        downloadPDF(resumeData);
    }); });