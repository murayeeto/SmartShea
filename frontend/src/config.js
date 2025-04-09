const config = {
  development: {
    apiUrl: 'http://localhost:8000'
  },
  production: {
    apiUrl: 'https://smartshea-backend.onrender.com'
  }
};

const environment = process.env.NODE_ENV || 'development';
export const apiUrl = config[environment].apiUrl;