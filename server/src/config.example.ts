const configs = {
    "development": {
      "host": "localhost",
      "port": "3030",
      "apiVersion": "v1",
      "publicPath": "public",
      "uploadsPath": "uploads",
      "mongoDbUri": "YOUR_MONGO_URL",
      "secret": "YOUR_SECRET_KEY",
      "smtp": {
        "host": "SMTP_HOST",
        "port": 587, // 465, 587, 25
        "secure": false,
        "auth": {
          "user": "YOUR_USER_NAME",
          "pass": "YOUR_PASSWORD"
        }
      }
    },
    "production": {
      "host": "localhost",
      "port": "3000",
      "apiVersion": "v1",
      "mongoDbUri": "YOUR_MONGO_URL",
      "secret": "YOUR_SECRET_KEY",
      "smtp": {
        "host": "SMTP_HOST",
        "port": 587, // 465, 587, 25
        "secure": false,
        "auth": {
          "user": "YOUR_USER_NAME",
          "pass": "YOUR_PASSWORD"
        }
      }
    }
  }
  
  export default configs[process.env.NODE_ENV ? process.env.NODE_ENV : 'development']
  