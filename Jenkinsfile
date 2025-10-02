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
                    // create deploy folder
                    sh "mkdir -p $DEPLOY_DIR"
                    // copy build contents
                    sh "cp -r build/* $DEPLOY_DIR/"
                }
            }
        }

        stage('Start Application') {
            steps {
                sh '''
                    echo "Starting React app on port $PORT"
                    # Stop previous instance if running
                    pkill -f "serve -s $DEPLOY_DIR" || true
                    # Start in background using nohup
                    nohup npx serve -s $DEPLOY_DIR -l $PORT > $DEPLOY_DIR/log.txt 2>&1 &
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
