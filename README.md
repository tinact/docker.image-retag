# Action: Docker image retag

Retags a given Docker Image and pushs the new tag to the given registry.

## Inputs

### image_name

**Required** Name of Image

The name of the image you would like to retag.

### image_old_tag

**Required** Tag of Image

The old tag of the image you would like to retag.

### image_new_tag

**Default**: `latest`

The new tag of the image you would like to retag

### registry

**Default** `registry.hub.docker.com` Registry host.

URL of a Docker compatible registry for pull and pushing a Docker image.

### registry_username

**Required** Registry Username

### registry_password

**Required** Registry Password

Registry Password. This should be stored in a Secret on Github.

See [https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables).

## Example Usage

```yaml
- name: Search latest semver Image
  uses: tinact/docker.image-retag@master
  with:
    image_name: test
    image_old_tag: do_not_use
    image_new_tag: retag
    registry: docker.pkg.github.com/tinact/docker.image
    registry_username: sbaerlocher
    registry_password: ${{ secrets.GITHUB_TOKEN }}
```

## Sponsor

- [ITIGO AG](https://itigo.ch)

## License

This project is under the MIT License. See the [LICENSE](licence) file for the full license text.

## Copyright

(c) 2020, Tinact
