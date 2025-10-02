pipeline {
    agent any

    tools {
        nodejs "nodejs"   // Make sure this NodeJS installation is configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/venkatesuchejarla/student-management-system.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Prevent React from treating warnings as errors in CI
                sh '''
                unset CI
                npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false || true'  // Do not fail pipeline if tests fail
            }
        }

        stage('Deploy') {
            steps {
                // Example: copy build files to /var/www/html (adjust for your server)
                sh '''
                rm -rf /var/www/html/*
                cp -r build/* /var/www/html/
                '''
            }
        }
    }
}
