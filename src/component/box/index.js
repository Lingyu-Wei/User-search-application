import './box.css';
import Row from '../row' 
import React, { Component } from "react";
import DropDown from '../dropdown';
const axios = require("axios");


async function callDatabase()
{
  const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  return response.data;
}

function sortArray(array,property,subproperty) 
{
  console.log("HELLO THERE"+array[0]);
  if(typeof subproperty == "undefined") //If there's only one level property,
  {
    array.sort((a, b) => (a[property] > b[property]) - (a[property] < b[property]));
  }
  else //If there's a "sub" property, likely to be used with address and city
  {
    array.sort((a, b) => (a[property][subproperty] > b[property][subproperty]) - (a[property][subproperty] < b[property][subproperty]));
  }
  //If there are even more sub-sub properties simply copy N paste the if statement and add more props to pass
  return array;
}

function searchProperty(array, property, query) 
{
  var results = [];
  for (let i = 0; i < array.length; i++)
  {
    let curUser = array[i][property].toLowerCase();
      if (curUser.includes(query.toLowerCase())) {
          results.push(array[i]);
      }
  }

  return results;
}

class Box extends Component {

    constructor(props) {
        super(props);
        this.genericRows = [];
        this.searchQuery = "";
        this.searchProperty = "name";
        this.sortProperty = "name";
        this.createRowData('');
    }

    stripDatabase(data) 
    {
        let LocalData = data;
        {/**Now we strip the data and just include the names, emails, phone numbers, and cities */}
        let strippedData = [];
        {/**Make sure each return variable name is the same as the labels within the row component */}
        for(let i=0;i<LocalData.length;i++)
        {
          let curRow = {
            name : LocalData[i].name,
            email : LocalData[i].email,
            phone : LocalData[i].phone,
            city : LocalData[i].address.city,
            hideButton : <button createdIndex = {i} onClick = {createdIndex => this.removeRow(createdIndex)}>Remove</button>
          }
          strippedData.push(curRow);
        }
        {/**Now update the current box to include all of the stripped data */}
        return strippedData;
    }

    newQuery(NewQuery)
    {
      this.query = NewQuery;
    }

    addAllTheRows(rowData,query)
    {
      let convertedData = this.stripDatabase(rowData);
      convertedData = searchProperty(convertedData,this.searchProperty,query);
      convertedData = sortArray(convertedData,this.sortProperty);
      for(let i=0;i<convertedData.length;i++)
      {
          this.addRow(convertedData[i]);
      }
    }

    createRowData(query)
    {
      this.newQuery(query);
      {/**First reset the results */}
      this.clearRows(this.genericRows);
      {/**Then we strip the database down to whatever properties we are looking for (currently hardcoded to look for name email phone and city) */}
      callDatabase().then(response => this.addAllTheRows(response,query));
      {/**Then we search all of the stripped data for the ones we're actually looking for TODO: replace hardcoded "name" and "clem" for input*/}
      {/**Then we sort the data by whatever property we want TODO: replace the hardcoded sort by name to property from dropdown*/}
      
    }

    addRow(data)
    {
      {/**Data needs to be an array of objects */}
            this.genericRows.push(data);
            this.setState(() => {
            console.log('setting state');
            return { unseen: "does not display" }
        });
    }

    clearRows(rowArray)
    {
        rowArray.splice(0); {/*Replace 0 with the index of date to delete*/}
        this.setState(() => {
            console.log('setting state');
            return { unseen: "does not display" }
        });
    }

    removeRow(indexToFind)
    {
        let targetIndex = indexToFind.target.attributes.createdIndex.nodeValue;
        {/*Search through the array to find which row has the exact date of the button*/}
        for(let i=0;i<this.genericRows.length;i++)
        {
            console.log(this.genericRows[i].hideButton.props.createdIndex);
            if(this.genericRows[i].hideButton.props.createdIndex == targetIndex)
            {
                this.genericRows.splice(i,1);
            }
        }
        this.setState(() => {
            console.log('setting state');
            return { unseen: "does not display" }
        });
    }

    updateSort(value)
    {
      this.sortProperty = value;
    }

    updateSearch(value)
    {
      this.searchProperty = value;
    }

    render() {
        return (
            <div>
                <h2 className = "rowText">User search</h2> 
                  
                <div> {/*This div is ABOVE the box object - just a basic title header on the left side and the add/delete buttons on the right*/}

                <input className = "heavy" ref={(input) => this._inputElement = input} placeholder="Enter search query"></input>
                <div className = "rowText">
                
                    <DropDown infoString = "Search by" onClick = {this} whatToUpdate = "search"/>
                </div>
                <div className = "rowText">
                <DropDown infoString = "Sort by" onClick = {this} whatToUpdate = "sort" />
                </div>
                     <button onClick = {() => this.createRowData(this._inputElement.value)}>Search</button>
                </div>
    
                <div className = "box">
                    <Row rows = {this.genericRows} />
                </div>
           </div>
        );
    }
    
}
 
export default Box;