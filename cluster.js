
function cluster(markers){
    const mapZoom = 12; /* map.getZoom(); */

    /* From zoom level X no cluster is formed. */
    const noCluster = 16;
    const distance = Math.abs(10000000 >> mapZoom) / 100000; /* ~ 0.00xyz */
    let clusterMarkers = [];
    let singleMarker = [];
    let clusterWithCenterCoords = [];

    if(mapZoom >= noCluster) return { cluster : [], marker : markers }; /* if then exit */
    
    const whileLoop = (markers) => {
        /* Get last Marker in Array */
        let marker = markers.pop();
        let cluster = [];
        let newMarker = [];
    
        for(let key in markers){
            let thisMarker = markers[key];
            let pix = Math.abs(thisMarker.latLng.lat - marker.latLng.lat) + Math.abs((thisMarker.latLng.lng - marker.latLng.lng)*2);
            if(pix < distance)
                /* Marker in Cluster circle, added to cluster Array */
                cluster.push(thisMarker); 
            else 
                /* Marker not in cluster circle, added to new marker Array */
                newMarker.push(thisMarker);
        }
        if(cluster.length > 0){
            /* When a cluster is formed, the reference marker is added at the end of the process */
            cluster.push(marker);
            clusterMarkers.push(cluster);
        } else {
            /* Marker not in cluster, added to single Array */
            singleMarker.push(marker);
        }
        /* If there are any markers left, the function is called again. */
        if(newMarker.length > 0) whileLoop(newMarker);
    };
    /* starts the sorting of the markers */
    whileLoop(markers);
    /* Get center of cluster marker */
    for( let e = 0; e < clusterMarkers.length; e++ ){
        let lat = 0;
        let lng = 0;
        let i = 0;
        for(i = 0; i < clusterMarkers[e].length; i++){
            lat += clusterMarkers[e][i].latLng.lat * 1000000;
            lng += clusterMarkers[e][i].latLng.lng * 1000000;
        }
        clusterWithCenterCoords.push({ latLng : { lat : Math.round(lat/i) / 1000000, lng : Math.round(lng/i) / 1000000 }, count : i });
    }
    return {cluster : clusterWithCenterCoords, marker : singleMarker};
}