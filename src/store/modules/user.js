import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  userId: "",
  webStatus: false
};

// 定义mutation
// 更改state中属性值的唯一方法是使用并提交mutation。
// 首先需要先定义一个或一些mutation，把他们全部放在mutations里， 然后再在其他地方提交这些mutation。
const mutations = {
  // 第一个mutation
  // SET_TOKEN: mutation的名字（一般用大写）。
  // (state, token): mutation的匿名函数，用来对state中的属性值进行更改。这个匿名函数的第一个参数永远是
  // state对象，其他的参数就是在其他地方提交mutation时，额外传递给mutation的参数
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 第二个mutation
  SET_NAME: (state, name) => {
    state.name = name;
  },
  // 第三个mutation
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId.datas.userid;
  },
  SET_WEB_STATUS: (state, status) => {
    console.log(status, "sssssssssssssss");
    if (status.status == "client connected") {
      state.webStatus = true;
    } else {
      state.webStatus = false;
    }
  }
};

// 定义actions
// 首先需要先定义一个或一些action，把他们全部放在actions里， 然后再在其他地方触发这些action。
const actions = {
  // action用于触发mutation，而不是直接变更状态。
  // action 可以包含任意异步操作，mutation却是同步操作，因为无法将mutation改为异步操作，所以必须用action。

  // 正常的action函数：
  // actionLogin(context){
  //   context.commit('login')
  // }
  // action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
  // 因此你可以调用 context.commit 触发一个 mutation，或者通过 context.state 和 context.getters
  // 来获取 state 和 getters。但是，context 对象不是 store 实例本身，它是store的复制品。
  // 在实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候，

  // 将正常的action函数解构为下边这样：
  // actionLogin({ commit }) {
  //   commit('login')
  // }

  // 触发action示例：
  // const store = new Vuex.Store({
  //   state: {
  //     count: 0
  //   },
  //   mutations: {
  //     increment (state) {
  //       state.count++
  //     }
  //   },
  //   actions: {
  //     increment (context) {
  //       context.commit('increment')
  //     }
  //   }
  // })
  // store.dispatch('increment')

  // 第一个action
  // user login
  login({ commit }, userInfo) {
    // userInfo: 是dispatch 传过来的数据
    // store.dispatch({type：'login'，usserinfo：userInfo}) 给actions传数据
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          console.log(response);
          const data = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 第二个action
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const data = response;
          console.log(data);
          if (!data) {
            reject("Verification failed, please Login again.");
          }

          // const { name, avatar } = data;
          // console.log(name, avatar);

          commit("SET_NAME", data.name);
          commit("SET_AVATAR", data.avatar);
          resolve(data); //resolve的意思就是：我们期望Promise返回的数据，类似于return
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 第三个action
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 第四个action
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },

  changeUserId({ commit }, userId) {
    return new Promise(resolve => {
      commit("SET_USER_ID", userId);
    });
  },

  changeStatus({ commit }, status) {
    return new Promise(resolve => {
      commit("SET_WEB_STATUS", status);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
