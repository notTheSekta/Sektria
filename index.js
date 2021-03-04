const Discord = require("discord.js")
const client = new Discord.Client()
const {token} = require("./config.json")

const fs = require("fs")

var guilds = JSON.parse(fs.readFileSync("./guilds/a.guilds.json"), "utf8")
var users = JSON.parse(fs.readFileSync("./users/database.json"), "utf8")

var red = "#ff0000"
var green = "#00ff0d"
var yellow = "#fffb00"

var er = "ERROR"



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
        prefix: "!",
        channel: 0,
        welcomeM: "Welcome to the server",
        privwm: false,
        ewelcome: false,
        verify: false,
        vchannel: 0,
        vmdelete: false,
        vrole: 0
    };

    if(!users[message.author.id]) users[message.author.id] = {
        lvl: 1,
        xp: 0,
        maxxp: 10
    };

    var user = users[message.author.id]
    var guild = guilds[message.guild.id]

    const defcommandlist = [`${guild.prefix}help`, `${guild.prefix}vote`, `${guild.prefix}lvl`, `${guild.prefix}prefix`, `${guild.prefix}invite`, `${guild.prefix}verify`]
    const adcommandlist = [`${guild.prefix}ban / @ A-USER`, `${guild.prefix}kick / @ A-USER`, `${guild.prefix}warn / @ A-USER / message`, `${guild.prefix}c.prefix / NEW-PREFIX`, `${guild.prefix}r.prefix (resets the predix to default)`, `${guild.prefix}e.welcome`, `${guild.prefix}d.welcome`, `${guild.prefix}e.w-private`, `${guild.prefix}d.w-private`, `${guild.prefix}c.w-message`, `${guild.prefix}c.w-channel`, `${guild.prefix}r.w-channel`, `${guild.prefix}e.verify`, `${guild.prefix}d.verify`, `${guild.prefix}c.v-role`, `${guild.prefix}c.v-channel`, `${guild.prefix}e.v-delete`, `${guild.prefix}d.v-delete`]



        if(message.content.startsWith(guild.prefix+"c.prefix")){
            if(message.member.hasPermission("ADMINISTRATOR")){
                const msg = message.content.split(" ")
                if(msg.length < 2)return message.channel.send({embed: {
                    title: er,
                    color: red,
                    description: "You need to set a Prefix!"
                }})
                guild.prefix = msg.slice(1).join("")
                message.channel.send({embed: {
                    title: "Prefix got changed!",
                    color: yellow,
                    description: "New Prefix: `"+guild.prefix+"`"
                }})
            }else{
                message.channel.send({embed: {
                    title: er,
                    color: red,
                    description: "You are not beable to use this command!"
                }})
            }
        }
        if(message.content.startsWith(guild.prefix+"r.prefix")){
            if(message.member.hasPermission("ADMINISTRATOR")){
                guild.prefix = "!"
                message.channel.send({embed: {
                    title: "Prefix got changed!",
                    color: yellow,
                    description: "New Prefix: `"+guild.prefix+"`"
                }})
            }else{
                message.channel.send({embed: {
                    title: er,
                    color: red,
                    description: "You are not beable to use this command!"
                }})
            }
        }
    


        if(message.content.startsWith(guild.prefix+"ban")){
            if(message.member.hasPermission("BAN_MEMBERS")){
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
                            title: er,
                            color: red,
                            description: "I was unable to ban the member"
                        }});
                        console.error(err);
                        });
                    } else {
                    message.channel.send({embed: {
                        title: er,
                        color: red,
                        description: "That user isn't in this guild!"
                    }});
                    }
                } else {
                    message.channel.send({embed: {
                        title: er,
                        color: red,
                        description: "You didn't mention the user to ban!"
                    }});
                }
            }else{
                message.channel.send({embed: {
                    title: er,
                    color: red,
                    description: "You have no permissions to ban a user!"
                }})
            }
        }



        if(message.content.startsWith(guild.prefix+"kick"))
        {
            if(message.member.hasPermission("KICK_MEMBERS")){
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
                            title: er,
                            color: red,
                            description: "I was unable to ban the member"
                        }});
                        console.error(err);
                    });
                } else {
                    message.channel.send({embed: {
                        title: er,
                        color: red,
                        description: "That user isn't in this guild!"
                    }});
                }
                } else {
                    message.channel.send({embed: {
                        title: er,
                        color: red,
                        description: "You didn't mention the user to kick!"
                    }});
                }
            }else{
                message.channel.send({embed: {
                    title: er,
                    color: red,
                    description: "You have no permissions to kick a user!"
                }})
            }    
        }





        if(message.content.startsWith(guild.prefix+"e.verify")){
            if(message.member.hasPermission("MANAGE_CHANNELS")){
                guild.verify = true
                message.channel.send({embed: {
                    title: "Enabled Verification",
                    color: green,
                    description: "Make sure to set a role and channel now!"
                }})
            }else{
                message.channel.send("You are not beable to use this command!")
            }
        }
        
        if(message.content.startsWith(guild.prefix+"d.verify")){
            if(message.member.hasPermission("MANAGE_CHANNELS")){
                guild.verify = false
                message.channel.send({embed: {
                    title: "Disabled Verification",
                    color: green,
                    description: "Your users do not need to verify now!"
                }})
            }else{
                message.channel.send("You are not beable to use this command!")
            }
        }

        if(message.content.startsWith(guild.prefix+"e.v-delete")){
            if(message.member.hasPermission("MANAGE_MESSAGES")){
                guild.vmdelete = true
                message.channel.send({embed: {
                    title: "Enabled deleting verify messages",
                    color: green,
                    description: "Users verification messages will be removed now!"
                }})
            }else{
                message.channel.send("You are not beable to use this command!")
            }
        }

        if(message.content.startsWith(guild.prefix+"d.v-delete")){
            if(message.member.hasPermission("MANAGE_MESSAGES")){
                guild.vmdelete = false
                message.channel.send({embed: {
                    title: "Disabled deleting verify messages",
                    color: green,
                    description: "Users verification messages will be not removed now!"
                }})
            }else{
                message.channel.send("You are not beable to use this command!")
            }
        }

        if(message.content.startsWith(guild.prefix+"c.v-role")){
            if(message.member.hasPermission("MANAGE_ROLES")){
                if(guild.verify == false) return message.channel.send({embed: {
                    title: "ERROR",
                    color: red,
                    description: "Verification is not enabled!"
                }})
                var msg = message.content.split(" ")
                guild.vrole = msg.slice(1).join("")
                if(guild.vchannel == 0){
                    message.channel.send({embed: {
                        title: "Changed the Verification role!",
                        color: green,
                        description: "Make sure to set a channel now!"
                    }})
                }else{
                    message.channel.send({embed: {
                        title: "Changed the Verification role!",
                        color: green,
                        description: "Your Verification setup is complete now!"
                    }})
                }
            }else{
                message.channel.send("You are not beable to use this command!")
            }
        }

        if(message.content.startsWith(guild.prefix+"c.v-channel")){
            if(message.member.hasPermission("MANAGE_ROLES")){
                if(guild.verify == false) return message.channel.send({embed: {
                    title: "ERROR",
                    color: red,
                    description: "Verification is not enabled!"
                }})
                var msg = message.content.split(" ")
                guild.vchannel = msg.slice(1).join("")
                if(guild.vrole == 0){
                    message.channel.send({embed: {
                        title: "Changed the Verification channel!",
                        color: green,
                        description: "Make sure to set a role now!"
                    }})
                }else{
                    message.channel.send({embed: {
                        title: "Changed the Verification channel!",
                        color: green,
                        description: "Your Verification setup is complete now!"
                    }})
                }
            }else{
                message.channel.send("You are not beable to use this command!")
            }
        }


        if(message.content.startsWith(guild.prefix+"verify")){
            if(guild.verify == false) return;
            if(guild.vchannel == 0) return;
            if(message.channel.id == guild.vchannel){
                if(guild.vrole == 0) return;
                if(message.member.roles.cache.has(guild.vrole)) return message.author.send({embed: {
                    title: er,
                    color: red,
                    description: "You already verified on `"+message.guild.name+"`"
                }})
                if(guild.vmdelete == true){
                    message.delete({timeout: 1000, reason: "Verification"})
                    message.member.roles.add(guild.vrole)
                    message.author.send({embed: {
                        title: message.author.username+"#"+message.author.discriminator,
                        color: yellow,
                        description: "You verified yourself on `"+message.guild.name+"`"
                    }})
                }else{
                    message.member.roles.add(guild.vrole)
                    message.author.send({embed: {
                        title: message.author.username+"#"+message.author.discriminator,
                        color: yellow,
                        description: "You verified yourself on `"+message.guild.name+"`"
                    }})
                }
            }else{
                return;
            }
        }






        if(message.content.startsWith(guild.prefix+"warn")){
            if(message.member.hasPermission("VIEW_AUDIT_LOG")){
                const user = message.mentions.users.first();
                const msg = message.content.split(" ")

                user.send({embed: {
                    title: `You have been warned from *${message.author.username}#${message.author.discriminator}* on *${message.guild.name}*!`,
                    color: yellow,
                    description: msg.slice(2).join(" ")
                }})
            }else{
                message.channel.send({embed: {
                    title: er,
                    color: red,
                    description: "You are not beable to use this command!"
                }})
            }
        }
    


    if(message.member.hasPermission("MANAGE_CHANNELS")){
        if(message.content.startsWith(guild.prefix+"c.w-channel")){
            if(guild.ewelcome == false)return message.channel.send({embed: {
                title: er,
                color: red,
                description: "Welcome messages are disabled!"
            }}); 
            var msg = message.content.split(" ")
            guild.channel = msg.slice(1).join("")
            const channel = client.channels.cache.get(guild.channel)
            if(!channel) return message.channel.send({embed: {
                title: er,
                color: red,
                description: "Didnt found the channel: "+guild.channel
            }})
            message.channel.send({embed: {
                title: "Changed the Welcome channel",
                color: green,
                description: `Name: ${channel.toString()}\nID: ${channel.id}`
            }})
        }

        if(message.content.startsWith(guild.prefix+"r.w-channel")){
            if(guild.ewelcome == false)return message.channel.send({embed: {
                title: er,
                color: red,
                description: "Welcome messages are disabled!"
            }}); 
            guild.channel = 0
            message.channel.send({embed: {
                title: "Removed the Welcome channel",
                color: yellow,
                description: "Please turn welcome messages of or put it on dm channel only!"
            }})
        }

        if(message.content.startsWith(guild.prefix+"c.w-message")){
            if(guild.ewelcome == false)return message.channel.send({embed: {
                title: er,
                color: red,
                description: "Welcome messages are disabled!"
            }}); 
            const msg = message.content.split(" ")
            guild.welcomeM = msg.slice(1).join(" ")
            message.channel.send({embed: {
                title: "Welcome message got changed!",
                color: yellow,  
                description: "New welcome message:\n"+guild.welcomeM
            }})
        }

        if(message.content.startsWith(guild.prefix+"e.welcome")){
            guild.ewelcome = true
            message.channel.send({embed: {
                title: "*Welcome* got enabled",
                color: green,
                description: "Please make sure you select a channel now or turn dm welcome on"
            }})
        }

        if(message.content.startsWith(guild.prefix+"d.welcome")){
            guild.ewelcome = false
            message.channel.send({embed: {
                title: "*Welcome* got disabled",
                color: green,
                description: "Nobody will be welcomed now 😭"
            }})
        }

        if(message.content.startsWith("e.w-private")){
            if(guild.ewelcome == false)return message.channel.send({embed: {
                title: er,
                color: red,
                description: "Welcome messages are disabled!"
            }}); 
            guild.privwm = true
            message.channel.send({embed: {
                title: "Private *Welcome* got enabled",
                color: green,
                description: "You new users will get notified now in their dm's"
            }})
        }

        if(message.content.startsWith("d.w-private")){
            if(guild.ewelcome == false)return message.channel.send({embed: {
                title: er,
                color: red,
                description: "Welcome messages are disabled!"
            }}); 
            guild.privwm = false
            message.channel.send({embed: {
                title: "Private *Welcome* got disabled",
                color: green,
                description: "You new users will not get notified now in their dm's"
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
            title: er,
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
            title: er,
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



client.on("guildMemberAdd", member =>{

    if(!guilds[member.guild.id]) guilds[member.guild.id] = {
        prefix: "!",
        channel: 0,
        welcomeM: "Welcome to the server",
        privwm: false,
        ewelcome: false,
        verify: false,
        vchannel: 0,
        vrole: 0
    };

    var memguild = guilds[member.guild.id]
    if(memguild.welcomeM == false) return;
    if(memguild.privwm == false){
        const guild = member.guild.id;
        const gguild = client.guilds.cache.get(guild);
        const channel = gguild.channels.cache.get(memguild.channel);
        
        if(!channel) return gguild.owner.send("Didnt found the channel please try to set ot again!");
        channel.send({embed: {
            title: member.user.username+"#"+member.user.discriminator,
            color: green,
            thumbnail: {
                url: member.user.avatarURL(URL),
            },
            description: memguild.welcomeM
        }})
    }else{
        member.send({embed: {
            title: member.user.username+"#"+member.user.discriminator,
            color: green,
            thumbnail: {
                url: member.user.avatarURL(URL),
            },
            description: memguild.welcomeM
        }})
    }
    
    


    fs.writeFile("./guilds/a.guilds.json", JSON.stringify(guilds), (x) =>{
        console.error(x)
    })
})
