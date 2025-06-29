import { DataType, Model, Column, Table, PrimaryKey, HasMany } from "sequelize-typescript";
import { RefreshToken } from "./refresh-token";
import { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

@Table({
    tableName: "users",
    timestamps: true,
})
class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>>{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id!:CreationOptional<string>;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!:string;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'attendee'
    })
    role!: string;
    @HasMany(()=>RefreshToken, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    refreshToken!:CreationOptional<RefreshToken[]>
}

export { Users };