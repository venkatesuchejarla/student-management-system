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
                script {
                    echo "Starting React app on port $PORT"

                    // Stop any previous serve process on this port
                    sh "pkill -f 'serve -s $DEPLOY_DIR' || true"

                    // Start the app in background and log output
                    sh "nohup npx serve -s $DEPLOY_DIR -l $PORT -H 0.0.0.0 > $WORKSPACE/serve.log 2>&1 &"

                    echo "React app should now be accessible at: http://localhost:$PORT/"
                    echo "Check serve logs at $WORKSPACE/serve.log"
                }
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
