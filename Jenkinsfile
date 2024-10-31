pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
    }
    
    stages {
        
        stage('checkout') {
            steps {
                echo "Checkout git branch ${env.BRANCH_NAME}"
                checkout scm
                echo 'Checkout completed'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "Installing Dependencies"
                bat 'npm install'
                echo 'installed dependencies'
            }
        }
        
        stage('Running Unit Test Cases') {
            steps {
                echo 'Unit Test Case start'
                bat 'npm test'
                echo 'Unit Test Case Finished'
            }
        }
        stage('Build Android App') {
            steps {
                echo "Starting Building the APK"
                dir('android') { // Make sure to change to the directory where gradlew.bat is located
                    bat 'gradlew.bat assembleRelease'
                }
                echo "APK BUILD STAGE SUCCESS"
            }
        }

    }
    
    post {
        always {
            echo 'pipeline is completed'
        }
        success {
            echo 'build success'
        }
        failure {
            echo 'something went wrong'
        }
    }
}
