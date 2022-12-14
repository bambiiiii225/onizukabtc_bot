function testWritingFile() {
    bot.on("message", (msg) => {

        var user = {
          id: '',
          message: ''
        }
      
        const id = msg.chat.id;
        const message = msg.text;
      
        user.id = id;
        user.message = message;
      
        var json = JSON.stringify(user);
        
        var fs = require('fs');
        fs.writeFile('user.json', json, err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file')
          }
      
      });
      
        console.log("ID: ", user.id, "\nMessage: ", user.message);
      });
};

function test1(){
    var fs = require('fs');
    var tab = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
    console.log(tab[1].id);
}
test1();
//testWritingFile();