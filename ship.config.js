const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')
const { Octokit } = require('@octokit/rest')
const { loadConfig, getRepoInfo } = require('shipjs-lib')

dotenv.config({ path: path.resolve('.', '.env') })

const { remote } = loadConfig('.')
const { owner, name: repo } = getRepoInfo(remote, '.')

const getOctokit = () => {
  const octokit = new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`,
  })

  return octokit
}

const isDryRun = argv => {
  return argv.includes('--dry-run')
}

module.exports = {
  mergeStrategy: { toSameBranch: ['master'] },
  updateChangelog: false,
  publishCommand: ({ tag }) => `echo Start publish ${tag}`,
  afterPublish: async () => {
    const octokit = getOctokit()
    const { data } = await octokit.repos.listReleases({ owner, repo })
    const drafts = data.filter(d => d.draft === true && d.name.startsWith('v'))
    if (drafts.length) {
      fs.writeFileSync(
        path.resolve('.', `changelog.json`),
        JSON.stringify(drafts[0])
      )
    } else {
      // eslint-disable-next-line no-console
      console.log(`> Draft not found.`)
    }
  },
  releases: {
    extractChangelog: ({ version }) => {
      try {
        const dryRun = isDryRun(process.argv)
        const changelogFilePath = path.resolve('.', 'changelog.json')
        if (fs.existsSync(changelogFilePath)) {
          const changelog = JSON.parse(fs.readFileSync(changelogFilePath))
          if (!dryRun) {
            // Delete temp changelog
            fs.unlink(changelogFilePath, err => {
              if (err) {
                // eslint-disable-next-line no-console
                console.log(err)
              }
            })
          }

          // Replact version no to tag name
          const body = changelog['body'].replace(
            `...${version}`,
            `...v${version}`
          )
          if (!dryRun && changelog['draft']) {
            const octokit = getOctokit()
            octokit.repos
              .deleteRelease({
                owner,
                repo,
                release_id: changelog['id'],
              })
              .then(() => {
                // eslint-disable-next-line no-console
                console.log(`> Delete draft suceed.`)
              })
              .catch(() => {
                // eslint-disable-next-line no-console
                console.log(`> Delete draft failed.`)
              })
          }

          return body
        }
        // eslint-disable-next-line no-console
        console.log(`> ${changelogFilePath} not found.`)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`> Exception raised.`)
        // eslint-disable-next-line no-console
        console.log(e.toString())
      }
      return `Add CHANGELOG manually.\nCopy from draft ${version}'s release note`
    },
  },
}
