const {sequelize,DataTypes} = require('../config/db');
const Role =require('./Role');
const User=sequelize.define('User',
{
    uid:{
        type:DataTypes.INTEGER,
        defaultValue: sequelize.UUID,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:{
                msg:"Mohon masukan email dengan format yang benar"
            }
        }
    },
    emailVerifiedAt:{
        type:DataTypes.DATE
    },
    password:{
        type:DataTypes.STRING
    },
    nisn:{
        type:DataTypes.STRING(30),
    },
    token:{
        type:DataTypes.INTEGER(4)        
    },
    noWa:{
        type:DataTypes.STRING(14),
        allowNull:false
    },
    roleId:{
        type:DataTypes.INTEGER,
        references:{
            model: Role,
            key: 'idRole'
        }
    },
    tokenEpired:{
        type:DataTypes.DATE
    }

},
{
    tableName:'Users',
    timestamps:true,

}
);
Role.hasMany(User,{foreignKey:'roleId'})
User.belongsTo(Role,{foreignKey:'roleId'})

module.exports=User;