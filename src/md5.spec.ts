/// <reference path="../typings/main.d.ts" />
import {Md5} from './md5';


describe('should hash strings', () => {
    let md5: Md5;
    
    beforeEach(() => {
        md5 = new Md5();
    });


    it('should pass the self test', () => {
        expect(Md5.hashStr('hello')).toEqual('5d41402abc4b2a76b9719d911017c592');
    });
});
