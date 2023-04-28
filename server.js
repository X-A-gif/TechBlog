const express = require('express');
const path = require('path');
const session = require('express-session');
const { strict } = require('assert');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = 3000;

const session = {
    secret: 'secret',
    cookie: {
        maxAge: 60000,
        httpOnly: true,
        secure: false,
        sameSite: strict,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(session));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
});