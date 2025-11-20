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

              // cross-platform commands: use sh on Unix, bat on Windows
              script {
                if (isUnix()) {
                  sh 'node --version || true'
                  sh 'npm --version || true'
                  sh 'npm ci'
                  sh 'npm test'
                } else {
                  bat 'node --version || echo node-not-found'
                  bat 'npm --version || echo npm-not-found'
                  bat 'npm ci'
                  bat 'npm test'
                }
              }
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

              script {
                if (isUnix()) {
                  sh 'node --version || true'
                  sh 'npm --version || true'
                  sh 'npm ci'
                  sh 'npm test'
                } else {
                  bat 'node --version || echo node-not-found'
                  bat 'npm --version || echo npm-not-found'
                  bat 'npm ci'
                  bat 'npm test'
                }
              }
            }
          }
        }
      }
    }
  }

  post {
    always {
      // collect logs/artifacts if present (adjust path as needed)
      archiveArtifacts artifacts: 'cypress/results/**', allowEmptyArchive: true
      junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'
    }
  }
}
