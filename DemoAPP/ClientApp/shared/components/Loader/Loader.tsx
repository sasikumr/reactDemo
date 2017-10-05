import React from 'react';
import '../../styles/loader.css';
export default class Loader extends React.Component{
	render(){
		var loadingStyle ={position:'absolute',height:'100%', width:'100%',zIndex:'9999'};
		return (<div style={loadingStyle}> <div className="loader"></div> </div>);
	}
}

