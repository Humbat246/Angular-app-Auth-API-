import { Component, OnInit } from '@angular/core';
import { Service } from './service.model';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {


  servicesArr:Service[]

  constructor(private serService:ServicesService) { }

  ngOnInit(): void {

    this.servicesArr = this.serService.getServices();
  }



}
