const { json } = require('express');
const TelegramBot = require('node-telegram-bot-api');

require("dotenv").config();

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/admin_SEARCH_BY_ID (.+)/, function adminEditState(msg, match) {
  console.log(`${msg.chat.id} Admin Session !`);
  const id = match[1];

  var fs = require('fs');

  var users = {
    tab: []
  }

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  user.id = id;
  
  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      user = users.tab[i];
      console.log(`user_id found ! for: ${user.id}`);
      t = 1;
    }
  }

  if(t == 0){
    console.log(`user_id not found ! for: ${user.id}`);
  }

  console.log(user);
  bot.sendMessage(msg.chat.id, `${JSON.stringify(user)}`);
});

bot.onText(/\/admin_STATE_DONE (.+)/, function adminEditState(msg, match) {
  var fs = require('fs');
  console.log(`${msg.chat.id} Admin Session !`);
  const id = match[1];

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  var users = {
    tab: []
  }

  user.id = id;
  user.state = 'DONE';

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].state = user.state;
      console.log(`user_state add ! for: ${user.id}`);
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);

  bot.sendMessage(msg.chat.id, `${JSON.stringify(user)}`);
});

bot.onText(/\/admin_STATE_CANCEL (.+)/, function adminEditState(msg, match) {
  var fs = require('fs');
  console.log(`${msg.chat.id} Admin Session !`);
  const id = match[1];

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  var users = {
    tab: []
  }

  user.id = id;
  user.state = 'CANCEL';

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].state = user.state;
      console.log(`user_state add ! for: ${user.id}`);
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);

  bot.sendMessage(msg.chat.id, `${JSON.stringify(user)}`);
});

bot.onText(/\/admin_STATE_IN (.+)/, function adminEditState(msg, match) {
  var fs = require('fs');
  console.log(`${msg.chat.id} Admin Session !`);
  const id = match[1];

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  var users = {
    tab: []
  }

  user.id = id;
  user.state = 'IN PROGRESS';

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].state = user.state;
      console.log(`user_state add ! for: ${user.id}`);
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);
  bot.sendMessage(msg.chat.id, `${JSON.stringify(user)}`);
});

bot.onText(/\/start/, function new1(msg) {
  console.log(`${msg.chat.id} is connect !`);
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['🛒 Buy bitcoin'],
        ['🆘 Help']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, `Hi, your id is: ${msg.chat.id}\nThis bot sells you bitcoin for gift cards. The bot take 20% of the price. Minimum of 25$ in the gift card.\n\nIt only accepts visa, mastercard and amex cards.\n\nOne transcation at a time.`, opts);
});

bot.onText(/\🔙 Menu/, function menu(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['🛒 Buy bitcoin'],
        ['🆘 Help']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, `Hi, your id is: ${msg.chat.id}\nThis bot sells you bitcoin for gift cards.\n\nIt only accepts visa, mastercard and amex cards. Check if your gift card is accepted by our bot before starting.\n\nOne transcation at a time.`, opts);
});


bot.onText(/\🛒 Buy bitcoin/, function buy(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['🔙 Menu'],
        ['🆘 Help']
      ]
    })
  };

  bot.sendMessage(msg.chat.id, 'Enter 16 digits of card number.\n\nExemple format => /card 5265865165826562', opts);
})

bot.onText(/\/card (.+)/, function onEchoText(msg, match) {
  var fs = require('fs');

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  var users = {
    tab: []
  }

  const resp = match[1];

  user.id = msg.chat.id;
  user.card = match[1];

  console.log(resp);

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].card = user.card;
      console.log("user_card add !");
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);

  bot.sendMessage(user.id, 'Enter expiration date.\n\nExemple format => /exp 1220');
});

bot.onText(/\/exp (.+)/, function onEchoText(msg, match) {
  var fs = require('fs');

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  var users = {
    tab: []
  }

  const resp = match[1];

  user.id = msg.chat.id;
  user.exp = match[1];

  console.log(resp);

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].exp = user.exp;
      console.log("user_exp add !");
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);

  bot.sendMessage(user.id, 'Enter 3 digits of cvv.\n\nExemple format => /cvv 999');
});

bot.onText(/\/cvv (.+)/, function onEchoText(msg, match) {
  var fs = require('fs');

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  var users = {
    tab: []
  }

  const resp = match[1];

  user.id = msg.chat.id;
  user.cvv = match[1];

  console.log(resp);

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].cvv = user.cvv;
      console.log("user_cvv add !");
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);

  bot.sendMessage(user.id, 'Enter the price of you gift card.\n\nExemple format => /price 100');
});

bot.onText(/\/price (.+)/, function onEchoText(msg, match) {
  var fs = require('fs');

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '', 
    state:''
  }

  var users = {
    tab: []
  }

  const resp = match[1];

  user.id = msg.chat.id;
  user.prix = match[1];

  console.log(resp);

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].prix = user.prix;
      console.log("user_prix add !");
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);
  
  const resul = (user.prix*80)/100;

  bot.sendMessage(user.id, `You will receive ${resul}$ CAD\n\nEnter your btc wallet.\n\nExemple format => /btc 1KhpUPhxyXCvNENcaSGZCGQXisaApMh5hD`);
});

bot.onText(/\/btc (.+)/, function onEchoText(msg, match) {
  var fs = require('fs');

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '',
    state:''
  }

  var users = {
    tab: []
  }

  const resp = match[1];

  user.id = msg.chat.id;
  user.btc = match[1];

  console.log(resp);

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  var t = 0;

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == user.id) {
      users.tab[i].btc = user.btc;
      console.log("user_btc add !");
      t = 1;
    }
  }

  if(t == 0){
    users.tab.push(user);
  }

  var json = JSON.stringify(users.tab);

  fs.writeFileSync('data/users.json', json);

  bot.sendMessage(user.id, 'Wait 45 minutes to receive your BTC.\n\nClick on /btcR to see the statue of payment.');
});

bot.onText(/\/btcR/, function onEchoText(msg) {
  var fs = require('fs');

  var user = {
    id: '',
    card: '',
    exp: '',
    cvv: '',
    prix: '',
    btc: '',
    state:''
  }

  var users = {
    tab: []
  }

  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  for (let i = 0; i < users.tab.length; i++) {
    if (users.tab[i].id == msg.chat.id) {
      user.state = users.tab[i].state;
      console.log("user_state found !");
    }
  }

  bot.sendMessage(msg.chat.id, `Wait statue DONE to start a new transaction.\n\nStatue: ${user.state}`);
});


bot.onText(/\/all/, function onEchoText(msg) {
  var fs = require('fs');

  var users = {
    tab: []
  }
  
  users.tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

  console.log(users.tab);
  bot.sendMessage(msg.chat.id, `${JSON.stringify(users.tab)}`);
});

bot.onText(/\🆘 Help/, function help(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['🔙 Menu']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Contact => @bambashopcc', opts);
})


/** const chatMsg = msg.text;

  console.log(chatId, chatMsg) 
  const chatId = msg.from.id;
    const reply = msg.text;
    if (reply == "/start") {
        // send a message to the chat acknowledging receipt of their message
        bot.sendMessage(chatId, 'Hi\nThis bot sells you bitcoin for gift cards.\n\nIt only accepts visa, mastercard and amex cards. To check if your gift card is accepted by our bot. Please click on /confirm to continue.');
    } else if(reply == "/confirm"){
        bot.sendMessage(chatId, 'Please enter the first 4 digits of the card number\n\nReturn to menu /start')
    } else {
        bot.sendMessage(chatId, 'Click on /start')
    }
  
  */
