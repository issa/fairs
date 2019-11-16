import React from "react"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import SEO from "../components/seo"

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
]

function groupBy(list, keyGetter) {
  const map = {}
  list.forEach(item => {
    const key = keyGetter(item)
    if (!(key in map)) {
      map[key] = [item]
    } else {
      map[key].push(item)
    }
  })
  return map
}

const IndexPage = props => {
  const now = new Date()
  const termine = props.data.termine.nodes
    .map(termin => {
      return {
        ...termin,
        start: new Date(termin.start),
        end: new Date(termin.end),
      }
    })
    .filter(termin => termin.end > now)

  termine.sort((a, b) => b - a)

  const monthly = Object.entries(
    groupBy(termine, ({ start }) => start.getFullYear())
  ).reduce((memo, [year, items]) => {
    memo[year] = groupBy(items, ({ start }) => start.getMonth())
    return memo
  }, {})

  console.log(monthly)
  return (
    <Layout>
      <SEO title="Alle Spieletage" />
      <h1>Kommende Spieletage</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      {Object.entries(monthly).map(([year, months]) => (
        <div>
          {Object.entries(months).map(([month, termine]) => (
            <>
              <h2>
                {MONTHS[month]} {year}
              </h2>

              {termine.map(termin => (
                <div>
                  <h3>{termin.name || termin.spieletag.name}</h3>
                  <p>
                    {termin.start.toLocaleDateString()}
                    {"–"}
                    {termin.end.toLocaleDateString()}{" "}
                  </p>
                  {JSON.stringify(termin)}
                </div>
              ))}
            </>
          ))}
        </div>
      ))}

      <ul>
        {termine.map((termin, index) => (
          <li key={index}>{JSON.stringify(termin)}</li>
        ))}
      </ul>

      <ul>
        {false &&
          props.data.allSpiele2Csv.nodes.map(
            ({ id, Name, Ort, Webseite }, index) => (
              <li key={index}>
                <h4>{Name}</h4>
                <span
                  css={css`
                    height: 1.5rem;
                  `}
                >
                  {" "}
                  {Ort}
                </span>
              </li>
            )
          )}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allSpiele2Csv {
      nodes {
        id
        Besuchertext
        Besucherzahl
        Datum
        Name
        Latitude
        Longitude
        Ort
        Webseite
      }
    }
    spieletage: allContentfulSpieletag {
      edges {
        node {
          name
          website
          geolocation {
            lat
            lon
          }
          beschreibung {
            beschreibung
          }
        }
      }
    }
    termine: allContentfulTermin {
      nodes {
        name
        besucherzahl
        start
        end
        spieletag {
          name
          geolocation {
            lat
            lon
          }
          website
          beschreibung {
            beschreibung
          }
        }
      }
    }
  }
`
