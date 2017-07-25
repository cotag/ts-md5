import {Md5FileHasher} from './md5_file_hasher';

describe('hashing blobs', () => {
    let hasher: Md5FileHasher,
        largeBlob = '5d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a765d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76';

    it('should hash a small blob', (done) => {
        let str = 'hello',
            blob = new Uint8Array(5),
            i;

        for (i = 0; i < str.length; i += 1) {
            blob[i] = str.charCodeAt(i);
        }

        hasher = new Md5FileHasher((evt) => {
            expect(evt.success).toEqual(true);
            expect(evt.result).toEqual('5d41402abc4b2a76b9719d911017c592');
            done();
        });
        hasher.hash(new Blob([blob]));
    });

    it('should hash a large blob', (done) => {
        let blob = new Uint8Array(largeBlob.length),
            i;

        for (i = 0; i < largeBlob.length; i += 1) {
            blob[i] = largeBlob.charCodeAt(i);
        }

        hasher = new Md5FileHasher((evt) => {
            expect(evt.success).toEqual(true);
            expect(evt.result).toEqual('66a1e6b119bf30ade63378f770e52549');
            done();
        }, true, 16);
        hasher.hash(new Blob([blob]));
    });

    it('should hash a large blob that does not divide cleanly', (done) => {
        let blob = new Uint8Array(largeBlob.length),
            i;

        for (i = 0; i < largeBlob.length; i += 1) {
            blob[i] = largeBlob.charCodeAt(i);
        }

        hasher = new Md5FileHasher((evt) => {
            expect(evt.success).toEqual(true);
            expect(evt.result).toEqual('66a1e6b119bf30ade63378f770e52549');
            done();
        }, true, 17);
        hasher.hash(new Blob([blob]));
    });
});
