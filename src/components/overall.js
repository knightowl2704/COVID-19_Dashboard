import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';

var Chart = require("chart.js");

class overall extends Component{

    state = {
        cases : 0,
        deaths: 0,
        recovered : 0
    }

    
    fetchingData(){
        let p = new Promise((resolve,reject)=>{

            fetch("https://corona.lmao.ninja/all")
            .then(data=>data.json())
            .then(data => this.setState({
                    cases: data.cases,
                    deaths: data.deaths,
                    recovered: data.recovered
        })).then(console.log(this.state.deaths))
        
        resolve()
    })
    }

    
    componentDidMount(){
        let promisefetchdata = new Promise((resolve,reject)=>{
            this.fetchingData()
            resolve()  
        })

    }
    
    chart() {
        const node = this.node;

        var myChart = new Chart(node, {
        type: "bar",
        data: {
            labels: ["Cases", "Deaths", "Recovered"],
            datasets: [
            {
                label: "Statistics",
                data: [this.state.cases, this.state.deaths, this.state.recovered],
                backgroundColor: [
                "rgba(138, 43, 226,0.8)",
                "rgba(229,57,53 ,0.8)",
                "rgba(76,175,80,0.8)"
                ]
            }
            ]
        }
        });
        
        
    }
    

    render(){
        console.log(this.state.deaths)  
        if(this.state.deaths != 0){
            this.chart()
        }
        
        return(
            <div className="overall-stats">
                <p className='display-4'>Overall Statistics</p>
                <div className='fetched_data'>
                
                    <div className='row'>
                        <div className='col-sm'>
                            <canvas
                            style={{ width: 100, height: 25 }}
                            ref={node => (this.node = node)}
                            />

                        </div>
                        <div className='col-sm' id='overall_id'>
                        <li className='row justify-content-center badge-pill badge-primary'>Cases: {this.state.cases}</li>
                        <br></br>
                        <li className='row justify-content-center badge-pill badge-danger'>Deaths: {this.state.deaths}</li>
                        <br></br>
                        <li className='row justify-content-center badge-pill badge-success'>Recovered: {this.state.recovered}</li>
                        <br></br>
                        </div>
                        

                        
                    </div>
                    
                </div>

            </div>
              )
    }
}

export default overall;