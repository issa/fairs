import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { CircleMarker, Map, TileLayer, Marker, Popup } from "react-leaflet"

// import LeafletMap from "../components/leaflet-map"

const Detail = ({
  id,
  Besuchertext,
  Datum,
  Name,
  Latitude,
  Longitude,
  Ort,
  Webseite,
}) => (
  <Marker position={[Latitude, Longitude]}>
    <Popup>
      <b>
        <a href="{Webseite}" target="_blank" rel="noopener noreferrer">
          {Name}
          {Ort && ` ${Ort}`}
        </a>
      </b>
      <br />
      Besuchszahl: {Besuchertext}
      <br />
      Wann: {Datum}
    </Popup>
  </Marker>
)

const Kreis = ({
  id,
  Besuchertext,
  Besucherzahl,
  Color,
  Datum,
  Name,
  Latitude,
  Longitude,
  Ort,
  Webseite,
}) => (
  <CircleMarker
    center={[Latitude, Longitude]}
    radius={15 + Math.log(Besucherzahl / 2, 1.2)}
    color={Color}
    opacity={0.7}
    fillOpacity={0.7}
    fill={true}
  >
    <Popup>
      <b>
        <a href="{Webseite}" target="_blank" rel="noopener noreferrer">
          {Name}
          {Ort && ` ${Ort}`}
        </a>
      </b>
      <br />
      Besuchszahl: {Besuchertext}
      <br />
      Wann: {Datum}
    </Popup>
  </CircleMarker>
)

const Spieletage = ({ position, zoom, spieletage }) => (
  <Map center={position} zoom={zoom}>
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://wiki.openstreetmap.org/wiki/Wiki_content_license">CC BY-SA 2.0</a>'
    />

    {spieletage.map((detail, index) => (
      <Detail key={index} {...detail} />
    ))}
    {spieletage.map((detail, index) => (
      <Kreis key={index} {...detail} />
    ))}
  </Map>
)

const SecondPage = props => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>

    <div
      css={css`
        .leaflet-container {
          height: 600px;
          width: 100%;
        }
      `}
    >
      {typeof window !== "undefined" && (
        <Spieletage
          position={[51.133, 10.416]}
          zoom={6}
          spieletage={props.data.allSpiele2Csv.nodes}
        />
      )}
    </div>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage

export const query = graphql`
  {
    allSpiele2Csv {
      nodes {
        id
        Besuchertext
        Besucherzahl
        Color
        Datum
        Name
        Latitude
        Longitude
        Ort
        Webseite
      }
    }
  }
`
