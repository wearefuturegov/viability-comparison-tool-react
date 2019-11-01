import React from "react";
import L from "leaflet";
import "./leaflet.css";

const style = {
  width: "70%",
  height: "100%",
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0"
};

class Map extends React.Component {
    componentDidMount() {
      // create map
      this.map = L.map("map", {
        center: [51.505, -0.09],
        zoom: 16,
        layers: [
          L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
        ]
      });
  
      // add layer
      this.layer = L.layerGroup().addTo(this.map);
      this.updateMarkers(this.props.markersData);
    }
    componentDidUpdate({ markersData }) {
      // check if data has changed
      if (this.props.markersData !== markersData) {
        this.updateMarkers(this.props.markersData);
      }
    }
    updateMarkers(markersData) {
      this.layer.clearLayers();
      markersData.forEach(marker => {
        L.marker(marker.latLng, { title: marker.title }).addTo(this.layer);
      });
    }
    render() {
      return <div id="map" style={style} />;
    }
  }

export default Map;
