import React from 'react';
import { withRouter } from 'react-router-dom'
import {removeQueryParam} from './query'
import Datamap from 'datamaps'

function filterText(key, value, query) {
  if (key === "goal") {
    return <span className="inline-block max-w-sm truncate">Completed goal <b>{value}</b></span>
  }
  if (key === "props") {
    const [metaKey, metaValue] = Object.entries(value)[0]
    const eventName = query.filters["goal"] ? query.filters["goal"] : 'event'
    return <span className="inline-block max-w-sm truncate">{eventName}.{metaKey} is <b>{metaValue}</b></span>
  }
  if (key === "source") {
    return <span className="inline-block max-w-sm truncate">Source: <b>{value}</b></span>
  }
  if (key === "utm_medium") {
    return <span className="inline-block max-w-sm truncate">UTM medium: <b>{value}</b></span>
  }
  if (key === "utm_source") {
    return <span className="inline-block max-w-sm truncate">UTM source: <b>{value}</b></span>
  }
  if (key === "utm_campaign") {
    return <span className="inline-block max-w-sm truncate">UTM campaign: <b>{value}</b></span>
  }
  if (key === "referrer") {
    return <span className="inline-block max-w-sm truncate">Referrer: <b>{value}</b></span>
  }
  if (key === "screen") {
    return <span className="inline-block max-w-sm truncate">Screen size: <b>{value}</b></span>
  }
  if (key === "browser") {
    return <span className="inline-block max-w-sm truncate">Browser: <b>{value}</b></span>
  }
  if (key === "os") {
    return <span className="inline-block max-w-sm truncate">Operating System: <b>{value}</b></span>
  }
  if (key === "country") {
    const allCountries = Datamap.prototype.worldTopo.objects.world.geometries;
    const selectedCountry = allCountries.find((c) => c.id === value)
    return <span className="inline-block max-w-sm truncate">Country: <b>{selectedCountry.properties.name}</b></span>
  }
  if (key === "page") {
    return <span className="inline-block max-w-sm truncate">Page: <b>{value}</b></span>
  }
}

function renderFilter(history, [key, value], query) {
  function removeFilter() {
    let newQuery = removeQueryParam(location.search, key)
    if (key === 'goal') { newQuery = removeQueryParam(newQuery, 'props')  }
    history.push({search: newQuery})
  }

  return (
    <span key={key} title={value} className="inline-flex bg-white text-gray-700 shadow text-sm rounded py-2 px-3 mr-4">
      {filterText(key, value, query)} <b className="ml-1 cursor-pointer" onClick={removeFilter}>✕</b>
    </span>
  )
}

function Filters({query, history, location}) {
  const appliedFilters = Object.keys(query.filters)
    .map((key) => [key, query.filters[key]])
    .filter(([key, value]) => !!value)

  if (appliedFilters.length > 0) {
    return (
      <div className="mt-4">
        { appliedFilters.map((filter) => renderFilter(history, filter, query)) }
      </div>
    )
  }

  return null
}

export default withRouter(Filters)
