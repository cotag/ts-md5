/// <reference path="../typings/main.d.ts" />
import {Md5} from './md5';


describe('hashing things', () => {
    var md5: Md5,
        stringToArray = function(str: string) {
            var length = str.length,
                buff = new ArrayBuffer(length),
                arr = new Uint8Array(buff),
                i;

            for (i = 0; i < length; i += 1) {
                arr[i] = str.charCodeAt(i);
            }

            return arr;
        };
    
    beforeEach(() => {
        md5 = new Md5();
    });


    it('should pass the self test', () => {
        expect(Md5.hashStr('hello')).toEqual('5d41402abc4b2a76b9719d911017c592');
    });

    it('should hash a 64 byte string', () => {
        var str = '5d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c592',
            expectedResult = 'e0b153045b08d59d4e18a98ab823ac42',
            arr = stringToArray(str);

        expect(
            md5.appendByteArray(arr).end()
        ).toEqual(expectedResult);

        expect(Md5.hashStr(str)).toEqual(expectedResult);
    });

    it('should hash a 128 byte string', () => {
        var str = '5d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c592',
            expectedResult = 'b12bc24f5507eba4ee27092f70148415',
            arr = stringToArray(str);

        expect(
            md5.appendByteArray(arr).end()
        ).toEqual(expectedResult);

        expect(Md5.hashStr(str)).toEqual(expectedResult);
    });

    it('should hash a 160 byte string', () => {
        var str = '5d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a765d41402abc4b2a76b9719d911017c5925d41402abc4b2a76b9719d911017c5925d41402abc4b2a76',
            expectedResult = '66a1e6b119bf30ade63378f770e52549',
            arr = stringToArray(str);

        expect(
            md5.appendByteArray(arr).end()
        ).toEqual(expectedResult);

        expect(Md5.hashStr(str)).toEqual(expectedResult);
    });

    it('should work incrementally', () => {
        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456a234');
        expect(md5.end()).toEqual('014d4bbb02c66c98249114dc674a7187');

        md5.start(); // reset
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456'));
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456'));
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456a234'));
        expect(md5.end()).toEqual('014d4bbb02c66c98249114dc674a7187');

        md5.start();
        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a4214565d41402abc4b2a4214565d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456');
        expect(md5.end()).toEqual('45762198a57a35c8523915898fb8c68c');

        md5.start();
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456'));
        md5.appendByteArray(stringToArray('5d41402abc4b2a4214565d41402abc4b2a4214565d41402abc4b2a421456'));
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456'));
        expect(md5.end()).toEqual('45762198a57a35c8523915898fb8c68c');
    });

    it('should be resumable', () => {
        var result,
            state;

        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456a234');
        result = md5.end();

        // AppendStr
        md5.start();
        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456');
        md5.appendStr('5d41402abc4b2a421456');
        state = md5.getState();

        md5 = new Md5();
        md5.setState(state);
        md5.appendStr('5d41402abc4b2a421456a234');
        expect(md5.end()).toEqual(result);

        // Append Byte Array
        md5.start();
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456'));
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456'));
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456'));
        state = md5.getState();

        md5 = new Md5();
        md5.setState(state);
        md5.appendByteArray(stringToArray('5d41402abc4b2a421456a234'));
        expect(md5.end()).toEqual(result);
    });

    it('can handle UTF8 strings', () => {
        var str = 'räksmörgås',
            arr = stringToArray(str);

        expect(
            md5.appendByteArray(arr).end()
        ).toEqual('09d9d71ec8a8e3bc74e51ebd587154f3');
        expect(Md5.hashAsciiStr(str)).toEqual('09d9d71ec8a8e3bc74e51ebd587154f3');

        expect(Md5.hashStr(str)).toEqual('e462805dcf84413d5eddca45a4b88a5e');


        str = '\u30b9\u3092\u98df';
        arr = stringToArray(str);

        md5 = new Md5();
        expect(
            md5.appendByteArray(arr).end()
        ).toEqual('4664c02a4cf6b69392f8309b6d6256f5');
        expect(Md5.hashAsciiStr(str)).toEqual('4664c02a4cf6b69392f8309b6d6256f5');

        expect(Md5.hashStr(str)).toEqual('453931ab48a4a5af69f3da3c21064fc9');
    });
});
