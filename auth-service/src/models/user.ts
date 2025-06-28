import { DataType, Model, Column, Table, PrimaryKey, HasMany } from "sequelize-typescript";
import { RefreshToken } from "./refresh-token";

@Table({
    tableName: "users",
    timestamps: true,
})
class Users extends Model<Users>{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id!:string;
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
    @HasMany(()=>RefreshToken, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    refreshToken!: RefreshToken[]
}

export { Users };