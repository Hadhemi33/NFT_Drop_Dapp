// Jenkinsfile

pipeline {
    agent any
    tools {
        nodejs "nodePara" 
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
                    sh 'npm install'
                }
            }
        }

        stage('Install APP dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Dev') {
            steps {
                dir('./sanitynft') {

                sh 'npm run dev'
            }
    


        }
        }
        stage('Run Tests') {
            steps {
                script {
                    dir('./sanitynft') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Dev App') {
            steps {
                sh 'npm run dev'
            }

        }
        stage('Build') {
            steps {
                dir('./sanitynft') {
                   sh 'npm run build'

                }
                
                
            }
        }
        

        
    }

    
}




