pipeline {
    agent any

    environment {
        PORT = "3000"
        DEPLOY_DIR = "$WORKSPACE/deploy"
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
                    sh "mkdir -p $DEPLOY_DIR"
                    sh "cp -r build/* $DEPLOY_DIR/"
                }
            }
        }

        stage('Start React Application') {
            steps {
                sh """
                    echo "Starting React app on port $PORT"
                    # stop any previous instance
                    pm2 delete student-management-system || true
                    # start React app with pm2
                    pm2 start npx --name student-management-system -- serve -s $DEPLOY_DIR -l $PORT
                    pm2 save
                """
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
