import React from "react"
import PropTypes from "prop-types"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import "./leaflet-map.css"

/*
import folium
import pandas as pd
import math

# Die csv der Spieletage
cuny = pd.read_csv('spiele2.csv')
print (cuny["Besuchertext"])

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


mapCUNY =folium.Map(location=[51.133,10.416],
        zoom_start=6,
        attr='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://wiki.openstreetmap.org/wiki/Wiki_content_license">CC BY-SA 2.0</a>',
        tiles='OpenStreetMap',
        #detect_retina=True
                    )

fg1=folium.FeatureGroup(name='Marker/Ort')
fg2=folium.FeatureGroup(name='Kreise/Besucherzahl')

for index,row in cuny.iterrows():
    lat = row["Latitude"]
    lon = row["Longitude"]
    bes = row["Besucherzahl"]
    best = row ["Besuchertext"]
    colo = row["Color"]
    web = row["Webseite"]
    name = row["Name"]
    ort = row["Ort"]
    if isinstance(ort, str): nameort = name +' '+ ort
    else: nameort = name
    link= row["Webseite"]
    datum = row["Datum"]


    fg1.add_child(
        folium.Marker([lat,lon],
          popup= '<b>'+ '<a href="{href}" target="_blank" rel="noopener noreferrer">{text}</a>'.format(href=link,text=nameort)+'</b>'+'<br>'+'Besuchszahl: '+str(best)+'<br>'+'Wann: '+datum
        ))


    fg2.add_child(
        folium.CircleMarker([lat,lon],
            radius = (math.log(bes/2,1.2)),
            popup = '<b>'+ '<a href="{href}" target="_blank" rel="noopener noreferrer">{text}</a>'.format(href=link, text=nameort)+'</b>'+'<br>'+'Besuchszahl: '+str(best)+'<br>'+'Wann: '+datum,
            color=colo,
            opacity=0.7,
            fill_opacity=0.7,
            fill=True,
          #  fill_color=colo
        ))



# Die Marker von fg1 werden zur Karte hinzugefügt
mapCUNY.add_child(fg1)


# Die Kreise von fg2 werden zur Karte hinzugefügt
mapCUNY.add_child(fg2)


# Es soll eine Layercontrol sichtbar sein
mapCUNY.add_child(folium.LayerControl())


# Die Karte wird als html gespeichert
mapCUNY.save(outfile='Spieletage_in_D.html')


# Die Karte wird aufgerufen.
mapCUNY
*/

class LeafletMap extends React.Component {
  static propTypes = {
    /** Latitude and Longitude of the map centre in an array, eg [51, -1] **/
    position: PropTypes.array,

    /** Initial zoom level for the map (default 13) **/
    zoom: PropTypes.number,

    /** If set, will display a marker, which when clicked will display this text **/
    markerText: PropTypes.string,
  }

  static defaultProps = {
    position: [51, -1],
    zoom: 13,
    markerText: "",
  }

  render() {
    return (
      <Map center={this.props.position} zoom={this.props.zoom}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://wiki.openstreetmap.org/wiki/Wiki_content_license">CC BY-SA 2.0</a>'
        />
        {this.props.markerText !== "" && (
          <Marker position={this.props.position}>
            <Popup>{this.props.markerText}</Popup>
          </Marker>
        )}
      </Map>
    )
  }
}

export default LeafletMap
