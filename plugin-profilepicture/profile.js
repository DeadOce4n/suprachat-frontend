/* global kiwi:true */
const baseUrl = kiwi.state.getSetting('settings.profilePlugin.apiUrl')
console.log(baseUrl)

kiwi.plugin('profile', (kiwi, log) => {
    kiwi.on('irc.userlist', (event, network) => {
        event.users.forEach((user) => {
            const nick = user.nick;
            const account = kiwi.state.getUser(network.id, nick).account;

            kiwi.state.addUser(network.id, {
                nick,
                avatar: {
                    small: `${baseUrl}/users/${account}/picture`,
                },
            });
        });
    });
    kiwi.on('irc.join', (event, network) => {
        const nick = event.nick;
        const account = event.account;

        kiwi.state.addUser(network.id, {
            nick,
            avatar: {
                small: `${baseUrl}/users/${account}/picture`,
            },
        });
    });
});
