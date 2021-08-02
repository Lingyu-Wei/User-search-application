import React, { Component } from "react";



class Search extends Component {
    
    searchName(array, property, query) {
   
      var results = [];
      for (var i = 0; i < array.list.length; i++)
      {
          if (array.list[i][property] == query) {
              results.push(array.list[i]);
          }
      }
  
      return results;
  }

}