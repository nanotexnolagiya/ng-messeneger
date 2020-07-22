const configs = {
  "development": {
    "host": "localhost",
    "port": "3030",
    "apiVersion": "v1",
    "publicPath": "public",
    "uploadsPath": "uploads",
    "mongoDbUri": "MONGO_SERVER_URL",
    "secret": "YOUR_SECRET_KEY",
    "smtp": {
      "host": "YOUR_SMTP_HOST",
      "port": 587, // 465, 587, 25
      "secure": false,
      "auth": {
        "user": "YOUR_SMTP_USERNAME",
        "pass": "YOUR_SMTP_USER_PASSWORD"
      }
    }
  },
  "production": {
    "host": "localhost",
    "port": "3000",
    "apiVersion": "v1",
    "mongoDbUri": "MONGO_SERVER_URL",
    "secret": "YOUR_SECRET_KEY",
    "smtp": {
      "host": "YOUR_SMTP_HOST",
      "port": 587, // 465, 587, 25
      "secure": false,
      "auth": {
        "user": "YOUR_SMTP_USERNAME",
        "pass": "YOUR_SMTP_USER_PASSWORD"
      }
    }
  }
}

export default configs[process.env.NODE_ENV ? process.env.NODE_ENV : 'development']
