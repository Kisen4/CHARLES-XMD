const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU5RQzZxdjhPRnNBTmpoT3dkYjh2Q2VpcFg5dGxCQ2ZKaE96ejR2a25HUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjR6MWc0TkVOMVlhbENsU2w0MkxuUUYrVjMvZlVBWVllNmQ0aTFOc0t4RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLREl6T2RhUWFaRXB0YlJDYzUxUWcwNjBPQ0Fpc1prdy95OS9nM3ZIZTNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwM21LSktJUzBHWGVyU2QrL29vekN5WEQxbkZaQm43N3dVM2NNdHRRc1ZzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhJZUhXV1hhZWs1eTdHRm5nbThGNU5mdjhWMUo0cjU1dGxGT05xZjVGSEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYxYkJ4M2NBWTYwa0o4Zy9QdUdPd3Z2Z25QdE41VjZraUVZZ1NNVXo3WFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU9GdXFrL2pvV0ViOSt2OU1VK0c4TDBnVHFybWJiejFKUkVnWHpTWUdIYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNVQ5R1RTOE5Cb2pEb2ZxYVJKQWdmSEJqUm82ajBxbWxDRHc3Q2JscEN6UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJ1MWdjckZXcVlUTW5iMkhZbHI3akdXYUFlT3IybzNUOWJ5R1VUKzIvZjVHNThKYjl4Rlc2STZQM1g1U0o0ZDZheXBSNVdBVUR3MFlEVXQ2dHFvSmpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ1LCJhZHZTZWNyZXRLZXkiOiI2SVBoaFB2cTlNYW14TVBpdnZ2UkR5T05Td1JjUkowd3ZFaHJkQkkyN3hjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTY0NjgxNzk4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE5QTZCMDM0NTJCMTk3NjAwM0YyOTgwQTA5Qjk4QTJGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2MjMxMzB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyNTY0NjgxNzk4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjExMjE2MjdCM0Q5QTcxMTcxNkU4MTJEMDA5RTE4QUJEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2MjMxMzB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiIyMjU2NDY4MTc5ODoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJLaXNlbiIsImxpZCI6IjE3MTIyODAzMTYxOTIyNjoxMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tESW41QUVFUFhQMjhNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ii9qRzhnUjBsNnQwejlFVWM4eDVtTTJ6U0oxWFVVTTZteFdJN2dtTmg3QjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlBaTXZLczk4Tm9IUDU2RGRyYldyaWlFSEhZM3dHQlRKT2ZYVVR0eW5rYWdMUitqejd4QStWdjhhdktPQ2xnSWZIcE9iR21MYmhVaW8yc1hDNzFYekRBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2b1c4YmdtaWZ5eVZ3enlIMkVGTGVJQnRWL0p3QnJnWS8wZEZsNkMrM0VPSkZpV3RDMWg1M3FRZHd6R2wvTE5Pa3hVb2orWDJ3dlhGYkZHVWZiNndnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTY0NjgxNzk4OjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmY0eHZJRWRKZXJkTS9SRkhQTWVaak5zMGlkVjFGRE9wc1ZpTzRKallld2UifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjYyMzEwNiwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdzZCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2250564681798",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
