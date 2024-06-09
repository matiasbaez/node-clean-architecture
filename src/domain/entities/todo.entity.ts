export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null,
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }) {
    const { id, text, completedAt } = object;

    if (!id) throw new Error("Id field cannot be empty");
    if (!text) throw new Error("Text field cannot be empty");

    let formattedCompletedAt;
    if (completedAt) {
      formattedCompletedAt = new Date(completedAt);
      if (isNaN(formattedCompletedAt.getTime())) {
        throw new Error("Incorrect data format in the 'completedAt' field");
      }
    }

    return new TodoEntity(id, text, formattedCompletedAt);
  }
}
