var Sequelize = require('sequelize');

// create a sequelize instance with our local sqlite3 database information.
var sequelize = new Sequelize('sqlite://db.sqlite');

// setup Post model and its fields.
var Post = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('posts table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export Post model for use in other files.
module.exports = Post;