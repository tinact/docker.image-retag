import * as core from '@actions/core'
import * as cp from 'child_process'

async function run(): Promise<void> {
  try {
    const imageName: string = core.getInput('image_name', {required: true})
    const imageOldTag: string = core.getInput('image_old_tag')
    const imageNewTag: string = core.getInput('image_new_tag') || 'latest'
    const registry: string =
      core.getInput('registry') || 'registry.hub.docker.com'
    const registryUsername: string = core.getInput('registry_username', {
      required: true
    })
    const registryPassword: string = core.getInput('registry_password', {
      required: true
    })

    const repositoryOld = `${registry}/${imageName}:${imageOldTag}`

    const repositoryNew = `${registry}/${imageName}:${imageNewTag}`

    login(registry, registryUsername, registryPassword)
      .then(() =>
        core.info(`Successfully Logging into Docker registry ${registry}.`)
      )
      .catch(err => core.setFailed(err.message))

    pull(repositoryOld, registry)
      .then(() =>
        core.info(`Successfully Pulling docker image from ${registry}.`)
      )
      .catch(err => core.setFailed(err.message))

    retag(repositoryOld, repositoryNew)
      .then(() => core.info(`Successfully retag docker image.`))
      .catch(err => core.setFailed(err.message))

    push(repositoryNew, registry)
      .then(() =>
        core.info(`Successfully Pushing docker image to ${registry}.`)
      )
      .catch(err => core.setFailed(err.message))
  } catch (error) {
    core.setFailed(error.message)
  }
}

const login = async (
  registry: string,
  registryUsername: string,
  registryPassword: string
): Promise<void> => {
  core.info(`Logging into Docker registry ${registry}.`)
  cp.execSync(
    `docker login -u ${registryUsername} --password-stdin ${registry} >/dev/null 2>&1`,
    {
      input: registryPassword
    }
  )
}

const pull = async (repositoryOld: string, registry: string): Promise<void> => {
  core.info(`Pulling docker image to ${registry}`)
  cp.execSync(`docker pull ${repositoryOld} >/dev/null 2>&1`)
}

const push = async (repositoryNew: string, registry: string): Promise<void> => {
  core.info(`Pushing docker image to ${registry}`)
  cp.execSync(`docker push ${repositoryNew} >/dev/null 2>&1`)
}

const retag = async (
  repositoryOld: string,
  repositoryNew: string
): Promise<void> => {
  core.info(`Retag Image`)
  cp.execSync(`docker tag ${repositoryOld} ${repositoryNew} >/dev/null 2>&1`)
}

run()
