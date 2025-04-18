const { EmbedBuilder } = require("discord.js")
const lang = require("../../events/loadLanguage")

module.exports = {
  name: "assassinate",
  description: lang.assassinateDescription,
  usage: lang.assassinateUsage,
  execute(message, args) {
    const user = message.mentions.users.first()

    if (!user) {
      return message.reply(lang.assassinateNoUserError)
    }

    const kills = [
      ` after a long day, plops down on the couch with ${user} and turns on The Big Bang Theory. After a Sheldon Cooper joke, ${user} laughs uncontrollably as they die.`,
      `${message.author} Alt+F4'd ${user}.exe!`,
      `${message.author} attempted to play a flute, exploding the head of ${user}.`,
      `${message.author} blew their own ear drums out listening to music too hard, accidentally taking ${user} with them.`,
      `${message.author} challenges ${user} to a fist fight to the death. ${user} wins.`,
      `${message.author} cleaves the head of ${user} with a keyboard.`,
      `${message.author} crushes ${user} with a fridge.`,
      `${message.author} decapitates ${user} with a sword.`,
      `${message.author} drags ${user}'s ears too hard and rips them off.`,
      `${message.author} drowns ${user} in a beer barrel.`,
      `${message.author} drowns ${user} in a tub of hot chocolate. *How was your last drink?*`,
      `${message.author} eviscerates ${user} with a rusty butter knife. Ouch!`,
      `${message.author} feeds toothpaste-filled oreos to ${user}, who were apparently allergic to fluorine. GGWP.`,
      `${message.author} fell in love with ${user} then broke their heart literally.`,
      `${message.author} fires a supersonic frozen turkey at ${user}, killing them instantly.`,
      `${message.author} forgot to leave the car door window open and ${user} dies from overheating.`,
      `${message.author} forgot to zombie-proof ${user}'s lawn... Looks like zombies had a feast last night.`,
      `${message.author} gets ${user} to watch anime with them. ${user} couldn't handle it.`,
      `${message.author} grabs ${user} and shoves them into an auto-freeze machine with some juice and sets the temperature to 100 Kelvin, creating human ice pops.`,
      `${message.author} hired me to kill you, but I don't want to! ${user}`,
      `${message.author} hugs ${user} too hard...`,
      `${message.author} hulk smashes ${user} into a pulp.`,
      `${message.author} killed ${user} by ripping the skin off their face and making a mask out of it.`,
      `${message.author} kills ${user} after hours of torture.`,
      `${message.author} kills ${user} with a candlestick in the study.`,
      `${message.author} kills ${user} with kindness.`,
      `${message.author} kills ${user} with their own foot.`,
      `${message.author} murders ${user} with an axe.`,
      `${message.author} pressed delete. It deleted ${user}.`,
      `${message.author} pushes ${user} into the cold vacuum of space.`,
      `${message.author} runs ${user} over with a PT Cruiser.`,
      `${message.author} shoots ${user} in the head.`,
      `${message.author} shoots ${user} in the mouth with a rainbow laser, causing ${user}'s head to explode with rainbows and ${user} is reborn as a unicorn. :unicorn:`,
      `${message.author} shot ${user} using the Starkiller Base!`,
      `${message.author} slips bleach into ${user}'s lemonade.`,
      `${message.author} strangles ${user}.`,
      `${message.author} straps ${user} to an ICBM and sends them to North Korea along with it.`,
      `${message.author} strikes ${user} with the killing curse... *Avada Kedavra!*`,
      `${message.author} tears off ${user}'s lips after a kiss.`,
      `${message.author} thicc and collapses ${user}'s rib cage.`,
      `${message.author} tries to shoot the broad side of a barn, misses and hits ${user} instead.`,
      `${message.author} turns on Goosebumps (2015 film) on the TV. ${user}, being a scaredy-cat, dies of a heart attack.`,
      `${message.author} was so swag that ${user} died due to it. #Swag`,
      `${message.author}, are you sure you want to kill ${user}? They seem nice to me.`,
      `${user} accidentally clicked on a popup ad that reads \`Doctors hate us, see the one best trick for dying today!\``,
      `${user} accidentally tripped and died while getting up to write their suicide note.`,
      `${user} ate a piece of exotic butter. It was so amazing that it killed them.`,
      `${user} ate an apple and turned out it was made out of wax. Someone died from wax poisoning later that day.`,
      `${user} ate too many laxatives and drowned in their own shit.`,
      `${user} bleeds out after trying to get on \`Dumbest hillbilly moments\`.`,
      `${user} bought a fidget spinner and drowned in pussy.`,
      `${user} can't be killed, as they are a ghost.`,
      `${user} chokes in a trash can.`,
      `${user} chokes on a chicken bone.`,
      `${user} chokes on cheerios and dies. What an idiot...`,
      `${user} cranks up the music system only to realize the volume was at max and the song playing was Baby by Justin Bieber...`,
      `${user} cums in eye, goes blind, runs for help but ran straight onto train tracks and gets plowed by a train.`,
      `${user} decided it was a good idea to fight a tiger while smelling like meat. It did not end well.`,
      `${user} did not make a meme dank enough and was stoned.`,
      `${user} died after fapping 50 times in a row with no break.`,
      `${user} died after gaming for 90 hours straight without moving or eating.`,
      `${user} died after playing with an edgy razor blade fidget spinner.`,
      `${user} died after realizing how shitty their grammar was.`,
      `${user} died after trying to out-meme Dank Memer.`,
      `${user} died an honorable death. Death by snoo snoo.`,
      `${user} died because RemindMeBot forgot to remind them to breathe.`,
      `${user} died because they started playing with a fidget spinner but they realize it's 2016 so you start fapping to the old witch in snow white and obama starts mowing their lawn and they jump out of the window and get ripped to pieces by Obama's lawn mower.`,
      `${user} died because of ${message.author}'s stupidity.`,
      `${user} died because they ate WAY too many hotdogs in preparation for their date Friday night.`,
      `${user} died eating cactus needles.`,
      `${user} died from a high salt intake.`,
      `${user} died from a swift kick to the brain.`,
      `${user} died from a tragic amount of bad succ.`,
      `${user} died from doing the ice bucket challenge.`,
      `${user} died from drinking too much water. Huh, I guess it IS possible!`,
      `${user} died from eating too much ass.`,
      `${user} died from eating too much bread.`,
      `${user} died from Ebola.`,
      `${user} died from a meme underdose.`,
      `${user} died from not eating enough ass.`,
      `${user} died from not whacking it enough. (There's a healthy balance, boys)`,
      `${user} died from reposting in the wrong neighborhood.`,
      `${user} died from shitting for 36 hours straight.`,
      `${user} died from swallowing rocks too fast.`,
      `${user} died from too many sunburns.`,
      `${user} died from whacking it too much. (There's a healthy balance, boys)`,
      `${user} died of oversucc.`,
      `${user} died when testing a hydrogen bomb. There is nothing left to bury.`,
      `${user} died while listening to 'It's every day bro'.`,
      `${user} died while playing hopscotch on *seemingly* deactivated land mines.`,
      `${user} died while trying to find the city of England.`,
      `${user} died. OOF.`,
      `${user} dies after swallowing a toothpick.`,
      `${user} dies at the hands of ${message.author}.`,
      `${user} dies because they used a bobby pin to lift their eyelashes.`,
      `${user} dies because they were just too angry.`,
      `${user} dies by swearing on a Christian Minecraft server.`,
      `${user} dies due to lack of friends.`,
      `${user} dies from bad succ.`,
      `${user} dies from dabbing too hard.`,
      `${user} dies from dabbing too hard.`,
      `${user} dies from disrespecting wahmen.`,
      `${user} dies from just being a bad, un-likeable dude.`,
      `${user} dies from posting normie memes.`,
      `${user} dies from severe dislike of sand. It's coarse and rough and irritating; it gets everywhere.`,
      `${user} dies from watching the Emoji movie and enjoying it.`,
      `${user} dies in a horrible accident, and it was engineered by ${message.author}.`,
      `${user} dies north of the wall and transforms into a White Walker.`,
      `${user} dies of AIDS.`,
      `${user} dies of dysentery.`,
      `${user} dies of natural causes.`,
      `${user} dies of starvation.`,
    ]

    const randomKill = kills[Math.floor(Math.random() * kills.length)]

    const embed = new EmbedBuilder()
      .setTitle(lang.assassinateTitle)
      .setDescription(randomKill)
      .setColor("#FF0000")
      .setTimestamp()

    message.reply({ embeds: [embed] })
  },
}

