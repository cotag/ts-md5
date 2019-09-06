export interface WorkerOptions {
    credentials?: 'omit' | 'same-origin' | 'include';
    name?: string;
    type?: 'classic' | 'module';
}
export declare class ParallelHasher {
    private _queue;
    private _hashWorker;
    private _processing;
    private _ready;
    constructor(workerUri: string, workerOptions?: WorkerOptions);
    hash(blob: any): any;
    terminate(): void;
    private _processNext;
    private _recievedMessage;
}
