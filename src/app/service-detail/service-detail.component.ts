import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {



  isLoading = false;

  // Search elemek ucun
  searchText: string = "";
  phoneNum: number = 0;

  // Id-ni getirmek ucun
  routeId = this.route.snapshot.params.id;
  service = this.serv.getServices().find(s=>s.id==this.routeId);

  //  Api ucun
  statusMessage: string = null;
  dataArr: any[] = [];
  tarifBaratObj = { Header: [], Body: [] }



  constructor(private serv: ServicesService, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.service.watchCount+=1;
    if (this.routeId == 1) {
      this.getDataResult()
    }
  }



  getDataResult() {

    this.isLoading = true;

    this.serv.getServiceApiData(this.routeId, this.searchText, this.phoneNum).subscribe(res => {
      this.statusMessage = res['StatusMessage'];

      if (res['Status'] == "OK") {
        this.dataArr = res['Response'];

        if (this.routeId == 1) {
          for (let data in this.dataArr['Header']) {
            this.tarifBaratObj.Header.push(this.dataArr['Header'][data]['Name']);
          }

          for (let data of this.dataArr['Body']['SectionList']['Section']) {
            this.tarifBaratObj.Body.push(data)
          }
          this.tarifBaratObj.Header.shift();
        }
      } else {
        this.dataArr = [];
      }
      this.isLoading = false;

    },
      err => {
        this.statusMessage = "An unkown error occured";
        this.dataArr = [];
        this.isLoading = false;

      }



    )


  }

}
