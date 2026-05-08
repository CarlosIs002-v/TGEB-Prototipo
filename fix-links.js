const fs = require('fs');
let found = 0;
for(let i=0; i<=5; i++) {
   let f = 'views/slide-' + i + '.html';
   let c = fs.readFileSync(f, 'utf8');

   // Replace the specific text block. Use regex without being afraid of quotes
   const targetRegex = /<a.*?>Ayuda<\/a>/;
   if (targetRegex.test(c)) {
       c = c.replace(targetRegex, '<a class="nav-ayuda" style="cursor:pointer;" onclick="goToSlide(6)">Ayuda</a>');
       fs.writeFileSync(f, c);
       found++;
   }
}
console.log('Fixed ' + found + ' files in views/');

