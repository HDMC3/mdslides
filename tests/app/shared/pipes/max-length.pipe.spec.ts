import { MaxLengthPipe } from '../../../../src/app/shared/pipes/max-length.pipe';

describe('MaxLengthPipe', () => {
    it('create an instance', () => {
        const pipe = new MaxLengthPipe();
        expect(pipe).toBeTruthy();
    });
});
