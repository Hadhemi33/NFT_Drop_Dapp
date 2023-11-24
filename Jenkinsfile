pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/jenko']], userRemoteConfigs: [[url: 'https://github.com/Hadhemi33/NFT_MarketPlace.git']]])
            }
        }
        stage('Installation') {
            steps {
                sh 'npm install'
            }
        }


        // stage('Build and Package') {
        //     steps {
        //         script {
                    
        //             sh 'npm run build'
        //             sh 'docker build -t votre-utilisateur/votre-image-docker .'
        //         }
        //     }
        // }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    }
                    sh 'docker push votre-utilisateur/votre-image-docker:latest'
                    // Ajoutez les étapes de déploiement spécifiques à votre infrastructure
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker-compose down'
            }
        }
    }
}
