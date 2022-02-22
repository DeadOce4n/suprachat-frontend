/* global kiwi:true */
const baseUrl = kiwi.state.getSetting('settings.profilePlugin.apiUrl')

kiwi.plugin('profile', (kiwi, log) => {
  kiwi.on('irc.userlist', (event, network) => {
    event.users.forEach((user) => {
      const nick = user.nick
      const account = user.account || nick

      kiwi.state.addUser(network.id, {
        nick,
        avatar: {
          small: `${baseUrl}/users/${account}/picture`
        }
      })
    })
  })
  kiwi.on('irc.join', (event, network) => {
    const nick = event.nick
    const account = event.account || nick

    kiwi.state.addUser(network.id, {
      nick,
      avatar: {
        small: `${baseUrl}/users/${account}/picture`
      }
    })
  })
})
