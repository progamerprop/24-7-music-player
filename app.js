const { Client } = require('discord.js');
const { discord_token } = require('./src/config/settings.json');
const appEvents = require('./src/events/app');
const appHandlers = require('./src/events/handlers/app');
const Player = require('./src/classes/Player');

const client = new Client();
const player = new Player(client);

client.on(appEvents.error, appHandlers.handleError);
client.on(appEvents.guildCreate, (guild) => appHandlers.handleGuildCreate(client, guild));
client.on(appEvents.guildDelete, (guild) => appHandlers.handleGuildDelete(client, guild));
client.on(appEvents.guildUnavailable, appHandlers.handleGuildUnavailable);
client.on(appEvents.invalidated, appHandlers.handleInvalidated);
client.on(appEvents.ready, () => appHandlers.handleReady(player));
client.on(appEvents.voiceStateUpdate, (oldState, newState) => appHandlers.handleVoiceStateUpdate(player, oldState, newState));
client.on(appEvents.warn, appHandlers.handleWarn);

if (process.argv[2] === '--debug') {
  client.on(appEvents.debug, appHandlers.handleDebug);
}

client.login(process.env.token);
