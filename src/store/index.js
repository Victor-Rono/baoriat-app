import { store } from 'quasar/wrappers'
import { InjectionKey, Vue } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
 import firebase from "firebase";
 import {db, auth, storage, db2} from "../firebase";
// import t from 'app/dist/electron/UnPackaged/electron-main';
var messagesRef;


function timeNow(){

      var date = new Date;
      var mins = date.getMinutes();
      if(mins < 10){
        mins = "0"+ mins
      }
      var date2 = date.toDateString()+ " "+ date.getHours()+":"+ mins;
      return date2;
}



export default createStore({

  state:{
name: "victor",
myAuth: null,
authId: null,
spinnerTime: 650,
fromFirebase:[],
myUploads:[],
position:0,
darkMode:JSON.parse(localStorage.getItem('darkMode')),
onLine: false,
chats:[],
unread:[],
messages:0,
userChats:[],
chatObject:{}
  },

  mutations:{

    logout(state){
      state.numberz =  x;
    //  console.log(x)
    },

    changePosition(state, pos){
      state.position =  pos;
    //  console.log(pos)
    },

    reduceChat(state,x){
       var newArray = state.unread.filter(item=> item.key != x)
       console.log(state.unread.length)
       console.log(newArray.length)
       state.unread = newArray

    },


    authenticator(state){
      state.myAuth = null;
      window.location.reload();


    },


    setAuth(state, x){
      state.authId = x;

    },
    setData(state, doc){
      state.myAuth = doc;
      this.dispatch("addUser", doc.id)
      this.dispatch("getChats", state.authId)
    },

    setChats(state, x){
     if(x.key != "userId"){
      function upsert(array, element) { // (1)
        const i = array.findIndex(_element => _element.key === element.key);

          if (i > -1) {
            array[i] = element;
          } else {
            array.unshift(element);
          }

       return array;
      }

      function upsert2(array, element) { // (1)
        // var prev = parseInt(JSON.parse(localStorage.getItem('lastVisit')));
        const i = array.findIndex(_element => _element.key === element.key);
       if(element.status == "unread"){
        //  console.log(element)
        if (i > -1) {
          array[i] = element;
        } else {
          array.unshift(element);
          // state.unread.push(element)

        }
       }
       return array;
      }
// console.log(x.date)
upsert(state.chats, x)
upsert2(state.unread, x)
     }
// Vue.set(state.chatObject, x.name)
    },

    setUserChats(state, x){
// state.userChats.push(x)
      function upsert(array, element) { // (1)
        const i = array.findIndex(_element => _element.key === element.key);
        if (i > -1) {
          array[i] = element;
        } else {
          array.push(element);
        }
       return array;
      }
upsert(state.userChats, x)
          },

    updateOnline(state, x){
      state.onLine = x;
    },

    darkMode(state, x){
      state.darkMode = x;
      // cosole.log("DARKMODE::"+ x)
    },

    chatPush(state, x){
      this.unread.push(x)
    },

    // modify(state, doc){

    // },

    modifyArray(state,  doc){

      // var items = state.fromFirebase;
      // var newItems = items.filter(item => item != doc);
      state.fromFirebase =  state.fromFirebase.filter(item => item != doc);
    },

    setPosts(state, doc){
          // state.fromFirebase=[];
      // arr = state.fromFirebase.filter(post => post.id != doc.id);
      // var array = state.fromFirebase;
      function upsert(array, element) { // (1)
        const i = array.findIndex(_element => _element.id === element.id);
        if (i > -1) {
          array[i] = element;
        } else {
          array.unshift(element);
        }
       return array;
      }

      state.fromFirebase = upsert(state.fromFirebase, doc)
      // state.fromFirebase = arr;
    },

    clearChats(state){
state.userChats = [];
// console.group(state.userChats)
    },

    messagesAdd(state){
      state.messages+=1;
    }


  },

  actions:{
      getData({commit}){
        firebase.auth().onAuthStateChanged((x) => {

          // console.log(x)
          if (x) {
            // User is signed in.
            // this.dispatch("getMessages")
            this.user = x.uid;
            this.commit("setAuth", x.uid);
            db.collection('users')
              .where('uid', '==', x.uid)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, ' => ', doc.data());

                  // localStorage.setItem('myAuth', JSON.stringify(doc.data()));
                  commit('setData', doc)
                  commit('updateOnline', true )

                });
              })

              .catch(function (error) {
                // console.log('Error getting documents:', error);
              });


          } else {
            // User is signed out.
            this.user = x;
            commit('updateOnline', false )
          }

        });
      },

      addMessages({commit}){
        commit("messagesAdd")
      },

darkMode({commit}, x){
commit("darkMode", x )
},

chatReduce({commit}, x){
  // console.log(x)
commit("reduceChat", x)
},
      getPosts({commit}){
             db.collection('posts').limit(132).onSnapshot((querySnapshot) => {
    //   // var fromFirebase = [];
       querySnapshot.forEach((doc) => {
        //  this.fromFirebase.unshift(doc);
        commit('setPosts', doc)
    //     // this.fromFirebase.push(doc);
       });
      //  console.log(this.fromFirebase);
     });
      },


deletePost({commit}, doc){


  db.collection('posts')
  .doc(doc.id)
  .delete()
  .then(() => {
    storage.refFromURL(doc.data().imageUrl).delete().
    storage.refFromURL(doc.data().imageUrl2).delete();
    storage.refFromURL(doc.data().imageUrl3).delete();
    storage.refFromURL(doc.data().imageUrl4).delete();
    storage.refFromURL(doc.data().imageUrl5).delete();
    this.message('Post Deleted Successfully', 'check', 'positive');
    // window.location.reload();
  })
  .catch((error) => {});


},

getChats({commit}, x){
// console.log("chats")
  db2.ref("chats/"+ x+"/chats").on('child_added', snapshot =>{
    var chats = snapshot.val();
        var last = Object.keys(chats).length - 1;
        chats.key = snapshot.key;
        chats.name = chats[Object.keys(chats)[0]].recipient;
        chats.username = chats[Object.keys(chats)[0]].username;
        chats.status = chats[Object.keys(chats)[last]].status;

    // console.log(chats.status)
    // console.log(chats[Object.keys(chats)[last]])
    commit("setChats", chats)

  })
},

addUser({commit}, x){
  // var userId = x
  // console.log(x)0
 if(x){
  db2.ref("users/"+ x).set({
    name: `${this.state.myAuth.data().firstName} ${this.state.myAuth.data().surName}`,
  lastVisit: timeNow()
  })
 }
},


getMessages({commit}, userid){

if(this.state.myAuth){
  var userId = this.state.authId;
var x = userid
    // messagesRef = db2.ref("chats/"+ userId+"/chats/"+userid);
    messagesRef = db2.ref("chats/"+ userId+"/chats/"+x);
  messagesRef.on('child_added', snapshot=>{
    var chats = snapshot.val()

    // var userId =
    chats.key = snapshot.key;
    // console.log(chats)
    commit("setUserChats", chats)

  })
}

}
,

pushChat({commit}, x){
  commit("chatPush", x)
},


killChat(){

  if(messagesRef){
    messagesRef.off("child_added")
  }
},


sendMessage({commit}, x){
// console.log();
var user = this.state.authId;
var userName = this.state.myAuth.data().username;
var fullNames = `${this.state.myAuth.data().firstName} ${this.state.myAuth.data().surName}`;
// var receiver = this.state.userChats.key;
if(user){
  // console.log(x.message)
  // console.log(x.time)
var now = Date.now()

  db2.ref("chats/"+x.user+"/chats/"+user).child(now).set(
  {  from:"them",
    message: x.message,
    time:x.time,
    date: parseInt(Date.now()),
    status:"unread",
    username: userName ,
    recipient: fullNames

  }

  )

  db2.ref("chats/"+user+"/chats/"+x.user).child(now).set(
    {  from:"me",
      message: x.message,
      time:x.time,
      date: Date.now(),
      status:"read",
    username: x.username,
    recipient:x.recipient
    }

    )
}
},

      logout({commit}){
          auth.signOut().then(()=>{
            commit("authenticator");
          });

      }

  },

  modules:{

  },

  getters:{
      tasks: (state)=>{
        return state.name
      }
  }



})
