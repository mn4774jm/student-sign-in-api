// when something else uses this file, the function is run and the model is returned
module.exports = (sequelize, DataTypes) => {

    // defining student object
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

// creates tables in database, force:true would overwrite old database tables, returns a promise
    Student.sync({force: false}).then( () => {
        console.log('synced student table')
    })

    return Student
}