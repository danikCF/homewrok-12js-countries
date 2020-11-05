import template from './templates.hbs'
import listTemplate from './listCountries.hbs'

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
const countries = document.querySelector('.countries')

let baseUrl = `https://restcountries.eu/rest/v2/name/`

function createItem(temp, data, place){
  const item = temp(data)
  place.insertAdjacentHTML("afterbegin", item)
}

export default function fetchCountries(searchQuery){
  countries.innerHTML = ''
  let url = `${baseUrl}${searchQuery}`
  return fetch(url)
  .then(res=>{console.log(res)
    if(res.status > 200){
      error({
        title: "Country not found",
        text:
          "Country not found",
          delay: 2000
      })
    }else {
      return res.json()
    }
  })
  .then(countriesList=>{
    console.log(countriesList)
    if (countriesList.length > 10){
      error({
        title: "Attention",
        text:
        "Too many matches found. Please enter a more specific query!",
        delay: 2000
      })
    }else if(countriesList.length >= 2 && countriesList.length <= 10){
      createItem(listTemplate, countriesList, countries)
    }
    else{
      createItem(template, countriesList, countries)
    }
  })
  .catch(error =>console.log(error))
}