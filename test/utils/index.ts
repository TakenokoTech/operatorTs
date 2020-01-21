const assertError = async (block: Promise<any>) => {
    try {
        const a = await block;
        return null;
    } catch (error) {
        return error;
    }
};

export { assertError };
