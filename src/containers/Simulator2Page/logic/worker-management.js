let worker = null;

export function terminateWorker() {
    if (worker) {
        worker.terminate();
    }
    worker = null;
}

export function setWorker(newWorker) {
    worker = newWorker;
}

export function runWorker(fun) {
    return new Worker(URL.createObjectURL(new Blob(['('+fun+')()'])));
}