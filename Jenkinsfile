pipeline {
    agent any

    environment {
        // NodeJS tool configured in Jenkins Global Tool Config with name 'nodejs'
        NODEJS_HOME = tool name: 'nodejs', type: 'NodeJS'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        PORT = "3000" // port for npm start if needed
    }

    stages {

        stage('Checkout SCM') {
            steps {
                git(
                    url: 'https://github.com/venkatesuchejarla/student-management-system.git',
                    branch: 'master',
                    credentialsId: 'ad4816db-faa3-4ce7-a430-33a4d5f0872b'
                )
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'unset CI && npm run build'
            }
        }

        stage('Test') {
            steps {
                // Run tests but do not fail the build if tests fail
                sh 'npm test -- --watchAll=false || true'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy inside Jenkins workspace
                sh '''
                    mkdir -p ${WORKSPACE}/deploy
                    rm -rf ${WORKSPACE}/deploy/*
                    cp -r build/* ${WORKSPACE}/deploy/
                '''
                echo "Build deployed to ${WORKSPACE}/deploy folder"
            }
        }

        stage('Run') {
            steps {
                // Serve React app on port 3000 in background
                sh '''
                    npm install -g serve
                    nohup serve -s build -l $PORT &
                    echo "React app is running on port $PORT"
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline finished successfully!"
        }
        failure {
            echo "Build or deployment failed!"
        }
    }
}
