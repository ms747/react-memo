import React, {Component} from 'react';
import './addmemo.css';
import Memo from '../memo-view/memo';
import config from '../../config/firebaseconfig';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

class Addmemo extends Component{
    constructor(){
        super();
        this.state = {
            memo: '',
            memoList:[],
        }
        firebase.initializeApp(config);
        this.db = firebase.firestore();
        this.dbRef = this.db.collection('memo');
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
                                <div key={item.id} className="memo-list">
                                    <Memo memo_key={item.itr} memo_name={item.memo}/>
                                    <button memo_id={1} onClick={this.deleteMemo.bind(this,item.id)}>
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

    componentDidMount(){
        this.fetechData();
    }

    fetechData(){
        let temparray = [];
        this.dbRef.onSnapshot(snap=>{
            temparray = [];
            snap.forEach(doc=>{
                temparray.push({id:doc.id,memo:doc.data().memo});
            });
            this.setState({memoList:temparray});
        });
        
    }

    handleChange(e){
        this.setState({memo: e.target.value});
     
    }

    handleClick(e){
        if(this.state.memo !== ''){
            this.dbRef.add({memo:this.state.memo}).then(console.log("Entered Memo")).catch("Error inserting Memo");
            this.setState({memo:''});
        }
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.handleClick();
            this.setState({memo:''});   
        }
    }

    deleteMemo(itr,e){
        this.dbRef.doc(itr).delete().then(function() {
            console.log("Memo successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing Memo: ", error);
        });
    }
}

export default Addmemo;