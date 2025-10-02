pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'nodejs', type: 'NodeJS'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        APP_DIR = "${WORKSPACE}"
        SERVE_PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir(APP_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir(APP_DIR) {
                    // Unset CI to ignore warnings as errors
                    sh 'unset CI && npm run build'
                }
            }
        }

        stage('Serve on Port 3000') {
            steps {
                dir(APP_DIR) {
                    // Install serve globally if not installed
                    sh 'npm install -g serve'
                    // Serve build folder in background on port 3000
                    sh "nohup serve -s build -l ${SERVE_PORT} > serve.log 2>&1 &"
                }
            }
        }
    }

    post {
        success {
            echo "Build and deployment successful. App is running on port ${SERVE_PORT}"
        }
        failure {
            echo "Build or deployment failed!"
        }
    }
}
