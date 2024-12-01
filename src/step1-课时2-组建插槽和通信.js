import logo from './logo.svg';
import img1 from './assets/images/1C79C6C9-4BDE-48D7-9720-F4C1506A86DC.jpeg';
import './App.css';
import {useState} from "react";
import {useCallbackState1} from "./useSyncState";

function App() {
  /**
   * 组建通信，
   * 1. jsx中设置原声dom标签属性时class需要换成className，其他应该都一样
   * 2. 可以用插值+展开运算符批量给标签或者组件设置属性， 注意 ⚠️⚠️⚠️⚠️⚠️ 此处的写法不是js中的展开运算符，只算是jsx的一种功能支持
   *    功能类似，但实际不是一个东西，js展开运算符是需要容器接收的
   * 3. 向组件中传递prop在react的函数式写法中，就是向函数传入参，函数组件中用入参props接收，通常使用结构的方式只获取用到的
   * 4. ***在组件中传入jsx————vue中插槽的用法*** 
   *    a. 默认的插槽就是直接向闭合标签中放jsx，子组件中用props的children属性接收
   *    b. 具名插槽的实现——将组件或者一段jsx传入子组件的某个属性，子组件中同样在props对应属性接收
   * 5. 子组件中如何修改父组件的状态？父组件传入对应函数，函数中根据子组件传入数据修改即可
   * 6. 如果组件中需要同时向很多子组件和子组件的子组件传参怎么办？
   *  a. createContext 和 useContext 能（复杂的）解决这个问题  ***!!重要‼️***
   *  b. https://zh-hans.react.dev/reference/react/createContext#importing-and-exporting-context-from-a-file
   *  c. https://zh-hans.react.dev/reference/react/useContext#updating-data-passed-via-context
   */


  // 
  const title = '这是一个标题'
  const liList = [
    // 这种写法缺点就是没有key属性，会报错也可能会有未知问题
   <li>'标签1'</li>,
   <li>'标签2'</li>,
   <li>'标签3'</li>,

  ]
  const liListData = [
   {name: '标签1'},
   {name: '标签2'},
   {name: '标签3'},
  ]

  const [faStatus,setFaStatus] = useState(false)
  function clickHandle(status) {
    setFaStatus(status)
  }
  return (
    <>
      <ImgComponent title={title} />
      {/* 4-a 4-b */}
      <DefaultSlotFunc >
              {liListData.map((item,index)=>(
                <li key={index} >{item.name}</li>
              ))}
      </DefaultSlotFunc>
      {/* <DefaultSlotFunc >
              {liList.map((item,index)=>item)}
      </DefaultSlotFunc> */}
      {/* 5 */}
      <div className="btn-status">{faStatus?'展示':'隐藏'}</div>
      <DetailCom
        onActive={clickHandle}
      ></DetailCom>
    </>
  )
}

function DetailCom({onActive}) {
  const [status,setStatus] =useState(false) 
  function childClickHandle(params) {
    setStatus(!status)
    onActive(!status)
  }
  return (
    <>
      <button onClick={childClickHandle} >按钮</button>
      <p
        style={
          {display:status?'block':'none'}
        }
      >
        DETAIL的内容显示了
      </p>
    </>
  )
}

function DefaultSlotFunc({children}) {
  return (
    <ul>
      {children}
    </ul>
  )
}

function ImgComponent({title}) {
  const imgFlag = false
  const imgStyleObj = {
    backgroundColor: 'red',
    width:200,
    height:200
  }
  const imgAttrData = {
    className:"App-logo",
    style : {
      backgroundColor: 'red',
      width:400,
      height:400
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* 普通的jsx属性插值写法 */}
        {/* <img 
          src={imgFlag ? logo : img1} 
          alt="logo" 
          className="App-logo" 
          style={
            imgStyleObj
          }
        /> */}
        {/* 用展开语法（类似ES6的） */}
        <img 
          src={imgFlag ? logo : img1} 
          alt="logo" 
          {...imgAttrData}
        />
        <div className="title">{title}</div>
      </header>
    </div>
  );
}
export default App;
