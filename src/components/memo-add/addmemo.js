import React, {Component} from 'react';
import './addmemo.css';
import Memo from '../memo-view/memo';

class Addmemo extends Component{
    constructor(){
        super();
        this.state = {
            memo: 'hi',
            memoList:[],
        }
    }
    
    render(){
        return(
            <div>
                <div className="memoadd">
                    <input type="text" placeholder="Enter memo to be added..." id="memo" value={this.state.memo} onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}>
                    </input>
                    <button onClick={this.handleClick.bind(this)}>Add Memo</button>
                </div>
                <div className="memoview">
                    <ul>
                        {   
                        this.state.memoList.map((item,itr)=> {
                            return(
                                <div key={itr} className="memo-list">
                                    <Memo memo_key={itr} memo_name={item}/>
                                    <button key={itr} onClick={function test(itr){console.log(itr);}}>
                                        X
                                    </button>
                                </div>
                            );
                        })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState({memo: e.target.value});
     
    }

    handleClick(e){
        var arrayvar = this.state.memoList.slice()
        arrayvar.push(this.state.memo)
        this.setState({ memoList: arrayvar })
        console.log(this.state.memoList);
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.handleClick();
            this.setState({memo:''});
        }
    }

    deleteMemo(itr){
        console.log('test');
        console.log(itr);
    }
}

export default Addmemo;