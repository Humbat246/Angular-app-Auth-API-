import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service.model';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {


  searchText = "";
  services: Service[] = [];
  constructor(private serv: ServicesService) { }

  ngOnInit(): void {

  }


  searchService() {

    if (this.searchText != "") {

      this.services = this.serv.getServices().filter(s => {
        return s.name.toLowerCase().includes(this.searchText.toLowerCase());
      })


    }else{
      this.services = []
    }



  }

}
