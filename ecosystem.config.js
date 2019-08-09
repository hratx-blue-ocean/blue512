module.exports = {
    apps: [{
      name: 'Blue512',
      script: './server/server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-52-15-83-226.us-east-2.compute.amazonaws.com',
        key: '~/ssh/blue512.pem',
        ref: 'origin/development',
        repo: 'git@github.com:hratx-blue-ocean/blue512.git',
        path: '~/blueOcean', 
        'post-deploy': 'cd server && npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }