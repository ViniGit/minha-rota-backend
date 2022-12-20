import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTravel1670544026036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "travel",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "date",
                        type: "timestamp"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "vehicle_id",
                        type: "uuid"
                    },
                    {
                        name: "route_id",
                        type: "uuid"
                    },
                    {
                        name: "travels",
                        type: "int"
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

                    },
                    {
                        name: "FKVehicle",
                        referencedTableName: "vehicle",
                        referencedColumnNames: ["id"],
                        columnNames: ["vehicle_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"

                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("travel")
    }

}
