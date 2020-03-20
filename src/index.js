import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import overall from './components/overall';
import countrywise from './components/countrywise';

const Overall = overall;
const Countrywise = countrywise;


class App extends Component{
    render(){
        return( 
            <body>
                <nav className='navbar navbar-default'>
                    <div>
                    <p className='display-2'><b>COVID-</b>
                     <b className="header_no">19 </b> 
                     Dashboard
                     </p> 
                    </div>
                </nav>

                <div>
                    <Overall/>
                    <Countrywise/>
                </div>
            </body>
            
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));