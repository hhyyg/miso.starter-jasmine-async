const somethingPromise = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const somethingErrorPromise = (ms) =>
    new Promise((resolve) => {
        throw new Error();
    });

describe("test", () => {
    it("test", async (done) => {
        /*
		DEPRECATION: An asynchronous before/it/after function was defined with the async keyword but also took a done callback. This is not supported and will stop working in the future. Either remove the done callback (recommended) or remove the async keyword. (in spec: test test)
		*/
        await somethingPromise(1000);
        done();
    });

    it("test2", (done) => {
        (async () => {
            await somethingPromise(1000);
            await somethingPromise(1000);
            done();
        })();
    });

    it("test3", async () => {
        await somethingPromise(1000);
        await somethingPromise(1000);
        await expectAsync(somethingPromise(1000)).toBeResolved();
        await expectAsync(somethingErrorPromise(1000)).toBeRejected();
    });
});
