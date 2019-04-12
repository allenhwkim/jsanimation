import {MyClass} from './my-class';

describe('hce-loading', () => {
  beforeEach(async done => {
    done();
  });

  it('should say hello world', async done => {
    const myClass = new MyClass();

    expect(myClass.helloWorld()).toBe('Hello World');
    done();
  });

  afterEach(async () => {
  });
});
