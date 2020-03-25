
// resp => Object.keys(resp).map(function(key,value){
//     options.push({name:key,key:key+'i'}

import React, { Component } from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, BarChart,Baseline, Resizable } from "react-timeseries-charts";
import { TimeSeries, TimeRange, Index } from "pondjs";


import Select from 'react-select';

class sdd extends Component {
    
    state = {
        fetched: false,
        fetcheddata : null,
        selectedoption : null,
        countrydata: [],
        initialcount : 0,
        toggle: false
    }
    


    getData(){
        let options = []
        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(resp => Object.keys(resp).map(function(key,value){
                    options.push({label:key,value:key})}))
                    
            .then(resp => this.setState({
                fetched:true,
                fetcheddata:options,
            }))

    }
    
    

    handleChange = (selectedOption)=>{
    
        this.setState({ 
            countrydata: [],
            selectedoption: selectedOption.value,
        toggle:true });
    

    }
    series(){
        const series = new TimeSeries({
            name: "Analysis",
            columns: ["index", "precip"],
            points: this.state.countrydata.map(([d, value]) => [
                Index.getIndexString("1h", new Date(d)),
                value
            ])
        });
        return(series)
    }

    

    

    getCountrydata(){
        // console.log('I am called')
            if(this.state.selectedoption != null && this.state.countrydata.length == 0 ){
                fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                data[this.state.selectedoption].forEach(({ date, confirmed, recovered, deaths }) => 
                    this.setState({countrydata: [...this.state.countrydata, [date,confirmed-recovered-deaths]]})      
                  )
                        
        })
            }
        
        this.setState({toggle:false})
            
        
        
    }



    render() {
        this.getData()
        // console.log('rendercalled')
        if(this.state.toggle == true){
            this.getCountrydata()
        
        }
        if(this.state.countrydata.length != 0){
            this.series()
        }
        // if(this.state.countrydata.length == 0 && this.state.selectedoption != null){
        //     this.getCountrydata()

        // }
        // console.log(this.state)
        if(this.state.fetched && this.state.countrydata.length != 0){
            return(
                <div>
                    <Select options={this.state.fetcheddata} onChange={this.handleChange.bind(this)} />
                    <br></br>
                    <div className="card card-body">
                    <div>
                    <div className="row">
                    <div className="col">
                        <Resizable>
                            <ChartContainer timeRange={this.series().range()}>
                                <ChartRow height="400">
                                    <YAxis
                                        id="rain"
                                        label="Cases"
                                        min = {this.series().min('precip')}
                                        max = {this.series().max('precip')}
                                        format=".1f"
                                        width="80"
                                        type="linear"
                                    />
                                    <Charts>
                                        <BarChart
                                            axis="rain"
                                            spacing={0.2}
                                            columns={["precip"]}
                                            series={this.series()}
                                            info={this.series()}
                                        />
                                        
                                    </Charts>
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
            </div>
            </div>
            </div>
                                     

                
            )
            
            
        } 
        else if(this.state.fetched){
            return(
                <div>
                     <Select options={this.state.fetcheddata} onChange={this.handleChange.bind(this)} />
                </div>
            )
        }
        
        return (
            <div>
                fetching data ...
            </div>
        );
    }
}
 
export default sdd;