/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('js-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');

Asena.addCommand({pattern: 'sticker', fromMe: true, desc: 'Yanıt verdiğiniz fotoğraf veya videoyu sticker yapın.'}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('*Bir fotoğraf veya videoya yanıt verin!*');
    var info = await message.reply('```Medya indiriliyor & sticker yapılıyor...```');
    
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    if (message.reply_message.video === false && message.reply_message.image) {
        execFile(cwebp, [location, '-o', 'output.webp'], async err => {
            if (err) {
                throw err;
            }
        
            await message.sendMessage(fs.readFileSync('./output.webp'), MessageType.sticker);
            return await info.delete();        
        });
        return;
    }
    
    await ffmpeg.ffmpeg(location, 
        ["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 512x512"], 
        'sticker.webp').success(async function (data) {
            await message.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker);
            await info.delete();
        });
}));
