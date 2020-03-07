node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    def commitId = sh(returnStdout: true, script: 'git rev-parse HEAD')
    def commit = commitId.substring(0,9)

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("awmuncy/habits")
    }


    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BRANCH_NAME}")
            app.push("${commit}")
            app.push("latest")
        }

    }

    stage ('Deploy') {

        withCredentials([
            sshUserPrivateKey(credentialsId: 'my-jenkins-ssh', keyFileVariable: 'KEY_FILE', passphraseVariable: 'PASSPHRASE', usernameVariable: 'USER'),
            usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'HUB_USER', passwordVariable: 'HUB_PASSWORD')
            ]) {

            sh """
                ssh -T -oStrictHostKeyChecking=no -i $KEY_FILE $USER@142.93.187.75 "make composed-service -e IMAGE=awmuncy/habits:${commit} -e TAG=${commit} -e BRANCH=${env.BRANCH_NAME} -e COMMIT='${commit}' -e HUB_USER=${HUB_USER} -e HUB_PASSWORD='${HUB_PASSWORD}'"
            """
        }
    }
}