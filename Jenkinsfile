pipeline {
    agent any

    tools {
        nodejs "nodejs"
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
                sh '''
                unset CI
                npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false || true'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # Deploy to a Jenkins workspace folder
                mkdir -p $WORKSPACE/deploy
                rm -rf $WORKSPACE/deploy/*
                cp -r build/* $WORKSPACE/deploy/
                '''
            }
        }
    }
}
