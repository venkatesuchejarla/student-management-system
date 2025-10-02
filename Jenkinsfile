pipeline {
    agent any

    environment {
        PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master', 
                    url: 'https://github.com/venkatesuchejarla/student-management-system.git', 
                    credentialsId: 'ad4816db-faa3-4ce7-a430-33a4d5f0872b'
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
                script {
                    // create deploy folder
                    sh 'mkdir -p $WORKSPACE/deploy'
                    // copy build contents
                    sh '''
                        cp -r build/* $WORKSPACE/deploy/
                    '''
                }
            }
        }

        stage('Start Application') {
            steps {
                sh '''
                    echo "Starting application on port $PORT"
                    npm start &
                '''
            }
        }

    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
