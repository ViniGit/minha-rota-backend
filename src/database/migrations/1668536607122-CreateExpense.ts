import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateExpense1668536607122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "expense",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "value",
                        type: "real"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "route_id",
                        type: "uuid"
                    },
                    {
                        name: "type",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "inactive",
                        type: "boolean"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"

                    },
                    {
                        name: "FKRoute",
                        referencedTableName: "route",
                        referencedColumnNames: ["id"],
                        columnNames: ["route_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"

                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("expense")
    }

}
