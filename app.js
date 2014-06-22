var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);
app.use(flatiron.plugins.static, { dir: __dirname+'/public' });

// app.router.get('/headers', function () {
//   this.res.json(this.req.headers);
// });

app.router.get('/hello', function () {
  this.res.json({ 'hello': 'world' ,'dir' : __dirname })
});

app.start(3000);
