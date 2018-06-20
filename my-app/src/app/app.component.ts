import { Component,OnInit } from '@angular/core';
declare var loadCsv: any;
declare var recommend: any;
declare var getUserList: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  searchInput:string = "";
  usersToRecommend:Array<any>=[];
  userList:Array<any>=[];
  possibleUsers:Array<any>=[];
  matrix:any;
  result:any;
  showPossibleUsers(){
    this.usersToRecommend=[];
    console.log(this.searchInput);
    if(!(this.searchInput.length>0))this.possibleUsers=[];
    else if(this.userList.filter(o=>o.includes(this.searchInput)).length<=10) this.possibleUsers = this.userList.filter(o=>o.includes(this.searchInput));
    else this.possibleUsers=[];
    this.getMarginTop();
    this.getMarginTopLabel();
  };
  recommend(user:string){
    this.usersToRecommend = this.recommendFromJS(user);
    console.log(this.usersToRecommend);
  }
  getUserListFromJs(){
    return new getUserList();
  }
  loadCsvFromJs(){
    return new loadCsv();
  }
  recommendFromJS(name:string){
    return new recommend(name);
  }
  getMarginTopLabel(){
    var constant = 270;
    var k = 39*this.possibleUsers.length;
    console.log("k:"+k);
    var sum = constant+k;
    console.log("sum:"+sum);
    var str = sum+"px";
    var x = document.getElementById("labelRec");
    x.style.top=str;
  }
  getMarginTop(){
    var constant = -55;
    var k = 39*this.possibleUsers.length;
    console.log("k:"+k);
    var sum = constant+k;
    console.log("sum:"+sum);
    var str = sum+"px";
    var x = document.getElementById("table2");
    x.style.marginTop=str;
  }

  setSearchInput(name:string){
    console.log("setting")
    console.log(name)
    this.searchInput=name;
    this.possibleUsers=[];
    this.getMarginTop();
    this.getMarginTopLabel();
  }
  async ngOnInit() {
    this.matrix = await this.loadCsvFromJs();
    this.userList = await this.getUserListFromJs();
    console.log(this.matrix);
    console.log(this.userList);
  }
}
