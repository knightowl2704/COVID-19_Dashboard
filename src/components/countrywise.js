import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';


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
            console.log(this.state.fetched)
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
        console.log(this.state.data)   

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
                            <div className='card' >
                            <a class="btn btn-primary" data-toggle="collapse" href={href} role="button" aria-expanded="false" aria-controls="collapseExample">
                            {index+1}: {object[value].country}
  </a>
                            <div class="collapse" id={id}>
                            <div class="card card-body">
                            <ul>
                                   
                                   <li>Cases: {object[value].cases}</li>  
                                   <li>Deaths: {object[value].deaths}</li>  
                                   <li>Active: {object[value].active}</li>  
                                   <li>Critical: {object[value].critical}</li>  
                                   <li>Cases Today: {object[value].todayCases}</li>  
                                   <li>Deaths Today: {object[value].todayDeaths}</li>  
                                   <li>Recovered: {object[value].recovered}</li>  
                                   <li>Cases Per One Million: {object[value].casesPerOneMillion}</li>  
                                   
                            </ul> 
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
                    <p>
                        COVID-19 countrywise statistics.
                    </p>

                </div>
            )
        }     
        
    }
}

export default countrywise;