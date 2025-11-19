pipeline {
    agent any 

    tools {
        nodejs "Node"
    }

    stages {
            stage('Cypress Parallel Tests Suite ') {
            Parallel {
               stage( "Slave Node 1" ) {
                    agents { label 'remote_node1' 
                }
                    steps {
                       git Url: ''
                    }
                }
                 
               }
            }
        }
    }
}