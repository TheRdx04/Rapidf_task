#Media Tool

Media Tool is a comprehensive solution designed to convert DOCX files to PDF format, with an additional feature that allows users to encrypt the resulting PDF files for enhanced security. The project is accessible at https://rapidf-task.vercel.app/.

Features

DOCX to PDF Conversion: Efficiently converts Microsoft Word documents (.docx) into PDF format.

PDF Encryption: Provides users with the option to encrypt PDF files, ensuring document confidentiality and protection.

User-Friendly Interface: Intuitive design for seamless user experience.

Scalable Deployment: Supports containerization and orchestration for scalable and reliable deployment.


Technologies Used

Languages:

TypeScript

JavaScript

CSS

Docker

Kubernetes


Frameworks:

React for frontend development.

Node.js with Express for backend services.


Deployment:

Docker for containerization.

Kubernetes manifests for orchestration.

Vercel for hosting the frontend application.



Getting Started

Prerequisites

Node.js and npm installed.

Docker installed for containerization.

Kubernetes cluster set up for orchestration (optional).


Installation

1. Clone the Repository:

git clone https://github.com/TheRdx04/Media Tool.git


2. Navigate to the Project Directory:

cd Rapidf_task


3. Install Dependencies:

npm install



Running the Application

Development Mode:

npm run dev

Production Mode:

npm run build
npm start


Docker Deployment

1. Build the Docker Image:

docker build -t Media Tool .


2. Run the Docker Container:

docker run -p 3000:3000 Media Tool



Kubernetes Deployment

1. Apply Kubernetes Manifests:

kubectl apply -f k8s/



Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Special thanks to all contributors and the open-source community for their invaluable support.


---

Note: For detailed information and updates, please refer to the official repository.
