const { Wechaty } = require('wechaty')

function onScan (qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    generate(qrcode, { small: true })  // show qrcode on console

    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')

    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

function onLogin (user) {
  log.info('StarterBot', '%s login', user)
}

function onLogout (user) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg) {
  log.info('StarterBot', msg.toString())

  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
  if(msg.text() === '血压检测') {
    await msg.say('WARNING')
  }
}

async function main() {
  const bot = new Wechaty()
  bot
    .on('scan', onScan)
    .on('login', onLogin)
    .on('logout', onLogout)
    .on('message', onMessage)

  await bot.start()
}

main()
  .catch(console.error)
