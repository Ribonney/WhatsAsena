/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType, aesDecrypt} = require('@adiwajshing/baileys');
const {spawnSync} = require('child_process');
const Config = require('../config');

Asena.addCommand({pattern: 'alive', fromMe: true, desc: 'Bot çalışıyor mu?'}, (async (message, match) => {
    await message.sendMessage(
        '```Tanrı Türk\'ü Korusun. 🐺 Asena çalışıyor...```\n\n*Version:* ```'+Config.VERSION , MessageType.text
    );
}));

Asena.addCommand({pattern: 'sysd', fromMe: true, desc: 'Sistem özelliklerini söyler.'}, (async (message, match) => {
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        child, MessageType.text
    );
}));
