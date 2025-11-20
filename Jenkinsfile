pipeline {
  // Use a dedicated builder node (replace label 'builder' if you don't have one).
  // If you don't have a builder label, set agent any and it will run on controller agent.
  agent { label 'builder' }

  stages {
    stage('Checkout & Install (builder)') {
      steps {
        // Checkout once
        checkout([$class: 'GitSCM',
          branches: [[name: 'refs/heads/main']],
          userRemoteConfigs: [[url: 'https://github.com/AbhiAutomation/my-cypress-project.git']]
        ])

        // Use npm ci if you have package-lock.json, otherwise npm install.
        script {
          if (fileExists('package-lock.json')) {
            if (isUnix()) {
              sh 'npm ci'
            } else {
              bat 'npm ci'
            }
          } else {
            echo 'No package-lock.json found -> running npm install (consider committing lockfile for deterministic installs)'
            if (isUnix()) {
              sh 'npm install'
            } else {
              bat 'npm install'
            }
          }
        }

        // Stash the workspace (you can narrow includes to reduce size)
        // This stashes node_modules + everything; change includes if you prefer smaller stash.
        stash name: 'workspace-stash', includes: '**/*', useDefaultExcludes: false
      }
    }

    stage('Parallel: Run tests on remotes') {
      steps {
        withCredentials([string(credentialsId: 'CYPRESS_RECORD_KEY', variable: 'CYPRESS_RECORD_KEY')]) {
          parallel {
            stage('Remote Node 1') {
              agent { label 'remote_1' }
              steps {
                ws("${WORKSPACE}_remote1") {
                  unstash 'workspace-stash'
                  script {
                    if (isUnix()) {
                      sh """
                        echo Running tests on remote_1
                        npx cypress run --record --key \$CYPRESS_RECORD_KEY --parallel --ci-build-id \$BUILD_NUMBER --group remote_1
                      """
                    } else {
                      bat """
                        echo Running tests on remote_1
                        npx cypress run --record --key %CYPRESS_RECORD_KEY% --parallel --ci-build-id %BUILD_NUMBER% --group remote_1
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
                        echo Running tests on remote_2
                        npx cypress run --record --key \$CYPRESS_RECORD_KEY --parallel --ci-build-id \$BUILD_NUMBER --group remote_2
                      """
                    } else {
                      bat """
                        echo Running tests on remote_2
                        npx cypress run --record --key %CYPRESS_RECORD_KEY% --parallel --ci-build-id %BUILD_NUMBER% --group remote_2
                      """
                    }
                  }
                }
              }
            }
          } // end parallel
        } // end withCredentials
      } // end steps
    } // end stage
  } // end stages

  post {
    always {
      archiveArtifacts artifacts: 'cypress/results/**', allowEmptyArchive: true
      junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'
    }
  }
}
