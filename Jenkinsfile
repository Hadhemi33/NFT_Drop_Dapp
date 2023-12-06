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
                
                   
                    sh 'npm install --force'
                
            }
        }
        stage('Dev') {
            steps {

                sh 'npm run dev'
            }
        }
        }
         

        

       
    }
    
}




