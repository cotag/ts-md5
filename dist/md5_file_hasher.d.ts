export declare class Md5FileHasher {
    private _callback;
    private _async;
    private _partSize;
    private _reader;
    private _md5;
    private _part;
    private _length;
    private _blob;
    constructor(_callback: any, // Callback to return the result
    _async?: boolean, // Async version is not always available in a web worker
    _partSize?: number);
    hash(blob: any): void;
    private _fail;
    private _hashData;
    private _processPart;
    private _configureReader;
}
