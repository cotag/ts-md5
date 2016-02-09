export declare class Md5 {
    private static stateIdentity;
    private static buffer32Identity;
    private static hexChars;
    private static hexOut;
    private static onePassHasher;
    private _dataLength;
    private _bufferLength;
    private _state;
    private _buffer;
    private _buffer8;
    private _buffer32;
    static hashStr(str: string, raw?: boolean): Int32Array | string;
    static hashAsciiStr(str: string, raw?: boolean): Int32Array | string;
    constructor();
    start(): this;
    appendStr(str: string): this;
    appendAsciiStr(str: string): this;
    appendByteArray(input: Uint8Array): this;
    getState(): {
        buffer: any;
        buflen: number;
        length: number;
        state: number[];
    };
    setState(state: any): void;
    end(raw?: boolean): Int32Array | string;
    private static _hex(x);
    private static _md5cycle(x, k);
}
