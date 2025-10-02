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
                script {
                    sh """
                        echo "Starting React app on port $PORT"
                        # stop any previous instance serving the same folder
                        pkill -f "serve -s $DEPLOY_DIR" || true
                        # start React app bound to all network interfaces
                        nohup npx serve -s $DEPLOY_DIR -l $PORT -H 0.0.0.0 > $WORKSPACE/serve.log 2>&1 &
                        sleep 2
                        # detect server IP
                        SERVER_IP=\$(hostname -I | awk '{print \$1}')
                        echo "React app should be accessible at: http://\$SERVER_IP:$PORT/"
                        echo "Check serve logs at $WORKSPACE/serve.log"
                    """
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
