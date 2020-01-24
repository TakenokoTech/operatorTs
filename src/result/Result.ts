type Optional<T> = T | null;
type ResultType<T> = Loading | Success<T> | Failure;

type Loading = {
    type: "Loading";
};

type Success<T> = {
    type: "Success";
    value: Optional<T>;
};

type Failure = {
    type: "Failure";
    error: string;
};

class Result<T> {
    promise: Promise<ResultType<T>> = Promise.resolve({ type: "Loading" });
    onLoadingSet = new Set<() => void>([]);
    onSuccessSet = new Set<(value: Optional<T>) => void>([]);
    onFailureSet = new Set<(error: string) => void>([]);

    value: ResultType<T> = {
        type: "Loading",
    };

    loading(): Result<T> {
        this.value = {
            type: "Loading",
        };
        this.onLoadingSet.forEach(action => action());
        return this;
    }

    success(value: Optional<T>): Result<T> {
        this.value = {
            type: "Success",
            value: value,
        };
        this.onSuccessSet.forEach(action => action(value));
        return this;
    }

    failure(error: string): Result<T> {
        this.value = {
            type: "Failure",
            error: error,
        };
        this.onFailureSet.forEach(action => action(error));
        return this;
    }

    onLoading(action: () => void): Result<T> {
        if (this.value.type == "Loading") action();
        this.onLoadingSet.add(action);
        return this;
    }

    onSuccess(action: (value: Optional<T>) => void): Result<T> {
        if (this.value.type == "Success") action(this.value.value);
        this.onSuccessSet.add(action);
        return this;
    }

    onFailure(action: (error: string) => void): Result<T> {
        if (this.value.type == "Failure") action(this.value.error);
        this.onFailureSet.add(action);
        return this;
    }
}

export { Result };
