const configs = {
  "development": {
    "host": "localhost",
    "port": "3030",
    "apiVersion": "v1",
    "mongoDbUri": "mongodb://localhost:27017/dbName",
    "secret": "THE_SECRET_KEY"
  },
  "production": {
    "host": "localhost",
    "port": "3030",
    "apiVersion": "v1",
    "mongoDbUri": "mongodb://localhost:27017/dbName",
    "secret": "THE_SECRET_KEY"
  }
}
export default configs[process.env.NODE_ENV ? process.env.NODE_ENV : 'development']
