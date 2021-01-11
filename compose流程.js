function compose (...fns) {
  return fns.reduce(
    (l, r) =>
      function (...argv) {
        return r.call(this, l.apply(this, argv)) //
      }
  )
}
function a (cb) {
  return function a2 (argv) {
    cb(argv)
  }
}
function b (a2) {
  return function b2 (argv) {
    a2(argv)
  }
}
function c (b2) {
  return function c2 (argv) {
    b2(argv)
  }
}
function cb () {}
const argv = 1
compose(a, b, c)(cb)(argv)
/*  // 传入函数参数生成组合函数->调用组合函数
    // -> 先执行a-b-c组合函数，并将参数1传入-> a-b-c组合函数运行时
    // -> 先执行a-b函数，并将参数1传入-> a-b组合函数运行时
    // -> 先执行a函数,并将参数1传入-> a函数运行时生成新的函数
    // -> a生成的a2函数,并将a2传入b函数执行（a2作为回调）->生成新的b2函数
    // -> 将生成的b2函数作为a-b组合函数的返回值
    // -> 将b2函数传入c函数执行（则b2作为回调）->生成新的c2函数
    // -> 将生成的c2函数作为a-b-c组合函数的返回值->返回全新函数
    // --------------------------------------------------------->
    // -> 新函数再次执行时，传入参数2
    // -> 则执行顺序为  c2->b2->a2
    // -> 各个函数中，均可拿到参数2
    // -> c2中能拿到b2函数（回调函数）,并决定是否执行
    // -> b2中能拿到a2函数（回调函数）,并决定是否执行
    // -> a2中能拿到参数1
    function compose_ (a, b, c) {
      // 生成 a-b 的组合函数
      function a_b (...cb) {
        // 执行a
        const a2 = a(...cb)
        // 执行b
        const b2 = b(a2)
        return b2
      }
      // 生成 a-b-c 的组合函数 并返回
      return function a-b-c (...cb) {
        // 执行a-b组合函数
        const a_b2 = a_b(...cb)
        // 执行c
        const c2 = c(a_b2)
        return c2
      }
    }
    const a_b_c = compose_(a,b,c)
    // 执行 a_b_c 并传入参数
    a_b_c(function (){})
*/
/**
  *  第-次执行流程  -> const c1 = compose(fns) ->返回新函数 ->函数签名  function(argv1:any) => function(argv2:any) => any
  *
  *  第二次执行流程 -> const c2 = c1(参数) ->返回新函数c2
  *    const b2 = function (...argv) {
  *                  const a2 = a(...argv)
  *                  return b(a2)
  *              }
  *
  *    const c2 = function (...argv) {
  *                  const b2_cb = b2(...argv)
  *                  return c(b2_cb)
  *              }
  *
  *  第三次执行流程 -> const c3 = c2(参数) -> 返回任意值
  *  c2(参数)-> 向b2传入参数 b2(参数)         ->
  *  b2在第二次流程的时候就已经拿到第一次传入的参数 ->
  *  b2现在拿到第二次传入的删除 ->
  *  a2 同 b2
  */
