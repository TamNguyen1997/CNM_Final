const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const exphbs_section = require('express-handlebars-sections');
const path = require('path');

const CONFIG = require("./config/config.json");

const userClient = require("./controllers/client/user-controller");

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

app.use('/user', userClient);

app.listen(CONFIG.APP.PORT, () => {
    console.log('server running on port 3000');
});