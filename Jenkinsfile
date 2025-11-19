pipeline {
  agent any
  stages {
    stage('Parallel') {
      parallel {
        stage('Slave Node1') {
          agent { label 'remote_1' }
          steps {
            ws("${WORKSPACE}_remote1") {
              checkout([$class: 'GitSCM',
                branches: [[name: 'refs/heads/main']],
                userRemoteConfigs: [[url: 'https://github.com/AbhiAutomation/my-cypress-project.git']]
              ])
              sh 'npm ci'
              sh 'npm test'
            }
          }
        }
        stage('Slave Node2') {
          agent { label 'remote_2' }
          steps {
            ws("${WORKSPACE}_remote2") {
              checkout([$class: 'GitSCM',
                branches: [[name: 'refs/heads/main']],
                userRemoteConfigs: [[url: 'https://github.com/AbhiAutomation/my-cypress-project.git']]
              ])
              sh 'npm ci'
              sh 'npm test'
            }
          }
        }
      }
    }
  }
}
