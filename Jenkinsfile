pipeline {
    agent any

    def getCurrentBranch () {
        return sh (
            script: 'git rev-parse --abbrev-ref HEAD',
            returnStdout: true
        ).trim()
    }

    def branchName = getCurrentBranch()
    echo 'BRANCH.. ' + branchName
    stages {
        stage('checkout') {
            steps {
                echo "Checkout git branch ${env.BRANCH_NAME}"
                git branch: 'main', url: 'https://github.com/Mohancherukuri/Guessgame.git'
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
