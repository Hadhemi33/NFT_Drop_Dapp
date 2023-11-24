// // Jenkinsfile

// pipeline {
//     agent any

//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Hadhemi33/NFT_MarketPlace']]])
//             }
//         }

//         stage('Build and Package') {
//             steps {
//                 sh 'npm install'
//                 sh 'npm run build'
//                 sh 'docker build -t votre-image-docker .'
//             }
//         }

//         stage('Test') {
//             steps {
//                 sh 'npm test'
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
//                     sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
//                 }
//                 sh 'docker push votre-utilisateur/votre-image-docker:latest'
//                 sh 'docker-compose up -d'
//             }
//         }
//     }

//     post {
//         always {
//             sh 'docker-compose down'
//         }
//     }
// }




// Jenkinsfile

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/Hadhemi33/NFT_MarketPlace']]])
            }
        }

        stage('Build and Package') {
            steps {
                script {
                    // Assuming your project uses npm for building
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Your deployment steps here without Docker
                // For example, you might copy the build artifacts to a server or deploy to a cloud platform
            }
        }
    }

    post {
        always {
            // Your cleanup steps here
        }
    }
}
