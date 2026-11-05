import React, { Component } from 'react';
import './LifecycleComponents.css';

export class Timer extends Component {
  state={seconds:0,running:false};
  componentDidMount(){this.interval=setInterval(()=>{if(this.state.running)this.setState(({seconds})=>({seconds:seconds+1}));},1000);}
  componentWillUnmount(){clearInterval(this.interval);}
  render(){return <div className="component-demo"><h3>Секундомер (жизненный цикл)</h3><div className="counter">{this.state.seconds} сек.</div>
    <button onClick={()=>this.setState({running:true})}>Старт</button><button className="secondary" onClick={()=>this.setState({running:false})}>Стоп</button><button className="danger" onClick={()=>this.setState({seconds:0,running:false})}>Сброс</button></div>;}
}
export class WindowSizeTracker extends Component {
  state={width:window.innerWidth,height:window.innerHeight};
  componentDidMount(){window.addEventListener('resize',this.update);}
  componentWillUnmount(){window.removeEventListener('resize',this.update);}
  update=()=>this.setState({width:window.innerWidth,height:window.innerHeight});
  render(){return <div className="component-demo"><h3>Размер окна браузера</h3><p>{this.state.width} × {this.state.height} px</p></div>;}
}
export class DataFetcher extends Component {
  state={data:null,loading:false,error:''};
  componentDidMount(){this.load();}
  componentDidUpdate(prevProps){if(prevProps.url!==this.props.url)this.load();}
  load=async()=>{this.setState({loading:true,error:''});try{const r=await fetch(this.props.url);if(!r.ok)throw new Error('Ошибка HTTP: '+r.status);const data=await r.json();this.setState({data,loading:false});}catch(e){this.setState({error:e.message,loading:false});}};
  render(){return <div className="component-demo"><h3>Загрузка данных с API</h3>{this.state.loading&&<p>Загрузка...</p>}{this.state.error&&<p className="error-text">{this.state.error}</p>}{this.state.data&&<pre>{JSON.stringify(this.state.data,null,2)}</pre>}</div>;}
}
export default function LifecycleComponents(){return <section className="task-section"><h2>Часть 4. Жизненный цикл</h2><Timer/><WindowSizeTracker/><DataFetcher url="https://jsonplaceholder.typicode.com/todos/1"/></section>;}
