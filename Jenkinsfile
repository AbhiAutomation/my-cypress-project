pipeline {
   agent { docker { image 'node:24' } }
  
    stages {
        stage('Install') { steps { sh 'node --version; npm ci' } }
  }
        stage('Cypress Parallel Tests Suite') {
            parallel {
                stage('Slave Node1') {
                    agent { label 'remote_node1' }
                    steps {
                        git url: 'https://github.com/AbhiAutomation/my-cypress-project.git'
                        bat 'npm install'
                        bat 'npm update'
                        bat 'npm run recordDashboard'
                    }
                }

                stage('Slave Node2') {
                    agent { label 'remote_node2' }
                    steps {
                        git url: 'https://github.com/AbhiAutomation/my-cypress-project.git'
                        bat 'npm install'
                        bat 'npm update'
                        bat 'npm run recordDashboard'
                    }
                }
            }
        }
    }
}