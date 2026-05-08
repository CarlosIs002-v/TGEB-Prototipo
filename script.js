const fs = require('fs');

try {
  let html = fs.readFileSync('index.html', 'utf8');

  const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  if (cssMatch) fs.writeFileSync('css/style.css', cssMatch[1].trim());

  const jsMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  if (jsMatch) fs.writeFileSync('js/app.js', 'window.goToSlide = goToSlide;\nwindow.nextSlide = nextSlide;\nwindow.prevSlide = prevSlide;\nwindow.switchAuthTab = switchAuthTab;\n\n' + jsMatch[1].trim());

  let currentHtml = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="css/style.css">');
  // currentHtml = currentHtml.replace(/<script>[\s\S]*?<\/script>/, '<script src="js/app.js"></script>');
  // Actually Webpack injects the script automatically in dev/prod depending on config. Let's leave a comment
  currentHtml = currentHtml.replace(/<script>[\s\S]*?<\/script>/, '<!-- JS is bundled by Webpack -->');

  const containerStyles = [' active', '', '', '', '', ''];

  for (let i = 0; i < 6; i++) {
    const startStr = '<div class="slide' + containerStyles[i] + '" id="slide-' + i + '">';
    const startIndex = currentHtml.indexOf(startStr);

    let nextStr = '<div class="slide';
    let endIndex = -1;
    if (i < 5) {
      endIndex = currentHtml.indexOf('<div class="slide', startIndex + 5);
    } else {
      endIndex = currentHtml.indexOf('<!-- JS is bundled by Webpack -->');
      if (endIndex === -1) endIndex = currentHtml.indexOf('</body>');
    }

    if (startIndex !== -1 && endIndex !== -1) {
      const slideContent = currentHtml.substring(startIndex, endIndex).trim();
      fs.writeFileSync('views/slide-' + i + '.html', slideContent);
      currentHtml = currentHtml.replace(slideContent, '<%= require(\'./views/slide-' + i + '.html\') %>');
    }
  }

  fs.writeFileSync('index.html', currentHtml);
  console.log('Project successfully structured!');
} catch (e) {
  console.error(e);
}
