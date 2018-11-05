/**
 * 函数处理前执行fn
 * @param fn
 * @returns {Function}
 */
Function.prototype.before = function(fn){
  var self = this;
  return function(){
    fn.call(this);
    self.apply(this, arguments);
  }
};

/**
 * 函数处理后执行fn
 * @param fn
 * @returns {Function}
 */
Function.prototype.after = function(fn){
  var self = this;
  return function(){
    self.apply(this, arguments);
    fn.call(this);
  }
};

function report(){
  console.log('上报数据');
}
function submit(){
  console.log('提交数据');
}
//提交之前执行report
submit.before(report)();