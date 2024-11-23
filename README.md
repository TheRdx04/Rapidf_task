## MediaToolAttachment
A simple web application to upload a .docx file, convert it into a PDF, and optionally apply password protection. Built using React with Next.js (for SSR) and TailwindCSS for styling.

# Features
File Upload: Upload .docx files up to 10MB.
PDF Conversion: Convert .docx files to PDF format.
Password Protection: Optionally set a password for the converted PDF.
Client-Side Handling: Uses React state management and hooks for interactive UI.
Error Handling: Displays relevant error messages for user feedback.
Screenshots

![image](https://github.com/user-attachments/assets/8b5a6431-ca33-40ef-8a0e-ca3c967b3b85)


# Technologies Used
React - For building the frontend UI.
Next.js - For server-side rendering (SSR) and API routes.
TailwindCSS - For utility-first styling.
Lucide Icons - For SVG icons.
Fetch API - For making API requests to a backend server for file conversion.
# Installation
1. Clone the repository:
bash
Copy code
git clone https://github.com/TheRdx04/Rapidf_task.git
2. Navigate to the project directory:
cd Rapidf_task
3. Install dependencies:
npm install
4. Run the development server:
npm run dev
Your app should now be running at http://localhost:3000.

# Backend Setup
The project assumes a backend server is running on http://localhost:5000 to handle the conversion of .docx files to PDFs. Make sure to set up the server with an endpoint that accepts POST requests at /docxtopdf and responds with the converted file and metadata.


# Usage
Upload a .docx file: Click or drag and drop a .docx file into the designated area.
Enable Password Protection (optional): Toggle the switch and set a password for the converted PDF.
Convert the file: Click the "Convert to PDF" button.
Download the PDF: Once the conversion is complete, you’ll be able to download the PDF file by clicking the "Download PDF" button.

License
This project is licensed under the MIT License - see the LICENSE file for details.
