export class Service{

  public id:number;
  public name:string;
  public watchCount:number;
  public apiUrl:string;

  constructor(id:number,name:string,watchCount:number,apiUrl:string){
    this.id = id;
    this.name = name;
    this.watchCount =watchCount;
    this.apiUrl = apiUrl;
  }
}
