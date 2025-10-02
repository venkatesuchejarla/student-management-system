pipeline {
    agent any

    tools {
        nodejs "nodejs"   // You must configure Node.js in Jenkins (Manage Jenkins → Global Tool Configuration)
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
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Deploy') {
            steps {
                // Example: move build files to /var/www/html if using nginx
                sh '''
                rm -rf /var/www/html/*
                cp -r build/* /var/www/html/
                '''
            }
        }
    }
}
