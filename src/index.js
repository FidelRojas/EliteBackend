import app from './app'
import '@babel/polyfill'

async function main() {
  await app.listen(process.env.PORT || 5000)
  console.log('Server listening')
}

main()
