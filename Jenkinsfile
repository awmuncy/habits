node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    def commitId = sh(returnStdout: true, script: 'git rev-parse HEAD')
    def commit = commitId.substring(0,9)

    stage('Build application') {

        app = docker.build("awmuncy/habits")

        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BRANCH_NAME}")
            app.push("${commit}")
            app.push("latest")
        }
    }

    stage ('Deploy') {

        // withCredentials([
        //     sshUserPrivateKey(credentialsId: 'my-jenkins-ssh', keyFileVariable: 'KEY_FILE', passphraseVariable: 'PASSPHRASE', usernameVariable: 'USER'),
        //     usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'HUB_USER', passwordVariable: 'HUB_PASSWORD')
        //     ]) {

            sh """${commit} on ${env.BRANCH_NAME}
            """
        // }
    }
}