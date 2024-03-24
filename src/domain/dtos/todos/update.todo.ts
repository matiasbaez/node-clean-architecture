
export class UpdateTodoDto {

    private constructor (
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create( props: { [key: string]: any } ): [string?,  UpdateTodoDto?] {

        const { id, text, completedAt } = props;

        if (!id || isNaN(id)) return ['Invalid or missing ID'];

        if (completedAt) {
            if (new Date(completedAt).toString() === 'Invalid Date') return ['"completedAt" must be a valid date', undefined];
        }

        return [undefined, new UpdateTodoDto(id, text, completedAt)];
    }

}
