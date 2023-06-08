using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElementApiService.Migrations
{
    /// <inheritdoc />
    public partial class ExtendElement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AtomicNumber",
                table: "Elements",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ImgHref",
                table: "Elements",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AtomicNumber",
                table: "Elements");

            migrationBuilder.DropColumn(
                name: "ImgHref",
                table: "Elements");
        }
    }
}
