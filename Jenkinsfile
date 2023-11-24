// Jenkinsfile

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/jenko']], userRemoteConfigs: [[url: 'https://github.com/Hadhemi33/NFT_MarketPlace.git']]])
            }
        }

        stage('Build and Package') {
            steps {
                sh 'npm install'
                sh 'npm run dev'
                // sh 'docker build -t votre-image-docker .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    //    stages {
    //     stage('Install dependencies ') {
    //         steps {
    //             sh 'npm install'
    //         }
    //     }
    //     stage('Tests') {
    //         steps {
    //             sh 'npm test'
    //         }
    //     }

        // stage('Deploy') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
        //             sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
        //         }
        //         sh 'docker push votre-utilisateur/votre-image-docker:latest'
        //         sh 'docker-compose up -d'
        //     }
        // }
    }

    // post {
    //     always {
    //         sh 'docker-compose down'
    //     }
    // }
}
