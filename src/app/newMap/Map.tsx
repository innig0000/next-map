"use client"
import React, {useEffect, useState} from "react";
import {OpenStreetMapProvider} from "leaflet-geosearch";
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

const Map = ({ children }) => {
    const [center, setCenter] = useState([37.5665, 126.9780]);
    const [loading, setLoading] = useState(true);
    const address = "서울특별시 송파구 성내천로 45";

    const fetchCoordinates = async () => {
    try {
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({ query: address });

        if (results.length > 0) {
            const { x: lon, y: lat } = results[0];
            setCenter([lat, lon]);
        } else {
            console.error('No results found for the given address.');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
};
console.debug(center);
    useEffect(() => {
        if (loading) {
            fetchCoordinates();
            setLoading(false);
        }
}, [address, loading, center]);

    function FlyMapTo() {

        const map = useMap()

        useEffect(() => {
            map.flyTo(center)
        }, [center])

        return null
    }

    return (
    <div>
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                noWrap={true}
            />
        <FlyMapTo/>
            <Marker position={center}></Marker>
            {children}
        </MapContainer>
    </div>
);
};

export default Map;