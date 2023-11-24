// Jenkinsfile

pipeline {
    agent any
    tools {
        nodejs "nodePara" // Specify the name of the NodeJS installation
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Hadhemi33/NFT_MarketPlace']]])
            }
        }
        stage('Install Sanity dependencies') {
            steps {
                dir('./sanitynft') {
                   // Navigate to the subdirectory
                    sh 'npm install'
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
                // sh 'npm run build'
                // sh 'docker build -t votre-image-docker .'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                }
                sh 'docker push votre-utilisateur/votre-image-docker:latest'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker-compose down'
        }
    }
}




