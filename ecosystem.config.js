module.exports = {
  apps: [
    {
      name: "express-mongo",
      script: "./server.js",
      env_production: { NODE_ENV: "production" },
    },
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "18.217.35.253",
      ref: "origin/master",
      repo: "https://github.com/ITIfeanyi/deploy-express-mongo.git",
      path: "/home/ubuntu/deploy",
      "pre-setup": "pwd",
      "pre-deploy-local": "echo 'This is a local executed command'",
      "post-deploy":
        "cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};
