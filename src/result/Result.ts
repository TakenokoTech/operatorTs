type ThrowableOrNull = Throwable | null;
type Optional<T> = T | null;

interface Throwable {
    error: string;
}

class Result<T> {
    value: Optional<any>;

    constructor(value: Optional<any>) {
        this.value = value;
    }

    get isSuccess(): boolean {
        return (this.value as Throwable)?.error == null;
    }

    get isFailure(): boolean {
        return (this.value as Throwable)?.error != null;
    }

    getOrNull(): Optional<T> {
        if (this.isFailure) return null;
        return this.value as T;
    }

    exceptionOrNull(): ThrowableOrNull {
        if (this.isFailure) return this.value as Throwable;
        return null;
    }

    onSuccess(action: (value: Result<T>) => void): Result<T> {
        if (this.isSuccess) action(this);
        return this;
    }

    onFailure(action: (value: Result<T>) => void): Result<T> {
        if (this.isFailure) action(this);
        return this;
    }

    map<R>(transform: (value: T) => R): Result<R> {
        if (this.isSuccess) {
            return new Result(transform(this.value));
        }
        return new Result(this.value);
    }

    mapCatching<R>(transform: (value: T) => R): Result<R> {
        try {
            return new Result(transform(this.value));
        } catch (error) {
            return new Result({ error: error.name });
        }
    }

    toString(): string {
        if (this.isFailure) return `Failure(${this.value.error})`;
        return `Success(${this.value})`;
    }
}

const ResultSuccess = <R>(value: Optional<any> = null): Result<R> => new Result(value);
const ResultFailure = <R>(error: string): Result<R> => new Result({ error: error });

export { Result, ResultSuccess, ResultFailure };
