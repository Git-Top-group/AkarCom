'use strict';

const loggerMidleware = require('../src/middleware/logger');



describe ('logger middleware', ()=> {

  let consoleSpy = {};
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(()=>{
    consoleSpy = jest.spyOn(console , 'log').mockImplementation();
  });
  afterEach(()=>{
    consoleSpy.mockRestore();
  });

  it('should log the console.log', ()=> {
      
    // act

    loggerMidleware(req,res,next);

    // assert

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('shoud go to the next middleware',() => {
          
    // act

    loggerMidleware(req,res,next);
    
    // assert

    expect(next).toHaveBeenCalledWith();

  });

});