export class Order{
    
    
    constructor(public id:number , public user_id:number , public product_id:number , public quantity:number , public totalamount:number , public delievery_status:number, public created_at:String,public product_name:String,public product_image:String,public price:number,public product_description:String,public order_id:string,public charge_id:string){
        
    }

}