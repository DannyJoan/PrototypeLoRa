import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoraServicesService } from '../lora-services.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-prototipo',
  templateUrl: './prototipo.component.html',
  styleUrls: ['./prototipo.component.scss'],
})
export class PrototipoComponent implements OnInit {
  data: any;
  dataSQL: any[] = [];
  dataSQLR: any[] = [];
  labels: any[] = [];
  options: any;
  overlays: any[] = [];
  mensajePantalla: string = '';
  mensajeArea: string = '';

  lat: any;
  lng: any;
  /*   map: google.maps.Map; */
  coordinates: any;

  constructor(
    private serviceLora: LoraServicesService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    setInterval(async () => {
      /*Messages*/
      const mensajeBase: any = await this.serviceLora.getMensaje();
      var horaUno = new Date();
      var hours = horaUno.getHours();
      var minutes = '0' + horaUno.getMinutes();
      var seconds = '0' + horaUno.getSeconds();
      var formattedTime =
        hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      this.mensajeArea +=
        'Giovanni-M-25 ( ' +
        formattedTime +
        ' ): ' +
        mensajeBase[0].usuarioID +
        '\n';

      /*Monitoring*/

      const signoVital: any = await this.serviceLora.getSignosVitales();
      var horaDos = new Date();
      var hours = horaDos.getHours();
      var minutes = '0' + horaDos.getMinutes();
      var seconds = '0' + horaDos.getSeconds();
      var formattedTime =
        hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      this.dataSQL.push(signoVital[0].temperatura);
      this.dataSQLR.push(signoVital[0].ritmo);
      this.labels.push(formattedTime);
      var ritmo = parseFloat(signoVital[0].ritmo);
      var temperatura = parseFloat(signoVital[0].temperatura);

      if (ritmo > 86) {
        this.frecuenciaMalaAlert();
      }
      if (ritmo > 70 && ritmo <= 84) {
        this.frecuenciaNormalAlert();
      }
      if (ritmo > 62 && ritmo <= 68) {
        this.frecuenciaBuenaAlert();
      }
      if (ritmo <= 60) {
        this.frecuenciaMuyBuenaAlert();
      }

      if (temperatura >= 38) {
        this.temperaturaAltaAlert();
      }
      if (temperatura >= 30 && temperatura < 38) {
        this.temperaturaNormalAlert();
      }
      if (temperatura < 30) {
        this.temperaturaBajaAlert();
      }

      if (this.labels.length > 10) {
        this.dataSQL.splice(0, 1);
        this.labels.splice(0, 1);
      }

      this.data = {
        labels: this.labels,
        datasets: [
          {
            label: 'Temperatura',
            data: this.dataSQL,
            fill: false,
            borderColor: '#4bc0c0',
          },
          {
            label: 'Ritmo Cardiaco',
            data: this.dataSQLR,
            fill: false,
            borderColor: '#0067b3',
          },
        ],
      };

      /*Ubication*/
      const ubicacion: any = await this.serviceLora.getLatitudLongitud();
      this.lat = ubicacion[0].latitud;
      this.lng = ubicacion[0].longitud;
      this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    }, 80000);
  }

  selectData(event: any) {}

  async obtenerMensaje() {
    this.mensajeArea += 'Centro de Control: ' + this.mensajePantalla + '\n';
    this.mensajePantalla = '';
  }

  temperaturaNormalAlert() {
    this.messageService.addAll([
      { severity: 'success', summary: 'Temperatura Normal' }
    ]);
  }

  temperaturaBajaAlert() {
    this.messageService.addAll([
      {
        severity: 'warn',
        summary: 'Temperatura Baja',
      }

    ]);
  }

  temperaturaAltaAlert() {
    this.messageService.addAll([
      { severity: 'warn', summary: 'Temperatura Alta'}

    ]);
  }

  frecuenciaMuyBuenaAlert() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'Frecuencia Cardíaca Muy Buena',
        detail: 'Pulsaciones por minuto [78 o menos]'
      }
    ]);
  }

  frecuenciaBuenaAlert() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'Frecuencia Cardíaca Buena',
        detail: 'Pulsaciones por minuto [78 - 88]',
      },
    ]);
  }

  frecuenciaNormalAlert() {
    this.messageService.addAll([
      {
        severity: 'warn',
        summary: 'Frecuencia Cardíaca Normal',
        detail: 'Pulsaciones por minuto [88 - 106]',
      },
    ]);
  }

  frecuenciaMalaAlert() {
    this.messageService.addAll([
      {
        severity: 'error',
        summary: 'Frecuencia Cardíaca Mala',
        detail: 'Pulsaciones por minuto [108 o más]',
      },
    ]);
  }
}
