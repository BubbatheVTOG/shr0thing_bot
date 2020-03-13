pipeline {

  agent any

  stages {
    
    stage('Stage 1: Echo Build Env') {
      steps {
        sh '''
        echo "NODE VERSION:"
        docker run --rm -e CI=true -w /home/node/app -v $PWD:/home/node/app node:erbium node --version
        echo "NPM VERSION:"
        docker run --rm -e CI=true -w /home/node/app -v $PWD:/home/node/app node:erbium npm --version
        '''
      }
    }

    stage ('Stage 2: Build and Publish Docker Image'){
      stages {
        stage ("When on Designated Branch") {
          when {
            anyOf{
              branch 'master'
            }
          }
          steps {
            script {
              docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                app = docker.build("znl2181/shr0thing_bot:"+env.BRANCH_NAME)
                app.push()
              }
            }
          }
        }
      }
    }
  }

  post {
    always {
        sh "sudo chmod -R 777 ."
        cleanWs()
    } 
  }
}
