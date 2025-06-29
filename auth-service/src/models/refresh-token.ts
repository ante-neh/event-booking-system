import { Model, DataType, Column, PrimaryKey, ForeignKey, BelongsTo, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Users } from "./user";

@Table({
    tableName: 'refresh_token',
    timestamps: true
})
class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>>{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id!: CreationOptional<string>;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    token!: string;
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false
    })
    is_revoked!: CreationOptional<boolean>;
    @ForeignKey(() =>Users)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    user_id!: string
    @BelongsTo(()=>Users)
    users!: CreationOptional<Users>
}

export { RefreshToken }