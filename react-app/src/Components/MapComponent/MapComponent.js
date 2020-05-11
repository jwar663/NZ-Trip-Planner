/*global google*/
import React from 'react'
import './MapComponent.css';
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker} from 'react-google-maps'


class MapComponent extends React.Component {
  constructor(props){
    console.log('in MapComponent Class')
    super(props)
  }
render() {
    const DirectionsComponent = compose(
      withProps({
        origin:this.props.origin,
        destination: this.props.destination,
        browser: this.props.browser,
        googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjwnK_zvDGQokuzDJ0NVnR979L_KNEYuo&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `50%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
          console.log('in did mount method')
          
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: new google.maps.LatLng(this.props.origin.lat,this.props.origin.lng),
          destination: new google.maps.LatLng(this.props.destination.lat,this.props.destination.lng),
          //{placeId: "ChIJ--acWvtHDW0RF5miQ2HvAAU"} this.props.origin.lat, this.props.origin.lng
          waypoints: [{location: {placeId: "ChIJ--acWvtHDW0RF5miQ2HvAAU"}, stopover: true}],
            travelMode: google.maps.TravelMode.DRIVING
            
            
          }, (result, status) => {
            console.log(result)
            if (status === google.maps.DirectionsStatus.OK) {
this.setState({
                
                directions: {...result},
                markers: true,
                
              })
            } else {
              console.error(`error fetching directions ${result}`);
              ////// should add handler when routes are not found
            }
          });
        }
      })
    )(props =>
<GoogleMap defaultZoom={8} defaultCenter={{ lat:  props.browser.lat, lng: props.browser.lng }}>
    { !props.directions && <Marker position={{ lat:  props.browser.lat, lng: props.browser.lng }} />}
    {
      
    props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
    );
return (
        <DirectionsComponent
        />
    )
  }
}


export default MapComponent;