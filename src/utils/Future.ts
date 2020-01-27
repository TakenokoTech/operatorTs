type Optional<T> = T | null;
type FutureType<T> = Loading | Success<T> | Failure;

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

class Future<T> {
    promise: Promise<FutureType<T>> = Promise.resolve({ type: "Loading" });
    onLoadingSet = new Set<() => void>([]);
    onSuccessSet = new Set<(value: Optional<T>) => void>([]);
    onFailureSet = new Set<(error: string) => void>([]);

    value: FutureType<T> = {
        type: "Loading",
    };

    loading(): Future<T> {
        this.value = {
            type: "Loading",
        };
        this.onLoadingSet.forEach(action => action());
        return this;
    }

    success(value: Optional<T>): Future<T> {
        this.value = {
            type: "Success",
            value: value,
        };
        this.onSuccessSet.forEach(action => action(value));
        return this;
    }

    failure(error: string): Future<T> {
        this.value = {
            type: "Failure",
            error: error,
        };
        this.onFailureSet.forEach(action => action(error));
        return this;
    }

    onLoading(action: () => void): Future<T> {
        if (this.value.type == "Loading") action();
        this.onLoadingSet.add(action);
        return this;
    }

    onSuccess(action: (value: Optional<T>) => void): Future<T> {
        if (this.value.type == "Success") action(this.value.value);
        this.onSuccessSet.add(action);
        return this;
    }

    onFailure(action: (error: string) => void): Future<T> {
        if (this.value.type == "Failure") action(this.value.error);
        this.onFailureSet.add(action);
        return this;
    }
}

export { Future };
