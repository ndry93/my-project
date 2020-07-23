const app = require('./server/app');


app.listen(app.context.config.PORT, () =>
    console.log(`my-project ${app.context.config.PORT}`)
);