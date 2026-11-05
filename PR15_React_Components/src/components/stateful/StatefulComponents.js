import React, { Component } from 'react';
import './StatefulComponents.css';

export class Counter extends Component {
  state = { count: 0 };
  render() { return <div className="component-demo"><h3>Классовый Counter</h3><div className="counter">{this.state.count}</div>
    <button onClick={()=>this.setState(({count})=>({count:count+1}))}>Увеличить</button>
    <button className="secondary" onClick={()=>this.setState(({count})=>({count:count-1}))}>Уменьшить</button></div>; }
}
export class LoginForm extends Component {
  state = {email:'',password:'',error:'',message:''};
  submit = e => { e.preventDefault(); const {email,password}=this.state;
    if(!/^\S+@\S+\.\S+$/.test(email)) return this.setState({error:'Введите корректный email',message:''});
    if(password.length<6) return this.setState({error:'Пароль должен содержать минимум 6 символов',message:''});
    this.setState({error:'',message:'Форма успешно проверена (демо)'});
  };
  render(){return <form className="component-demo" onSubmit={this.submit}><h3>Форма входа</h3>
    <input aria-label="Email" placeholder="Email" value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/>
    <input aria-label="Пароль" type="password" placeholder="Пароль" value={this.state.password} onChange={e=>this.setState({password:e.target.value})}/>
    <button>Отправить</button>{this.state.error&&<p className="error-text">{this.state.error}</p>}{this.state.message&&<p className="success-text">{this.state.message}</p>}
  </form>;}
}
export class ColorPicker extends Component {
  state={color:'#3498db'};
  render(){return <div className="component-demo"><h3>Выбор цвета</h3><select value={this.state.color} onChange={e=>this.setState({color:e.target.value})}>
    <option value="#3498db">Синий</option><option value="#e74c3c">Красный</option><option value="#2ecc71">Зелёный</option><option value="#9b59b6">Фиолетовый</option></select>
    <div className="color-preview" style={{background:this.state.color}}/><p>Выбранный цвет: {this.state.color}</p></div>;}
}
export class TodoList extends Component {
  state={items:[],text:''};
  add=()=>{const text=this.state.text.trim();if(text)this.setState(({items})=>({items:[...items,{id:Date.now(),text,done:false}],text:''}));};
  toggle=id=>this.setState(({items})=>({items:items.map(x=>x.id===id?{...x,done:!x.done}:x)}));
  remove=id=>this.setState(({items})=>({items:items.filter(x=>x.id!==id)}));
  render(){return <div className="component-demo"><h3>Список задач</h3><input placeholder="Новая задача" value={this.state.text} onChange={e=>this.setState({text:e.target.value})}/><button onClick={this.add}>Добавить</button>
    <ul>{this.state.items.map(x=><li key={x.id}><span className={x.done?'todo-done':''} onClick={()=>this.toggle(x.id)}>{x.text}</span> <button className="danger" onClick={()=>this.remove(x.id)}>Удалить</button></li>)}</ul></div>;}
}
export class SearchBox extends Component {
  state={query:''}; data=['React','JavaScript','HTML','CSS','Node.js'];
  render(){const result=this.data.filter(x=>x.toLowerCase().includes(this.state.query.toLowerCase()));return <div className="component-demo"><h3>Поиск</h3><input placeholder="Найти технологию" value={this.state.query} onChange={e=>this.setState({query:e.target.value})}/><button className="secondary" onClick={()=>this.setState({query:''})}>Очистить</button><ul>{result.map(x=><li key={x}>{x}</li>)}</ul></div>;}
}
export default function StatefulComponents(){return <section className="task-section" id="stateful-output-1"><h2>Часть 3. Компоненты с состоянием</h2><Counter/><LoginForm/><ColorPicker/><TodoList/><SearchBox/></section>;}
