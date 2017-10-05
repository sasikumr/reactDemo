import React from 'react';
import $ from 'jquery';
const clearStyle = {clear:'both', height:'20px'};
export class TabContainer extends React.Component {       
    render(){
        const header = this.tabHeader();
        var customStyle = {
            height: '30px'
        };
        var mainStyle = {
            overflow: 'auto'
        };
		
        return (<div className = "pad20" style = {mainStyle} >
                    <div className = "col-xs-12 col-sm-2" style = {customStyle} >
                        {header}
                    </div>		
					{this.props.children}					
                    <div style={clearStyle}>
                    </div> 
                </div>				
            );
    }
    
    tabHeader(){
        let count = 0;        
        const headerLink = this.props.children.map((child,i) => {            
						let headerId = child.props.name.split(' ').join('');
                        count = count + 1 ;
                        return (<TabHeader key={i} id ={headerId} headerName = {child.props.name}  isDefault = {child.props.isDefaultTab} index = {count} />);
                        
                       });
        
        return (<nobr> {headerLink} </nobr>);
    }
}




class TabHeader extends React.Component{
    constructor(props){
        super(props);
        this.state ={ id: this.props.id + "Tab",index : this.props.index, isDefault: this.props.isDefault, currentTabIndex: 0 };
        this.changeActive = this.changeActive.bind(this);
    }
    render(){
        return (<li className = "tabListItem activeTab" name = "folderTab" id = {this.state.id} onClick = {this.changeActive} > 
                    {this.props.headerName} 
                </li>);
    }
    changeActive = () => {        
        var xyz = $("[name='folderTab']");
        for (let i = 0; i < xyz.length; i++) {
            $(xyz[i]).attr("class", "tabListItem react-tabHeader");
        }
        $("#" + this.state.id).attr("class", "tabListItem activeTab  react-tabHeader");
        this.setState({ currentTabIndex: this.props.index});
        this.showContent(this.state.id);
    }
    showContent(x) {		
        var conBoxes = $("[name='contentBox']");
        for (let i = 0; i < conBoxes.length; i++) {
            $(conBoxes[i]).attr("class", "noShow react-tabContent");
            $(conBoxes[i]).attr("style", "display:none");
        }
        let xParts = x.split('Tab');
        let whichBox = xParts[0];
        $("#" + whichBox + 'Box').attr("class", "show react-tabContent");
        $("#" + whichBox + 'Box').attr("style", "display:block");
    }
    componentDidMount(){
        if (this.state.isDefault) {
            this.changeActive();
        }
    }
    componentWillUpdate(){
    }
}

export class Tab extends React.Component {
   render(){
		let id = this.props.name.split(' ').join('');
        return (<div id = {id + "Box"} name = "contentBox" className = "noShow react-tabContent" > 
					<div style={clearStyle}></div>
                    {this.props.children} 
                </div>
               );
    }
}
