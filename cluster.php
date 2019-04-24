<?php

function clusters( $markers ) {
    $mapZoom = $_GET['zoom'];
    /* From zoom level X no cluster is formed. */
    $noCluster = 16;
    $distance = abs(10000000 >> mapZoom) / 100000; /* ~ 0.00xyz */
    $clusterMarkers = array();
    $singleMarkers = array();
    $clusterWithCenterCoords = array();

    /* if then exit */
    if($mapZoom > $noCluster) return [ 'cluster' => array(), "marker" => $markers ];

    /* starts the sorting of the markers */
    while (count($markers)) {
        $marker  = array_pop($markers);
        $cluster = array();
        foreach ($markers as $key => $target) {
            $pixels = abs($marker->latLng->lat - $target->latLng->lat) + abs($marker->latLng->lng - $target->latLng->lng);
            if ($pixels < $distance) {
                /* Marker in Cluster circle, added to cluster Array and remove from $markers */
                unset($markers[$key]);
                $cluster[] = $target;
            }
        }
        if (count($cluster) > 0) {
            /* When a cluster is formed, the reference marker is added at the end of the process */
            $cluster[] = $marker;
            $clusterMarkers[] = $cluster;
        } else {
            /* Marker not in cluster, added to single Array */
            /*? Here you can edit the markers before adding them to the array. ?*/
            $singleMarkers[] = $marker;
        }
    }
    for($e = 0; $e < count($clusterMarkers); $e++){
        $lat = $lng = $i = 0;
        for(; $i < count($clusterMarker[$e]); $i++){
            $lat += $clusterMarker[$e][$i]->latLng->lat * 1000000;
            $lng += $clusterMarker[$e][$i]->latLng->lng * 1000000;
        }
        $clusterWithCenterCoords[] = [ "latLng" => [ "lat" => round($lat/$e)/1000000, "lng" => round($lng/$e)/1000000], "count" => $i ];
    }
    return response()->json([ 'cluster' => $clusterWithCenterCoords, "marker" => $singleMarkers]);
}

?>