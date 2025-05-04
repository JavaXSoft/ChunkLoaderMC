const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'YOUR_IP_HERE',
    port: 31121, //YOUR SERVER PORT
    username: 'ChunkLoader',
    version: false
});

bot.on('spawn', () => {
    console.log('Bot joined...');
    bot.chat('I\'m here to load chunks.');

    setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500)
        const yaw = Math.random() * Math.PI * 2;
        bot.look(yaw, 0, true);
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 1000) 
    }, 6000);
});

bot.on('error', err => {
    console.log('Bot error:', err)
});

bot.on('end', () => {
    console.log('Bot disconnected. Restarting...');
    setTimeout(() => {
        require('child_process').spawn(process.argv[0], process.argv.slice(1), {
            detached: true,
            stdio: 'inherit'
        });
        process.exit();
    }, 5000);
});