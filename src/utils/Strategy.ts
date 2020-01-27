interface Strategy<P, Q> {
    execute(param: P): Q;
}

class Context<P, Q> {
    private strategy: Strategy<P, Q>;

    constructor(Clazz: new () => Strategy<P, Q>) {
        this.strategy = new Clazz();
    }

    execute(param: P): Q {
        return this.strategy.execute(param);
    }
}

export { Strategy, Context };
