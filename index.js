
var Telegraf = require('telegraf');
var TelegrafInlineMenu = require('telegraf-inline-menu');
let Composer = require('telegraf/composer');
let session = require('telegraf/session');
var Extra = require('telegraf/extra');
var Markup = require('telegraf/markup');
let Stage = require('telegraf/stage');
let WizardScene = require('telegraf/scenes/wizard');
let Scene = require('telegraf/scenes/base')
let { enter, leave } = Stage
var name= '';

//var bot = new Telegraf('bot_id')

var bot = new Telegraf('telegram bot api')
bot.use(session())

var question99 = new Scene('que99')
question99.enter((ctx) => ctx.reply('just some thing'))
question99.leave((ctx) => ctx.reply(`by by`))
question99.on('text', (ctx) => {
  console.log(ctx.message.text);
  ctx.scene.leave();
});

var stage2 = new Stage([question99], { ttl: 60 })
bot.use(stage2.middleware())

bot.hears('my',async (ctx) => {
  ctx.scene.enter('que99')
})


bot.command('rnd', async (ctx) => {
 
   /*  ctx.scene.reset();
    ctx.scene.session = {};
    var dd = ctx.scene.options.sessionName
    ctx[dd].__scenes = {}; */

    let question1 = new Scene('que1')
    let question2 = new Scene('que2')
    let question3 = new Scene('que3')
    console.log('ssssss')

    let stage = new Stage([question1, question2, question3], { ttl: 90 })
    bot.use(stage.middleware())

    // question1 scene
    //ctx.scene.enter('que1')    
    question1.enter((ctx) => ctx.reply('Name of project?'));           
    console.log(ctx)
    question1.on('text', (ctx) => {
      console.log(ctx.message.text);
      // ctx.scene.leave();
      ctx.scene.enter('que2');
    });

    // question2 scene
    question2.enter((ctx) => ctx.reply('Description about project?'))
    question2.on('text', (ctx) => {
      console.log(ctx.message.text);
      ctx.scene.enter('que3');
    });
    //question2.command('back', leave())

    // question3 scene
    question3.enter((ctx) => ctx.reply('Duration of project?'))
    question3.leave((ctx) => ctx.reply(`project with name ${name} is made.`))
    question3.on('text', (ctx) => {
      console.log(ctx.message.text);
      ctx.scene.leave();
      this.return;
    });

    bot.command('tt', ctx => {
      console.log(ctx)
      ctx.scene.enter('que1')
      /* var ss = setTimeout(() => {
        ctx.scene.enter('que1')
        console.log(ctx)
      }, 9000); */
    })

})

bot.command('text', async (ctx) => {

  /* ctx.scene.reset();
  ctx.scene.session = {};
  var dd = ctx.scene.options.sessionName
  ctx[dd].__scenes = {}; */


  let question1 = new Scene('que 1')
  let question2 = new Scene('que 2')
  let question3 = new Scene('que 3')
  console.log('ssssss')

  let stage = new Stage([question1, question2, question3], { ttl: 90 })
  bot.use(stage.middleware())


  // question1 scene
  //ctx.scene.enter('que1')    
  question1.enter((ctx) => ctx.reply('Name of project2?'));           
  console.log(ctx)
  question1.on('text', (ctx) => {
    console.log(ctx.message.text);
    // ctx.scene.leave();
    ctx.scene.enter('que 2');
  });

  // question2 scene
  question2.enter((ctx) => ctx.reply('Description about project2?'))
  question2.on('text', (ctx) => {
    console.log(ctx.message.text);
    ctx.scene.enter('que 3');
  });
  //question2.command('back', leave())

  // question3 scene
  question3.enter((ctx) => ctx.reply('Duration of project2?'))
  question3.leave((ctx) => ctx.reply(`project with name ${name} is made.`))
  question3.on('text', (ctx) => {
    console.log(ctx.message.text);
    ctx.scene.leave();
    return;
  });

  bot.command('ttt', ctx => {
    console.log(ctx)
    ctx.scene.enter('que 1')
  })

})

//bot.command('que1', enter('que1'))
//bot.command('que1', enter('que1'))
//bot.command('que2', enter('que2'))
bot.startPolling()