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
        // stage('Run Tests') {
        //     steps {
        //         script {
        //             dir('./sanitynft') {
        //                 sh 'npm test'
        //             }
        //         }
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         dir('./sanitynft') {
        //            sh 'npm run build'

        //         }
                
                
        //     }
        // }
        
        // stage('Dev') {
        //     steps {
        //         dir('./sanitynft') {

        //         sh 'npm run dev'
        //     }
    


        // }
        // }
        stage('Dev') {
    steps {
        script {
            dir('./sanitynft') {
                // Run npm dev in the background
                sh 'npm run dev '

                // Wait for the server to start (adjust the sleep time accordingly)
                sleep time: 30, unit: 'SECONDS'

                // Open the URL using a headless browser or a command-line tool
                sh 'xvfb-run -a -s "-screen 0 1024x768x24" your-command-to-open-url http://localhost:3333/'
            }
        }
    }
}

        

        stage('Dev App') {
            steps {
                sh 'npm run dev'
            }

        }
    }
    
}




