type Optional<T> = T | null;
type ResultType<T> = Success<T> | Failure;

type Success<T> = {
    type: "Success";
    message: Optional<T>;
};

type Failure = {
    type: "Failure";
    error: string;
};

class Result<T> {
    value: ResultType<T>;

    constructor(value: ResultType<T>) {
        this.value = value;
    }

    get isSuccess(): boolean {
        return this.value.type == "Success";
    }

    get isFailure(): boolean {
        return this.value.type == "Failure";
    }

    getOrNull(): Optional<T> {
        switch (this.value.type) {
            case "Success":
                return this.value.message;
            default:
                return null;
        }
    }

    exceptionOrNull(): Optional<string> {
        switch (this.value.type) {
            case "Failure":
                return this.value.error;
            default:
                return null;
        }
    }

    onSuccess(action: (value: Result<T>) => void): Result<T> {
        if (this.isSuccess) action(this);
        return this;
    }

    onFailure(action: (value: Result<T>) => void): Result<T> {
        if (this.isFailure) action(this);
        return this;
    }

    map<R>(transform: (value: Optional<T>) => R): Result<R> {
        switch (this.value.type) {
            case "Success":
                return new Result({ type: "Success", message: transform(this.value.message) });
            default:
                return new Result({ type: "Failure", error: this.value.error });
        }
    }

    mapCatching<R>(transform: (value: Optional<T>) => R): Result<R> {
        try {
            switch (this.value.type) {
                case "Success":
                    return new Result({ type: "Success", message: transform(this.value.message) });
                default:
                    return new Result({ type: "Failure", error: this.value.error });
            }
        } catch (error) {
            return new Result({ type: "Failure", error: error.name });
        }
    }

    toString(): string {
        switch (this.value.type) {
            case "Success":
                return `Success(${this.value.message})`;
            default:
                return `Failure(${this.value.error})`;
        }
    }
}

const ResultSuccess = <R>(message: Optional<any> = null): Result<R> => new Result({ type: "Success", message });
const ResultFailure = <R>(error: string): Result<R> => new Result({ type: "Failure", error });

export { Result, ResultSuccess, ResultFailure };
