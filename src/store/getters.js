const getters = {
  // state就是用来存放数据，若是对数据进行处理，比如数据要过滤，一般我们可以写到computed中。
  // 但是如果很多组件都使用这个过滤后的数据，比如饼状图组件和曲线图组件，我们可以把这个数据抽提出来共享,
  // 放到getters中。
  // 在getters中对这个数据进行各种计算，这样就避免在多个组件中对一个数据进行多次计算，保证了数据的一致性。
  // 但是，getters是不能修改state中的数据的，所以要实现对state数据的计算，必须新建一个变量，通过匿名函数给这个
  // 变量赋值。
  // 示例：shareValue: state => state.app.someValue
  // shareValue: 在其他组件中要引用的变量名，它的值是匿名函数赋给它的
  // state: 传给匿名函数的state对象
  // state.app.someValue: 匿名函数的返回值
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId
}
export default getters
