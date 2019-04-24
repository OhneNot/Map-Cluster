# Map Cluster

Algorytmus to create clusters on maps.

## Handling

### PHP
```
$markers = [
    [ "latLng" => [ "lat" => "24.794044", "lng" => "16.988475" ], ... ],
    ...
];

$ClusterAndMarker = cluster($markers);

var_dump($ClusterAndMarker);
```
```
[
    "cluster" => [
        [
            "latLng" => [ "lat" => "1.123456", "lng" => "1.123456" ],
            "count" => X
        ],
        ...
    ],
    "marker" => [
        [ /* you marker object */ ],
        [ /* you marker object */ ],
        ...
    ]
]
```

### JavaScript
```
let markers = [
    { latLng : { lat : "24.794044", lng : "16.988475" }, ... },
    ...
];

let ClusterAndMarker = cluster(markers);

console.log(ClusterAndMarker);
```
```
[
    cluster : [
        {
            latLng : { lat : "1.123456", lng : "1.123456" },
            count : X
        },
        ...
    ],
    marker : [
        { /* you marker object */ },
        { /* you marker object */ },
        ...
    ]
]
```

## latLng Object

If you have a different coordinate structure, you can adjust the script.

### php
```
Line 22
* $marker->latLng->lat
* $target->latLng->lat
* $marker->latLng->lng
* $target->latLng->lng

Line 40
* $clusterMarker[$e][$i]->latLng->lat

Line 41
* $clusterMarker[$e][$i]->latLng->lng
```

### JavaScript
```
Line 22
* thisMarker.latLng.lat
* marker.latLng.lat
* thisMarker.latLng.lng
* marker.latLng.lng

Line 49
* clusterMarkers[e][i].latLng.lat

Line 50
* clusterMarkers[e][i].latLng.lng
```

## Authors

* **Algorytmus** - [Chris B](https://stackoverflow.com/questions/1434222/map-clustering-algorithm)
* **Modification and conversion in JS** [OhneNot](https://github.com/OhneNot)