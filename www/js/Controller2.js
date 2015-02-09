function Controller2($scope) {

	$scope.loginStatus='None';
	$scope.dataServer='{}';
	$scope.login=function() {
		$scope.loginStatus='Logging in';
		$.ajax({type:'POST',
			url: ZBOOTA_SERVER_URL+'/api/login.php',
			data: $scope.loginU,
			dataType: 'json',
			success: function(rt) {
				$scope.hideLogin();
				if(rt.hasOwnProperty("error")) {
					alert("Zboota login error: "+rt.error);
					$scope.$apply(function() { $scope.loginStatus='None'; });
					return;
				}
				$scope.$apply(function() {
					$scope.loginStatus='Logged in';
					// append data from server to here
					for(var i in rt) { $scope.$emit("requestAddCore",rt[i]); }
					window.localStorage.setItem('loginU',angular.toJson($scope.loginU));
					$scope.dataServer=angular.toJson(rt);
				});
				$scope.update(); // updating with whatever was done while offline
				$scope.$parent.get(); // retrieving data after login
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error logging in. "+textStatus+","+errorThrown);
				$scope.loginStatus='None';
			}
		});
	};
	$scope.updateStatus='None';
	$scope.update=function() {
		if($scope.loginStatus!='Logged in') return;

		// drop the ISF and PML data so that only the area, number, and label are stored
		temp=angular.fromJson(angular.toJson($scope.$parent.data));
		for(t in temp) { temp[t]={'a':temp[t].a,'n':temp[t].n,'l':temp[t].l}; }
		if($scope.dataServer==angular.toJson(temp)) return; // no need to update

		$scope.updateStatus='Updating';
		$.ajax({type:'POST',
			url: ZBOOTA_SERVER_URL+'/api/update.php',
			data: {'email':$scope.loginU.email,'pass':$scope.loginU.pass,'lpns':angular.toJson(temp)},
			dataType: 'json',
			success: function(rt) {
				if(rt.hasOwnProperty("error")) {
					alert("Zboota update error: "+rt.error);
					return;
				}
				$scope.$apply(function() { $scope.dataServer=angular.toJson(temp); }); // match the two
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error updating server. "+textStatus+","+errorThrown);
			},
			complete: function() { $scope.updateStatus='None'; }
		});
	};

	$scope.newUStatus="None";
	$scope.newU=function() {
		$scope.newUStatus='Registering';
		$.ajax({type:'POST',
			url: ZBOOTA_SERVER_URL+'/api/new.php',
			data: $scope.loginU,
			dataType: 'json',
			success: function(rt) {
				$scope.hideLogin();
				if(rt.hasOwnProperty("error")) {
					alert("Zboota new account error: "+rt.error);
					return;
				}
				alert("Please check your email in a few minutes and click on the link to confirm that the email address is indeed yours.");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error adding new account. "+textStatus+","+errorThrown);
			},
			complete: function() { $scope.newUStatus='None'; }

		});
	};

	$scope.logout = function () {
		window.localStorage.removeItem('loginU');
		$scope.loginU={email:'',pass:''};
		$scope.loginStatus='None';
		$scope.dataServer='{}';
	};

	angular.element(document).ready(function () {
		$scope.hideLogin();

		wlsgi1=window.localStorage.getItem('loginU');
		$scope.$apply(function() {
			if(wlsgi1!==null) {
				$scope.loginU=angular.fromJson(wlsgi1);
				$scope.login();
			}
		});
	});

	$scope.$on('requestUpdate', function(event,fn) { $scope.update(); });

	$scope.showLogin=function() { $scope.loginType='Log in'; $('#loginModal').modal('show'); };
	$scope.hideLogin=function() { $('#loginModal').modal('hide'); };
	$scope.showNew=function() { $scope.loginType='New';    $('#loginModal').modal('show'); };

	$scope.forgotPasswordStatus=false;
	$scope.forgotPassword=function() {
		$scope.forgotPasswordStatus=true;
		$.ajax({type:'POST',
			url: ZBOOTA_SERVER_URL+'/api/forgotPassword.php',
			data: $scope.loginU,
			dataType: 'json',
			success: function(rt) {
				if(rt.hasOwnProperty("error")) {
					alert("Zboota forgot password error: "+rt.error);
					return;
				}
				alert("Your password has been emailed to you. Please check in a few minutes.");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error in forgot password. "+textStatus+","+errorThrown);
			},
			complete: function() {
				$scope.hideLogin();
				$scope.$apply(function() { $scope.forgotPasswordStatus=false; });
			}
		});
	};

};
