demoApp.service('GeneralService', function ($http) {

	this.base_url = '';
	this.xhr = function (url, resource) {

		var formData = new FormData();

		angular.forEach(resource, function (value, key) {
			formData.append(key, value);
		});

		return $http.post(this.base_url + url, formData, {
			withCredentials: true,
			headers: { 'Content-Type': undefined },
			transformRequest: angular.identity
		});

	};

	this.storeResource = function (url, resource) {
		return $http.post(this.base_url + url, resource);
	};

	this.updateResource = function (url, resource) {
		return $http.put(this.base_url + url, resource);
	};

	this.deleteResource = function (url) {
		return $http.delete(this.base_url + url);
	};

	this.getResource = function (url) {
		return $http.get(this.base_url + url);
	};

});