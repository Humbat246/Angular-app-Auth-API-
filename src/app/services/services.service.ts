import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from "./service.model";


@Injectable({
  providedIn: 'root'
})


export class ServicesService {





  constructor(private http: HttpClient) { }

  private services: Service[] = [
    new Service(1, "Daxili və beynəlxalq pul baratları üzrə tariflər", 25, "https://api.opendata.az/v1/json/AzerPost/PostalTariffBarat/"),
    new Service(2, "Mobil nömrə daşınması xidməti vasitəsilə digər şəbəkəyə daşınmış nömrələr barədə məlumatın verilməsi", 125, "https://api.opendata.az/v1/json/home/CheckMobileProvider/"),
    new Service(3, "Qısa nömrələrlə bağlı məlumat(101, 157 və.s)", 289, "https://api.opendata.az/v1/json/nrytn/ShortNumberInfo/"),
    new Service(4, "Olke daxili yiqim kodlari - seherlerarasi kodlar", 255, "https://api.opendata.az/v1/json/nrytn/InterCityPhoneCodes/"),
    new Service(5, "Beynəlxalq ölkə kodları", 225, "https://api.opendata.az/v1/json/nrytn/CountryPhoneCodes/"),
    new Service(6, "Küçə adlarına görə poçt indeksləri, rayonun müəyyən edilməsi", 225, "https://api.opendata.az/v1/json/nrytn/PostIndexRegionByStreetName/"),
    new Service(7, "Poçt indeksinə görə küçə adları, rayonun müəyyən edilməsi", 225, "https://api.opendata.az/v1/json/nrytn/StreetNameRegionByPostIndex/"),


  ]

  getServices() {
    return this.services.slice();
  }

  getServiceApiData(id: number, text: string,phoneNum:number) {



    let service = this.services.find(s => s.id == id)

    if (!service) {
      alert("Servis movcud deyil")
    } else {
       // Mobil nömrə daşınması xidməti vasitəsilə digər şəbəkəyə daşınmış nömrələr barədə məlumatın verilməsi
       if (id == 2) {
        return this.http.get(service.apiUrl + phoneNum + "/" + text)
      }else{
        return this.http.get(service.apiUrl + text);
      }

    }

  }

}
