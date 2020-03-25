// Please Note this file is no more in use //
// Changed the contents into a Dropdown menu// 
// Only for reference regarding creating the series function and inmplementing Time series // 
// Feel free to delete it // 

import React, { PureComponent } from 'react';
import countrywise from './countrywise';
// import timeseries from './timeseries';
import { Charts, ChartContainer, ChartRow, YAxis, BarChart,Baseline, Resizable } from "react-timeseries-charts";
import { TimeSeries, TimeRange, Index } from "pondjs";


class dropdown extends PureComponent {

    
    state = {
        countries : [],
        points: {
            country: null,
            dataset: []
        }
    }

    series(){
        const series = new TimeSeries({
            name: "Analysis",
            columns: ["index", "precip"],
            points: this.state.points.dataset.map(([d, value]) => [
                Index.getIndexString("1h", new Date(d)),
                value
            ])
        });
        return(series)
    }

    fetchCountries(){
            fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(resp => this.setState({
                countries: Object.keys(resp)
            }))

        }

    componentWillMount(){

            this.fetchCountries()

    }

    clearcurrstate(){
        this.setState({
            points: {
                country: null,
                dataset: []
            }
        })
        this.fetchCountries()
    }

    showInfo(country){
        
        return fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                data[country].forEach(({ date, confirmed, recovered, deaths }) => 
                this.setState({
                    countries:this.state.countries,
                    points:{
                        country: country,
                        dataset: [...this.state.points.dataset,[date,confirmed-recovered-deaths]]
                    }
                })        
                  )

        })
    }

    
    
    render() { 
        // console.log(this.state.countries) 
        if(this.state.countries.length != 0 && this.state.points.dataset.length == 0){
            // console.log(this.state.points.dataset)
            return(
                <div className='country_names'>
                    {this.state.countries.map(country => 
                    <div className='btn btn-link' onClick={this.showInfo.bind(this,country)} key={country}>{country}</div>)}
                </div>
                );
        }
        else if(this.state.countries.length != 0 && this.state.points.dataset.length != 0){
            // console.log(this.state.points.dataset)
            return(
                <div>
                    <div>
                    <div className="row">
                    <div className="col">
                        <Resizable>
                            <ChartContainer timeRange={this.series().range()}>
                                <ChartRow height="300">
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

                <div className='back_button'>
                    <div className='btn btn-danger' onClick={this.clearcurrstate.bind(this)}>Back</div>
                </div>
                </div>
                
            )

        }

        else{
            return(
                <div>
                    Fetching required data
                </div>
            );
        }
        
    }
}

 export default dropdown;