const diveLayer = L.layerGroup();

const diveIcon = L.icon({
    iconUrl: '/assets/dive.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
});

function onEachFeature(feature, layer) {
	layer.bindPopup(feature.properties.date);
}

$.getJSON("/assets/dives.geojson", function(data){
	L.geoJSON(data, {

		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: diveIcon});
		},
	
		onEachFeature: onEachFeature
	}).addTo(diveLayer)
});

const sampleLayer = L.layerGroup();

const sampleIcon = L.icon({
    iconUrl: '/assets/sample.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
});

$.getJSON("/assets/samples.geojson", function(data){
	L.geoJSON(data, {

		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: sampleIcon});
		},
	
		onEachFeature: onEachFeature
	}).addTo(sampleLayer)
});

const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const grayscale = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
const streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

const map = L.map('map', {
	center: [-4.50, 55.50],
	zoom: 10,
	layers: [streets, diveLayer, sampleLayer]
});

const baseLayers = {
	"Streets": streets,
	"Grayscale": grayscale
};

const overlays = {
	"Underwater Dives": diveLayer,
	"Sand Samples": sampleLayer
};

L.control.layers(baseLayers, overlays).addTo(map);

