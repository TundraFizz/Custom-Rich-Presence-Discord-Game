const DiscordRPC = require("discord-rpc");

const ClientId = '461029893858131968';

// only needed for discord allowing spectate, join, ask to join
DiscordRPC.register(ClientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  rpc.setActivity({
    details: `booped times`,
    state: 'in slither party',
    largeImageKey: 'icon',
    instance: false,
  });
});

rpc.login(ClientId);
