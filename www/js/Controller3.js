function Controller3($scope,$http) {

	$scope.message="";
	getHeaderMessage=function() {
		$scope.loginStatus='Logging in';
		$http.get(ZBOOTA_SERVER_URL+'/api/headerMessage.php').
			success(function(rt) {
				if(rt.message) {
					$scope.message=rt.message;
				}
			});
	};

        angular.element(document).ready(function () {
		getHeaderMessage();
	});
};
