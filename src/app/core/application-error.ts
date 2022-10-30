export class ApplicationError extends Error {
    constructor(message: string, public title?: string) {
        super(message);
    }
}
