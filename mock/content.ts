interface HMRHelper {
    watch(file: string): void
    watchDir(dir: string): void
    update(): void
}

interface CollectionContext {
    hmr: HMRHelper
    isDev: boolean
    computed<P extends unknown[], V>(fn: (...params: P) => V): (...params: P) => V
}

interface CollectionOptions<Data> {
    scan(ctx: CollectionContext): Data[] | Promise<Data[]>
}

export function defineCollection<Data>(options: CollectionOptions<Data>) {

    return {
        async get(): Promise<Data[]> {
            return options.scan({
                hmr: {
                    update() {

                    },
                    watchDir(dir) {

                    },
                    watch(file) {

                    },
                },
                computed(fn) {
                    return fn
                },
                isDev: true
            })
        }
    }
}