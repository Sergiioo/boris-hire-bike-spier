var bikeHireSpier = function () {

    function bikeStatus(bikePoint, appId, appKey) {

        var request = new Request('https://api.tfl.gov.uk/BikePoint/' + bikePoint + '?app_id=' + appId + '&app_key=' + appKey);
        fetch(request).then(function (response) {

            response.json().then(function (tflResponse) {

                document.getElementById('station').innerHTML = tflResponse.commonName;;

                if (tflResponse.additionalProperties && Array.isArray(tflResponse.additionalProperties)) {
                    var bikeCount = tflResponse.additionalProperties.find(function (properties) {
                        return properties && properties.key && properties.key === 'NbBikes';
                    });
                    var spaceCount = tflResponse.additionalProperties.find(function (properties) {
                        return properties && properties.key && properties.key === 'NbEmptyDocks';
                    });
                    var dockCount = tflResponse.additionalProperties.find(function (properties) {
                        return properties && properties.key && properties.key === "NbDocks";
                    });

                    showResults(bikeCount.value, spaceCount.value);

                    console.log("bike count: " + bikeCount.value + ", space count: " + spaceCount.value + ", total docks: " + dockCount.value);
                }
            })
        });
    }

    function showResults(bikeCount, spaceCount) {
        var bikesElement = document.getElementById('bikes');
        bikesElement.innerHTML = bikeCount;

        var spacesElement = document.getElementById('spaces');
        spacesElement.innerHTML = spaceCount;
    }

    function reset() {
        document.getElementById('station').innerHTML = '';
        document.getElementById('bikes').innerHTML = '';
        document.getElementById('spaces').innerHTML = '';
    }

    function refresh() {
        reset();
        bikeStatus("BikePoints_340", getAppId(), getAppKey());
    }

    function getAppId() {
        return '';
    }

    function getAppKey() {
        return '';
    }

    return {
        bikeStatus: bikeStatus(),
        getAppId: getAppId,
        getAppKey: getAppKey,
        refresh: refresh,
        reset: reset
    }

}();

bikeHireSpier.refresh();
