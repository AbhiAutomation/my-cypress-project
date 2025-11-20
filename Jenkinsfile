pipeline {
  agent none                      // use per-stage agents
  environment {
    // Secret text credential ID for Cypress record key (set this credential in Jenkins)
    CYPRESS_RECORD_KEY = credentials('CYPRESS_RECORD_KEY')
    CI_BUILD_ID = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout & Install (builder)') {
      agent { label 'builder' }   // change to 'any' if you don't have a builder label
      steps {
        // Checkout once and install dependencies
        checkout([$class: 'GitSCM',
          branches: [[name: 'refs/heads/main']],
          userRemoteConfigs: [[url: 'https://github.com/AbhiAutomation/my-cypress-project.git']]
        ])

        script {
          if (fileExists('package-lock.json')) {
            if (isUnix()) {
              sh 'npm ci'
            } else {
              bat 'npm ci'
            }
          } else {
            echo 'No package-lock.json found -> running npm install'
            if (isUnix()) {
              sh 'npm install'
            } else {
              bat 'npm install'
            }
          }
        }

        // stash code + node_modules for parallel runners (adjust includes to reduce size if needed)
        stash name: 'workspace-stash', includes: '**/*', useDefaultExcludes: false
      }
    }

    stage('Parallel: Run tests on remotes') {
      // parallel must be directly under a stage in Declarative
      parallel {
        stage('Remote Node 1') {
          agent { label 'remote_1' }
          steps {
            ws("${WORKSPACE}_remote1") {
              unstash 'workspace-stash'
              script {
                if (isUnix()) {
                  sh """
                    echo Running Cypress (remote_1)
                    npx cypress run --record --key \$CYPRESS_RECORD_KEY --parallel --ci-build-id \$CI_BUILD_ID --group remote_1
                  """
                } else {
                  bat """
                    echo Running Cypress (remote_1)
                    npx cypress run --record --key %CYPRESS_RECORD_KEY% --parallel --ci-build-id %CI_BUILD_ID% --group remote_1
                  """
                }
              }
            }
          }
        }

        stage('Remote Node 2') {
          agent { label 'remote_2' }
          steps {
            ws("${WORKSPACE}_remote2") {
              unstash 'workspace-stash'
              script {
                if (isUnix()) {
                  sh """
                    echo Running Cypress (remote_2)
                    npx cypress run --record --key \$CYPRESS_RECORD_KEY --parallel --ci-build-id \$CI_BUILD_ID --group remote_2
                  """
                } else {
                  bat """
                    echo Running Cypress (remote_2)
                    npx cypress run --record --key %CYPRESS_RECORD_KEY% --parallel --ci-build-id %CI_BUILD_ID% --group remote_2
                  """
                }
              }
            }
          }
        }
      } // end parallel
    } // end stage
  } // end stages

  post {
    always {
      archiveArtifacts artifacts: 'cypress/results/**', allowEmptyArchive: true
      junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'
    }
  }
}
