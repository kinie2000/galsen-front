import { AppSettings, Settings } from 'src/app/app.settings';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map-senegal',
  templateUrl: './map-senegal.component.html',
  styleUrls: ['./map-senegal.component.scss']
})
export class MapSenegalComponent implements OnInit {

    @Input('mapHome') mapHome:boolean = true;
    @Input('geometry') geometry: any;

    // public lat: number = 14.497401;
    // public lng: number = -14.452362;
    // public zoom: number = 9; 

    public lat: number;
    public lng: number;
    public zoom: number; 

    public mapStyles:any = [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8b9198"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#323336"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#414954"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2e2f31"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7a7c80"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#242427"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#202022"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#393a3f"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#202022"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#393a3f"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#202022"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#202124"
                    }
                ]
            }
    ]; 

    public  markers = [
        // These are all just random coordinates from https://www.random.org/geographic-coordinates/
        { lat: 	14.716677, lng: -17.467686, alpha: 1, label: 'line 1', labelOption:{
            color: 'black',
            fontFamily: '',
            fontSize: '14px',
            fontWeight: 'bold',
            text: "13 XOF",
            // marginLeft: '-19px',
            // marginTop: '-32px',
            // height: '36px',
            // background: 'rgb(255, 255, 255)',
            // borderRaduis:'100px',
            // border: '1px solid rgb(0, 126, 120);',

        }}, //Dakar
        { lat: 14.716677, lng: -17.4676861, alpha: 1 , labelOption:{
            color: 'black',
            fontFamily: '',
            fontSize: '14px',
            fontWeight: 'bold',
            text: 'line123',
        },
        title: 'Marker Line 123'},
        { lat: 14.716677, lng: -17.4676861, alpha: 1, labelOption:{
            color: 'black',
            fontFamily: '',
            fontSize: '14px',
            fontWeight: 'bold',
            text: 'line1234',
        },
        title: 'Marker Line 1234'
     },
        // { lat: 14.9001717, lng: -14.4892276, alpha: 1 },
        // { lat: 14.3001717, lng: -14.4992276, alpha: 1 }
    ];  

    public settings: Settings;

    private geoCoder: any | undefined;  

    constructor(private appSettings:AppSettings,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone) { 

        this.settings = this.appSettings.settings; 

    }



    ngOnInit(): void {

        this.lat = 14.497401;
        this.lng = -14.452362;
        this.zoom = 9; 

    
        /*
        this.mapsAPILoader.load().then(() => {

            // this.setCurrentLocation();

            this.geoCoder = new google.maps.Geocoder;

            console.log(this.searchElementRef, this.searchElementRef.nativeElement)
            this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    console.log('Entreer ici après changement')
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if(place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom = 12;
                })
            })
        })
        */
        

    }

   
    
    ngDoCheck(): void {


        if(typeof this.geometry !== "undefined") {

            this.lat = this.geometry.location.lat();
            this.lng = this.geometry.location.lng();
            this.zoom = 12;

        }
        
    }

    //Lorsque on clique sur un marker que j'ai eut a crée
    selectMarker(event: any) {

        console.log( event);
        
    }
}
