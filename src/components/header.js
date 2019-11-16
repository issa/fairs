import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { css } from "@emotion/core"
import { FaMapMarked } from "react-icons/fa"

const Header = ({ siteTitle }) => (
  <header
    css={css`
      background: rebeccapurple;
      margin-bottom: 1.45rem;
      display: flex;
      align-items: center;
    `}
  >
    <div
      css={css`
        margin: 0 auto;
        max-width: 960;
        padding: 1.45rem 1.0875rem;
      `}
    >
      <h1
        css={css`
          margin: 0;
        `}
      >
        <Link
          to="/"
          css={css`
            color: white;
            text-decoration: none;
          `}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div
      css={css`
        flex: 1;
      `}
    />
    <div
      css={css`
        padding-right: 1.45rem;
      `}
    >
      <Link
        to="/page-2"
        css={css`
          color: white;
          font-size: 2rem;
          color: white;
        `}
      >
        <FaMapMarked />
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
