import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('updateForm',{static:false}) updateform:NgForm;
  formdata = {
    firstname:null,
    lastname:null,
    username:null,
    email:null,
    mobileno:null,
    phoneno:null,
    gender:null,
    menchecked:null,
    womenchecked:null,
    kids:null,
    other:null,
    otherintrest:null
  };
  billing = {
    street:null,
    country:"",
    state:"",
    city:"",
  }


  allcountries = [];
  allstates = [];
  allcities = [];
  statefilter = [];
  cityfilter = [];
  constructor(private tokenservice:TokenService,private authservice:AuthService,private cityservice:CityService,private Countryservice:CountryService,private stateservice:StateService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.authservice.getuser(token).subscribe(data=>{
      console.log(data['user'].firstname);
      this.formdata.firstname = data['user'].firstname;
      this.formdata.lastname = data['user'].lastname;
      this.formdata.username = data['user'].username;
      this.formdata.email = data['user'].email;
      this.formdata.mobileno = data['user'].mobileno;
      this.formdata.phoneno = data['user'].phoneno;
      this.formdata.gender = data['user'].gender;
      const intrest = (data['user'].intrest).split(",");
      if(intrest.includes("men")){
        this.formdata.menchecked = true;
      }
      if(intrest.includes("women")){
        this.formdata.womenchecked = true;
      }
      if(intrest.includes("kids")){
        this.formdata.kids = true;
      }
      if(intrest.filter(m=>m!="men" && m!="women"&& m!="kids" )){
        this.formdata.other = true;
        this.formdata.otherintrest = intrest.filter(m=>m!="men" && m!="women"&& m!="kids")[0];
      }

      

    })
    
    this.Countryservice.getcountry().subscribe(data=>{
      this.allcountries = data;
    })
    this.stateservice.getstate().subscribe(data=>{
      this.allstates = data;
    })
    this.cityservice.getcity().subscribe(data=>{
      this.allcities = data;
    })
    
  }
  onSubmit(){
    console.log(this.updateform);
    console.log("hii");
  }
  filterstate(e){
    this.statefilter = this.allstates.filter(m=>m.country_id == e.target.value);

  }
  filtercity(e){
    this.cityfilter = this.allcities.filter(m=>m.state_id == e.target.value);
  }
  addresschange(e){
    if(e.target.checked){
      this.billing.street = this.updateform.value.s_street;
      this.billing.country = this.updateform.value.s_country;
      this.statefilter = this.allstates.filter(m=>m.country_id == this.billing.country);
      this.billing.state = this.updateform.value.s_state;
      this.cityfilter = this.allcities.filter(m=>m.state_id == this.billing.state);
      this.billing.city = this.updateform.value.s_city;
    }
    else{
      this.billing.street = "";
      this.billing.country = "";
      
      this.billing.state = "";
      
      this.billing.city = "";
    }
  }

}
