import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';

import fetchdata from './timeseries'

class countrywise extends Component{

    state = {
        data: null,
        fetched: false
    }
    
    fetchingData(){
        let p = new Promise((resolve,reject)=>{

            let data = fetch("https://corona.lmao.ninja/countries")
            .then(data=>data.json())
            .then(data => this.setState({
                data: data,
                fetched:true
            }))
            // console.log(this.state.fetched)
        resolve()
        })

    }



    componentDidMount(){
        let promisefetchdata = new Promise((resolve,reject)=>{
            this.fetchingData()
            resolve()  
        })
    }
    

    render(){
        // console.log(this.state.data)   

        if (this.state.fetched == true){
            let object = this.state.data    

        return(
            <div className="countrywise-stats">
                <p className='display-4'>Countrywise Statistics</p>
                <div className='fetched_data_countrywise'>
                    {Object.keys(object).map((value,index)=>{
                        var url = "https://corona.lmao.ninja/countries/"+String(object[value].country)
                        var id = "collapseExample"+String(index+1)
                        var href = '#collapseExample'+String(index+1)
                        return(
                            <div className='col'>
                                <div className='card' >
                            <a class="btn btn-primary" data-toggle="collapse" href={href} role="button" aria-expanded="false" aria-controls="collapseExample">
                            {index+1}: {object[value].country}
  </a>
                            <div class="collapse" id={id}>
                            <div class="card card-body">
                            <ul className = ''>
                                   
                                   <li className='list-group-item-primary'>Cases: {object[value].cases}</li>  
                                   <li className='list-group-item-danger'>Deaths: {object[value].deaths}</li>  
                                   <li className='list-group-item-primary'>Active: {object[value].active}</li>  
                                   <li className='list-group-item-warning'>Critical: {object[value].critical}</li>  
                                   <li className='list-group-item-dark'>Cases Today: {object[value].todayCases}</li>  
                                   <li className='list-group-item-danger'>Deaths Today: {object[value].todayDeaths}</li>  
                                   <li className='list-group-item-success'>Recovered: {object[value].recovered}</li>  
                                   <li className='list-group-item-primary'>Cases Per One Million: {object[value].casesPerOneMillion}</li>  
                                   
                            </ul> 
                            </div>
                            </div>
                            </div>
                            
                            </div>
                            
                            
                            
                        )
                    })}
                </div>

            </div>
              )
        }
        else{
            return(
                
                <div className="overall-stats">
                    <h1>Countrywise Statistics</h1>
                    
                </div>
            )
        }     
        
    }
}

export default countrywise;