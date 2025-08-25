"use client"

import { useState } from "react"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

const RESTAURANT_LOCATION = { 
  lat: 51.160311899141114, 
  lng: 0.5519848323972 
}

// Haversine formula to compute distance between 2 coords
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

interface DeliveryCalculatorProps {
  onFeeChange: (fee: number | null) => void;
}

function DeliveryCalculator({ onFeeChange }: DeliveryCalculatorProps) {
  const [postcode, setPostcode] = useState("")
  const [customerLocation, setCustomerLocation] = useState<{lat:number,lng:number} | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  async function handleLookup() {
    setError(null)
    setDistance(null)
    setDeliveryFee(null)
    onFeeChange(null) // now valid

    if (!postcode.trim()) {
      setError("Please enter a postcode.")
      return
    }

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          postcode
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
      const data = await res.json()

      if (data.status !== "OK" || !data.results?.[0]) {
        setError("Could not find that postcode. Please try again.")
        return
      }

      const loc = data.results[0].geometry.location
      setCustomerLocation(loc)

      const d = getDistanceKm(
        RESTAURANT_LOCATION.lat,
        RESTAURANT_LOCATION.lng,
        loc.lat,
        loc.lng
      )
      setDistance(d)

      if (d > 10) {
        setError("Sorry, you are outside our delivery radius (10 miles).")
        setDeliveryFee(null)
        onFeeChange(null)
      } else {
        const baseFee = 2.95
        const perMileFee = 1.0
        let fee = d <= 5 ? baseFee : baseFee + perMileFee * (d - 5)
        fee = Math.round(fee * 100) / 100
        setDeliveryFee(fee)
        onFeeChange(fee)
        setError(null)
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong while checking delivery.")
      onFeeChange(null)
    }
  }

  return (
    <div className="mt-6 space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Enter your postcode for delivery
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 bg-white text-sm"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g. TN13 1AA"
        />
        <button
          onClick={handleLookup}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Check
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {distance !== null && !error && (
        <div className="text-sm text-gray-700">
          <p>Distance: {distance.toFixed(2)} km</p>
          <p>Delivery Fee: £{deliveryFee?.toFixed(2)}</p>
        </div>
      )}

      {isLoaded && customerLocation && (
        <div className="h-40 w-full rounded overflow-hidden border">
          <GoogleMap
            center={customerLocation}
            zoom={12}
            mapContainerClassName="w-full h-full"
          >
            <Marker position={RESTAURANT_LOCATION} />
            <Marker position={customerLocation} />
          </GoogleMap>
        </div>
      )}
    </div>
  )
}

export default DeliveryCalculator
