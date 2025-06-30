import { Table, PrimaryKey, Column, DataType, Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

@Table({
    tableName: "users-proifle",
    timestamps: true
})

class UsersProfile extends Model<InferAttributes<UsersProfile>,InferCreationAttributes<UsersProfile>>{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id!: CreationOptional<string>
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    user_id!: string
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name!: string
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name!: string
    @Column({
        type: DataType.STRING,
        defaultValue: 'attendee',
        allowNull: false
    })
    role!: CreationOptional<string>
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone_number!: string 
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    bio!: string 
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'pending'
    })
    status!: CreationOptional<string>
}

export { UsersProfile };