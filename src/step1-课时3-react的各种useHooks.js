import logo from './logo.svg';
import img1 from './assets/images/1C79C6C9-4BDE-48D7-9720-F4C1506A86DC.jpeg';
import './App.css';
import {useState,useRef} from "react";
import {useCallbackState1} from "./useSyncState";

function App() {
  /**
    * 1. useRef，引用一个不需要渲染的值，地址 图片 常量等等
    * 2. useImperativeHandle 用来配合useRef使用，子组件内部暴露出给父组件使用的属性或方法（句柄）
    * 3. useEffect === 
    *   a. 如果有明确了依赖项，类似于vue中的watch;
    *   b.没有依赖项时作为组件更新渲染的副作用，每次组件更新一次而执行一次(相当于生命周期create，这点没有查过);
    *   c. 如果设置空的依赖项 [] ，则它仅在 初始渲染后 运行，只执行一次,
    * 4. useMemo 相当于vue的computed，用于缓存不常修改的/计算量大的变量
    * 5. useCallback 用于缓存不需要在多次渲染中变化的函数（应用场景，由于react的渲染机制，父组件更新渲染会导致子组件的更新渲染）
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

  let [faStatus,setFaStatus] = useState(0)
  let prevCount = useRef(0)
  function clickHandle() {
    prevCount.current = faStatus
    setFaStatus(++faStatus)
  }
  return (
    <>
      <h2>
       最新计数值 {faStatus}
      </h2>
      <h2>
      上一次计数值 {prevCount.current}
      </h2>
      <button onClick={clickHandle} >这是一个原生按钮</button>
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
