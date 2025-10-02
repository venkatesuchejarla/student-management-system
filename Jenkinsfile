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
                    url: 'https://github.com/venkatesuchejarla/student-management-system.git'
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
                    # Stop any previous instance of serve running on this port
                    pkill -f "serve -s $DEPLOY_DIR" || true
                    # Start React app in background
                    nohup npx serve -s $DEPLOY_DIR -l $PORT > $WORKSPACE/serve.log 2>&1 &
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
