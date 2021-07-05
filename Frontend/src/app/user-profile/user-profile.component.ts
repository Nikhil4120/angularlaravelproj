import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { TokenService } from '../services/token.service';
import { UserprofileService } from '../services/userprofile.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('updateForm',{static:false}) updateform:NgForm;
  backenderror = "";
  intrest = ["men","women","kids"];
  isloading = false;
  formdata = {
    id:null,
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
  shipping = {
    street:null,
    country:"",
    state:"",
    city:"",
  };
  billing = {
    street:null,
    country:"",
    state:"",
    city:"",
  }
  isshown:boolean = false;
  checked = [];
  allcountries = [];
  allstates = [];
  allcities = [];
  statefilter = [];
  cityfilter = [];
  constructor(private tokenservice:TokenService,private authservice:AuthService,private cityservice:CityService,private Countryservice:CountryService,private stateservice:StateService,private userprofileservice:UserprofileService,private toastr:ToastrService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.Countryservice.getcountry().subscribe(data=>{
      this.allcountries = data;
    })
    this.stateservice.getstate().subscribe(data=>{
      this.allstates = data;
    })
    this.cityservice.getcity().subscribe(data=>{
      this.allcities = data;
    })
    this.authservice.getuser(token).subscribe(data=>{
      
      this.formdata.id = data['user'].id;
      this.formdata.firstname = data['user'].firstname;
      this.formdata.lastname = data['user'].lastname;
      this.formdata.username = data['user'].username;
      this.formdata.email = data['user'].email;
      this.formdata.mobileno = data['user'].mobileno;
      this.formdata.phoneno = data['user'].phoneno;
      this.formdata.gender = data['user'].gender;
      
      
      if(data['billinginformation']){
        this.billing.country = data['billinginformation'].country;
      this.statefilter = this.allstates.filter(m=>m.country_id == this.billing.country);
      this.billing.state = data['billinginformation'].state;
      this.cityfilter = this.allcities.filter(m=>m.state_id == this.billing.state);
      this.billing.city = data['billinginformation'].city;
      this.shipping.street = data['shippinginformation'].street;
      this.shipping.city = data['shippinginformation'].city;
      this.shipping.state = data['shippinginformation'].state;
      this.shipping.country = data['shippinginformation'].country;
      this.billing.street = data['billinginformation'].street;
      }
      
      
      const intrest = (data['user'].intrest).split(",");
      
     console.log(intrest);
      if(intrest.includes("men")){
        this.checked.push("men");
        this.formdata.menchecked = true;
        
      }
      if(intrest.includes("women")){
        this.checked.push("women");
        this.formdata.womenchecked = true;
        
      }
      if(intrest.includes("kids")){
        this.checked.push("kids");
        this.formdata.kids = true;
        
      }
      if(intrest.filter(m=>m!="men" && m!="women"&& m!="kids" ).length != 0 ){
        console.log(intrest.filter(m=>m!="men" && m!="women"&& m!="kids" ));
        this.formdata.other = true;
        this.isshown = true;
        this.formdata.otherintrest = intrest.filter(m=>m!="men" && m!="women"&& m!="kids")[0];
      }

      

    })
    
    
    
  }
  onSubmit(){
    console.log(this.updateform.value);
    this.isloading = true;
    if(this.updateform.value.other){
      this.checked.push(this.updateform.value.otheri);
    }
    let authobs:Observable<any>;
    authobs = this.userprofileservice.updateuser(this.updateform.value,this.checked);
    authobs.subscribe(data=>{
      this.toastr.success("userprofile updated successfully");
      this.isloading = false;
      
    })
    
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

  checkboxchange(e,name:string){
    if(e.target.checked){
      this.checked.push(name);
      

    }
    else{
      this.checked.splice(this.checked.indexOf(name),1);
      
    }

  }
  showtextbox(e){
    
    if(e.target.checked){
      
      this.isshown = true;
    }
    else{
      this.isshown = false;
    }
  }

  selectall(e){
    if(e.target.checked){
      this.checked = [];
      this.checked.push(...this.intrest);
      this.formdata.menchecked = true;
      this.formdata.womenchecked = true;
      this.formdata.kids = true;
    }
    else{
      this.checked = [];
      
      this.formdata.menchecked = false;
      this.formdata.womenchecked = false;
      this.formdata.kids = false;
    }
  }

  emailexist(e){
    this.userprofileservice.emailcheck(e.target.value,this.formdata.id).subscribe(data=>{
      console.log(data);
      if(!data['success']){
        this.backenderror = data.message;
      }
      else{
        this.backenderror = ""; 
      }
    },error=>{
      console.log(error.error.message);
    })
  }

}
