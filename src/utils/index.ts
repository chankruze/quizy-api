/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 19:05:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as os from 'os'

export const getNetWorkUrl = () => {
  const networkInterfaces = os.networkInterfaces()
  return networkInterfaces.eth0[0].address
}

export const isDevEnv = () => process.env.NODE_ENV === 'development'

export const banner = (port) => {
  console.log('├───────────────────────────┤')
  console.log('├ 🚀 server is listening on ┤')
  console.log('├───────────────────────────┤')

  if (isDevEnv()) console.log(`└── <localhost>\thttp://localhost:${port}`)

  return console.log(`└── <network>\thttp://${getNetWorkUrl()}:${port}`)
}
