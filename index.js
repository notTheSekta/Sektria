const Discord = require("discord.js")
const client = new Discord.Client()
const {token} = require("./config.json")

const fs = require("fs")

var guilds = JSON.parse(fs.readFileSync("./guilds/a.guilds.json"), "utf8")
var users = JSON.parse(fs.readFileSync("./users/database.json"), "utf8")

var red = "#ff0000"
var green = "#00ff0d"
var yellow = "#fffb00"



client.login(token)

client.on("ready", () =>{
    console.log("Online as: "+ client.user.username)
    client.user.setActivity("with you")
})

function getRandomInt(min, max) {

      min = Math.ceil(min);
    
      max = Math.floor(max);
    
      return Math.floor(Math.random() * (max - min)) + min;
    
    }

client.on("message", message =>{
    
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.channel.type == "dm") return;


    if(!guilds[message.guild.id]) guilds[message.guild.id] = {
        prefix: "!"
    };

    if(!users[message.author.id]) users[message.author.id] = {
        lvl: 1,
        xp: 0,
        maxxp: 10
    };

    var user = users[message.author.id]
    var guild = guilds[message.guild.id]

    const defcommandlist = [`${guild.prefix}help`, `${guild.prefix}vote`, `${guild.prefix}lvl`, `${guild.prefix}prefix`, `${guild.prefix}invite`]
    const adcommandlist = [`${guild.prefix}ban / @ A-USER`, `${guild.prefix}kick / @ A-USER`, `${guild.prefix}warn / @ A-USER / message`, `${guild.prefix}c.prefix / NEW-PREFIX`, `${guild.prefix}r.prefix (resets the predix to default)`]


    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(guild.prefix+"c.prefix")){
            const msg = message.content.split(" ")
            if(msg.length < 2)return message.channel.send({embed: {
                title: "ERROR",
                color: red,
                description: "You need to set a Prefix!"
            }})
            guild.prefix = msg.slice(1).join("")
            message.channel.send({embed: {
                title: "Prefix got changed!",
                color: yellow,
                description: "New Prefix: "+guild.prefix
            }})
        }
        if(message.content.startsWith(guild.prefix+"r.prefix")){
            guild.prefix = "!"
            message.channel.send({embed: {
                title: "Prefix got changed!",
                color: yellow,
                description: "New Prefix: "+guild.prefix
            }})
        }
    }

    if(message.member.hasPermission("BAN_MEMBERS")){

        if(message.content.startsWith(guild.prefix+"ban")){
            
            const memberr = message.mentions.users.first();
            if (memberr) {
                const member = message.guild.member(memberr);
                if (member) {
                member
                    .ban({
                    reason: 'He was bad!',
                    })
                    .then(() => {
                    message.channel.send({embed: {
                        title: memberr.tag,
                        color: green,
                        description: "Successfully banned"
                    }});
                    })
                    .catch(err => {
                    message.channel.send({embed: {
                        title: "ERROR",
                        color: red,
                        description: "I was unable to ban the member"
                    }});
                    console.error(err);
                    });
                } else {
                message.channel.send({embed: {
                    title: "ERROR",
                    color: red,
                    description: "That user isn't in this guild!"
                }});
                }
            } else {
                message.channel.send({embed: {
                    title: "ERROR",
                    color: red,
                    description: "You didn't mention the user to ban!"
                }});
            }
        }



    }




    if(message.member.hasPermission("KICK_MEMBERS")){

        if(message.content.startsWith(guild.prefix+"kick"))
        {
            const memberr = message.mentions.users.first();
            
            if (memberr) {
            const member = message.guild.member(memberr);
            if (member) {
                member
                .kick('Did something wrong!')
                .then(() => {
                    message.channel.send({embed: {
                        title: memberr.tag,
                        color: green,
                        description: "Successfully banned"
                    }});
                })
                .catch(err => {
                    message.channel.send({embed: {
                        title: "ERROR",
                        color: red,
                        description: "I was unable to ban the member"
                    }});
                    console.error(err);
                });
            } else {
                message.channel.send({embed: {
                    title: "ERROR",
                    color: red,
                    description: "That user isn't in this guild!"
                }});
            }
            } else {
                message.channel.send({embed: {
                    title: "ERROR",
                    color: red,
                    description: "You didn't mention the user to kick!"
                }});
            }
        }






    }


    if(message.member.hasPermission("VIEW_AUDIT_LOG")){
        if(message.content.startsWith(guild.prefix+"warn")){
            const user = message.mentions.users.first();
            const msg = message.content.split(" ")

            user.send({embed: {
                title: `You have been warned from *${message.author.username}#${message.author.discriminator}* on *${message.guild.name}*!`,
                color: yellow,
                description: msg.slice(2).join(" ")
            }})
        }
    }


    if(message.content.startsWith(guild.prefix+"help")){
        if(message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("VIEW_AUDIT_LOG") || message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("KICK_MEMBERS")){
            message.channel.send({embed: {
                title: "Commands",
                color: green,
                description: "General\n"+defcommandlist.join("\n")+"\n\nModeration\n"+adcommandlist.join("\n")
            }})
        }else{
            message.channel.send({embed: {
                title: "Commands",
                color: green,
                description: "General\n"+defcommandlist.join("\n")
            }})
        }
    }


    if(message.content.startsWith(guild.prefix+"invite")){
        message.author.send("Thank you for invite me to your server!\nhttps://discord.com/api/oauth2/authorize?client_id=816757422076723240&permissions=8&scope=bot")
    }


    if(message.content.startsWith(guild.prefix+"prefix")){
        message.channel.send({embed: {
            title: "Prefix of this Server",
            color: green,
            description: guild.prefix
        }})
    }

    if(message.content.startsWith(guild.prefix+"vote")){
        message.channel.send({embed: {
            title: "ERROR",
            color: red,
            description: "Couldnt find the bot on top.gg"
        }})
    }

    fs.writeFile("./guilds/a.guilds.json", JSON.stringify(guilds), (x) =>{
        console.error(x)
    })

    if(message.content.startsWith(guild.prefix+"lvl")){
        const member = message.mentions.users.first();
        if(!member) return message.channel.send({embed: {
            title: "Your current Stats",
            color: green,
            description: `LVL: ${user.lvl}\nXP: ${user.xp}`
        }})
        if(member.bot)return message.channel.send({embed: {
            title: "ERROR",
            color: red,
            description: "You cant see Stats of Bots!"
        }})
        const ouser = users[member.id]
        message.channel.send({embed: {
            title: "Other users Stats",
            color: green,
            description: `LVL: ${ouser.lvl}\nXP: ${ouser.xp}`
        }})
    }

    if(message.content.startsWith(guild.prefix)) return;

    user.xp = user.xp + getRandomInt(0,5)

    if(user.xp >= user.maxxp){
        user.lvl++
        user.xp = user.xp - user.maxxp
        user.maxxp = user.maxxp + 6
        message.channel.send({embed: {
            title: "Congratiolations!",
            color: green,
            description: `You Advanced to lvl *${user.lvl}*`
        }})
    }

    
    
    fs.writeFile("./users/database.json", JSON.stringify(users), (x) =>{
        console.error(x)
    })
        


})