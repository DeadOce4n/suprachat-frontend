/* global kiwi:true */
const baseUrl = kiwi.state.getSetting('settings.profilePlugin.apiUrl')

const getPicture = async username => {
    const response = await fetch(`${baseUrl}/users/${username}`)
    const data = await response.json()
    return data.picture || "default.png"
}

kiwi.plugin('profile', (kiwi, log) => {
  kiwi.on('irc.userlist', (event, network) => {
    event.users.forEach(async (user) => {
      const nick = user.nick
      const account = user.account || nick

      const picture = await getPicture(account)

      kiwi.state.addUser(network.id, {
        nick,
        avatar: {
          small: `${baseUrl}/upload/${picture}`
        }
      })

    })
  })

  kiwi.on('irc.join', async (event, network) => {
    const nick = event.nick
    const account = event.account || nick

    const picture = await getPicture(account)

    kiwi.state.addUser(network.id, {
      nick,
      avatar: {
        small: `${baseUrl}/upload/${picture}`
      }
    })
  })

})
