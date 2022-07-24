import { Task } from "@/core/entities";
import Table from "easy-table";

export class UserInterface {
  private readonly table: Table;
  constructor(table: Table) {
    this.table = table;
  }

  public list(body: Task[]) {
    const headers = [, "", "", "status", "priority"];
    body.forEach((task) => {
      this.table.cell("id", task.id);
      this.table.cell("description", task.description);
      this.table.cell("age", task.age);
      this.table.cell("priority", task.priority);
      this.table.newRow();
    });

    return this.table.toString();
  }
  public notification() {}
}
