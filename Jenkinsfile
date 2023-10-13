pipeline {
    agent any

    environment {
        MAJOR = "1"
        MINOR = "0"
        // PATCH = "0"
        PATCH = "${env.BUILD_NUMBER}" 
         
        REGISTRY_URL = "https://registry.sdlc.lacak.io"
        REGISTRY_CRED = "registry-cred"
        PROJECT_NAME = "smart-prison-sapn-frontend"
        IMAGE_NAME = "smart-prison-sapn-frontend-image"

        ACCESS_TOKEN = credentials('kubemanifest-token')
        KUBE_REPO_URL = "https://github.com/Virtue-Digital-Indonesia/k8s-manifest.git"
        KUBE_BRANCH_NAME = "feature-new-${env.PROJECT_NAME}-image"
        KUBE_REPO_CRED = "kubemanifest-cred"
    } 
 
    stages {
        stage('Building Image') {
            steps {
                script {
                    env.IMAGE_VERSION = "${env.MAJOR}.${env.MINOR}.${env.PATCH}"
                    docker.withRegistry("${env.REGISTRY_URL}", "${env.REGISTRY_CRED}") {
                        def customImage = docker.build("${env.IMAGE_NAME}")
                        customImage.push("${env.IMAGE_VERSION}")
                    }
                }
            }
        }

        stage('Clone Kubernetes Manifest') {
            steps {
                script { 
                    echo 'Cloning repository'
                    deleteDir()
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: 'master']],
                        userRemoteConfigs: [[
                            url: "${env.KUBE_REPO_URL}",
                            credentialsId: "${env.KUBE_REPO_CRED}"
                        ]]
                    ])

                    echo 'Checkout branch'
                    sh "git checkout -b ${env.KUBE_BRANCH_NAME}"
                    // withCredentials([gitUsernamePassword(credentialsId: "${env.KUBE_REPO_CRED}", gitToolName: 'git-tool')]) {
                    //     sh "git pull origin master"
                    // }

                    echo 'Change image version'
                    env.IMAGE_VERSION = "${env.MAJOR}.${env.MINOR}.${env.PATCH}"
                    sh "sed -i \"s#${env.IMAGE_NAME}:.*#${env.IMAGE_NAME}:${env.IMAGE_VERSION}#\" ${env.PROJECT_NAME}/deployment.yaml"
                    sh "cat ${env.PROJECT_NAME}/deployment.yaml"

                    echo 'Commit & Push'
                    withCredentials([gitUsernamePassword(credentialsId: "${env.KUBE_REPO_CRED}", gitToolName: 'git-tool')]) {
                        sh 'git config --global user.name jenkins'
                        sh 'git config --global user.email jenkins@valid.com'
                        sh 'git add .'
                        sh "git commit -m \"Update image for ${env.IMAGE_VERSION}\""
                        sh "git remote -v"
                        sh "git push origin ${env.KUBE_BRANCH_NAME}"
                    }

                    echo 'Create Pull Request'
                    def responseCode = sh(script: """curl -w "%{http_code}" -L -X POST \\
                        -H "Accept: application/vnd.github+json" \\
                        -H "X-GitHub-Api-Version: 2022-11-28" \\
                        -H "Authorization: Bearer ${env.ACCESS_TOKEN}" \\
                        -d '{"title":"Change image version for ${env.PROJECT_NAME} to ${env.IMAGE_VERSION}","body":"Please check the image version !","head":"${env.KUBE_BRANCH_NAME}","base":"master"}' \\
                        https://api.github.com/repos/Virtue-Digital-Indonesia/k8s-manifest/pulls -o /dev/null""", returnStdout: true)
                        
                    if(responseCode == '201'){
                        echo 'PIPELINE SUCCESS'
                    } else {
                        error("Some error happens with ${responseCode} http reponse code.")
                    }
                }
            }
        }
    }
}
