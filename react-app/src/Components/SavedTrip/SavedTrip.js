import React, { Component } from "react";
import TripTable from "../TripTable/TripTable";
import "./SavedTrip.css";
import { postloadtrips } from '../../Actions/expressActions'
import { connect } from "react-redux";
import MapComponentDefault from "../MapComponent/MapComponentDefault";
import NearbyPlaces from "../NearbyPlaces/NearbyPlaces";
import { fetchnearbyplaces } from '../../Actions/expressActions';


const mapDispatchToProps = {
  postloadtrips, fetchnearbyplaces
}

const mapStateToProps = (state) => ({
  credentials: state.oauth.Credentials,
  browser_lat: state.places.browser_location.lat,
  browser_lng: state.places.browser_location.lng,
  place_type: state.places.tourist_places.type,
  lodging_resturant_types: state.places.resturant_lodging_places.type,
  savedTrips: state.oauth.savedTrips

});

class SavedTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        id: "",
        trip: {
          name: "",
          to: {
            id: "",
            lat: "",
            lng: ""
          },
          from: "",
          places: ""
        }
      },
      savedTrips: [],
      loading: false
    };

    this.setSelectedTrip = this.setSelectedTrip.bind(this)
  }

  componentWillMount() {
    if (this.props.credentials.response) {
      this.setState({ loading: true });
      this.props.postloadtrips({ credentials: this.props.credentials.response.wc }).then(() => {
        this.setState({ loading: false });
      })
    }

  }

  setSelectedTrip(selected) {
    console.log("setting selected " + selected)
    this.setState({
      selected: selected
    })
    this.props.fetchnearbyplaces({ lat: this.state.selected.trip.to.lat, lng: this.state.selected.trip.to.lng, place_type: this.props.place_type, resturant_lodging_places: this.props.resturant_lodging_places });
  }

  //componentDidMount() {}
  // componentWillUnmount(){}

  componentWillReceiveProps() { }
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate() {}

  render() {
    return (
      this.props.credentials.response ? (
        <div className="SavedTrip">
          {this.state.loading ? <p className="TripTable">Loading...</p> :
            <TripTable setSelected={this.setSelectedTrip} trips={this.props.savedTrips} selected={this.state.selected} className="TripTable" />
          }
          <MapComponentDefault origin={this.state.selected.trip.from} destination={this.state.selected.trip.to.id} browser={{ lat: this.props.browser_lat, lng: this.props.browser_lng }} waypoints={this.state.selected.trip.placesOnMap} />
          <NearbyPlaces />
        </div>) :
        (<p>Whoops... You need to log in with google to view saved trips</p>)
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedTrip);
