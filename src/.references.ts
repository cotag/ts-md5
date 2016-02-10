
interface FileReaderSync {
    readAsArrayBuffer(blob: Blob): any;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): string;
    readAsText(blob: Blob, encoding?: string): string;
}

declare var FileReaderSync: {
    prototype: FileReaderSync;
    new (): FileReaderSync;
}


interface Promise {}

declare var Promise: {
    prototype: Promise;
    new (callback:any): Promise;
};
