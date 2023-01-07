module.exports = {
  reactStrictMode: true,
  //elimando ruta por defecto
  async redirects() {
    return [
      {
        source: '/',
        destination: '/platos',
        permanent: true
      }
    ]
  }
}
