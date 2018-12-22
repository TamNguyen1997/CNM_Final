var express = require('express');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
var exphbs_section = require('express-handlebars-sections');
var path = require('path');

const app = express();
app.engine('hbs', exphbs({
    defaultLayout: 'main',

    layoutsDir: 'views/_layouts/',
    helpers: {
        section: exphbs_section()
    }
}));

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.listen(3000, () => {
    console.log('server running on port 3000');
});