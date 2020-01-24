type ThrowableOrNull = Throwable | null;
type Optional<T> = T | null;

interface Throwable {
    error: string;
}

class Future<T> {
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

    onSuccess(action: (value: Future<T>) => void): Future<T> {
        if (this.isSuccess) action(this);
        return this;
    }

    onFailure(action: (value: Future<T>) => void): Future<T> {
        if (this.isFailure) action(this);
        return this;
    }

    map<R>(transform: (value: T) => R): Future<R> {
        if (this.isSuccess) {
            return new Future(transform(this.value));
        }
        return new Future(this.value);
    }

    mapCatching<R>(transform: (value: T) => R): Future<R> {
        try {
            return new Future(transform(this.value));
        } catch (error) {
            return new Future({ error: error.name });
        }
    }

    toString(): string {
        if (this.isFailure) return `Failure(${this.value.error})`;
        return `Success(${this.value})`;
    }
}

const FutureSuccess = <R>(value: Optional<any> = null): Future<R> => new Future(value);
const FutureFailure = <R>(error: string): Future<R> => new Future({ error: error });

export { Future, FutureSuccess, FutureFailure };
