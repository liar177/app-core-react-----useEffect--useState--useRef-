import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {useCallbackState1} from "./useSyncState";
// react有两种组件写法：函数式写法和类组件写法，官方主推函数式写法
// 函数式写法主体用的是一个方法之中，return 组件html 建议用()抱住，并且和vue2一样需要有一个根标签包裹住所有html标签，有多行标签的时候不用括号包住return会识别不到
// 在html中插值的时候如果是放在属性上不用加双引号"",加引号就变成string，
function App() {
  const appContent = '测试一下react插值写法'
  //https://zh-hans.react.dev/reference/react/useState useState的中文语法
  // 通常是用数组解构的形式声明两个从useState返回的函数(俩函数就是这个状态的get && set)
  const [testContent, setTestContent] = useState('这是一个测试的初始值')
  const [flag, setFlag] = useCallbackState1(false)
  const setNameFun = (text1)=>{
    // setFlag(!flag)
    // setTestContent(flag?'flag是true':'flag是false')

    //这个函数期望修改flag之后用修改之后的flag判断testContent该输出的值，但是
    // useState是异步的，此时拿不到flag更新之后的值，需要用 useEffect useRef 弄一个 函数，useEffect监听到flag变化后执行传入的回调就能实现同步
    //https://blog.csdn.net/baidu_39067385/article/details/111411634   && https://segmentfault.com/a/1190000039365818#item-1

    setFlag(!flag,function (callBack_flag) {
      console.log('同步回调执行-flag已经变化',flag,callBack_flag)
      setTestContent(callBack_flag?'flag是true':'flag是false')
    })

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {appContent}
        </p>
        <span onClick={()=> setNameFun('test-传参11')} >{testContent}</span>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
