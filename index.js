require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

let lastVersion = null;

async function checkRoblox() {
    try {
        const res = await fetch('https://clientsettings.roblox.com/v2/client-version/WindowsPlayer');
        const data = await res.json();

        const currentVersion = data.Windows;

        if (!lastVersion) {
            lastVersion = currentVersion;
            console.log('Versão inicial:', currentVersion);
            return;
        }

        if (currentVersion !== lastVersion) {
            console.log('Roblox Updated!');

            const channel = await client.channels.fetch(process.env.CHANNEL_ID);

            await channel.setName('Status: 🔴 down');

            lastVersion = currentVersion;
        }
    } catch (err) {
        console.error(err);
    }
}

client.once('ready', async () => {
    console.log(`Logado como ${client.user.tag}`);

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    await channel.setName('Status: 🔴 down');

    console.log('Canal alterado!');
});

client.login(process.env.TOKEN);