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
                    sh'rm -rf node_modules'
                    sh 'npm install --force'
                }
            }
        }
        stage('Dev') {
            steps {
                
                dir('./sanitynft') {

                sh 'npm run dev'
            }
        }
        }
         

        

       
    }
    
}




