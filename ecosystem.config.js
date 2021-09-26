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
      host: "",
      ref: "",
      repo: "",
      path: "",
      "pre-setup": "echo 'This is a pre-setup command",
      "pre-deploy-local": "echo 'Thiz is a local executed command'",
      "post-deploy":
        "cp ./.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};
