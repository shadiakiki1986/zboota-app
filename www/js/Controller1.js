function Controller1($scope) {

	$scope.data={};

	$scope.getStatus="None";

	$scope.dataTs=null;
	$scope.get = function() {
		$scope.getStatus="Requesting";
		$.ajax({type:'POST',
			url: ZBOOTA_SERVER_URL+'/api/get.php',
			data: {lpns:JSON.stringify($scope.data)},
			dataType: 'json',
			success: function(rt) {
				if(rt.hasOwnProperty("error")) alert("Zboota server error: "+rt.error);
				$scope.$apply(function() {
					dataTsAll=[];
					for(var i in rt) {
						$scope.data[i].isf=rt[i].isf;
						$scope.data[i].pml=rt[i].pml;
						if(rt[i].dm) $scope.data[i].dm=rt[i].dm;
						dataTsAll.push(moment(rt[i].dataTs,'YYYY-MM-DD h:mm:ss').format('YYYY-MM-DD'));
					}
					$scope.dataTs=new Date(dataTsAll.unique().sort()[0]);//new Date();
					window.localStorage.setItem('data',angular.toJson($scope.data));
					window.localStorage.setItem('dataTs',angular.toJson($scope.dataTs));
				});
			},
			error: function(rt,et,ts) { alert("Error getting zboota from server. "+et+";"+ts); },
			complete: function() { $scope.$apply(function() { $scope.getStatus="None"; }); }

		});
	};

	$scope.clear=function() {
		for(d in $scope.data) { $scope.del($scope.data[d].a,$scope.data[d].n); }
	};

	$scope.del=function(a,n) {
		delete $scope.data[an2id(a,n)];
		window.localStorage.setItem('data',angular.toJson($scope.data));
		$scope.$broadcast('requestUpdate');
		if($scope.noData2()) {
			$scope.dataTs=null;
			window.localStorage.removeItem('dataTs');
		}
	};
	$scope.momentFormat1=function(a) { return moment(a).format('MMMM Do YYYY, h:mm:ss a'); };
	$scope.momentFormat2=function(a) { return moment(a).format('YYYY-MM-DD'); };

	$scope.noData=function() { return Object.keys($scope.data).length==0; };
	$scope.noData2=function() { return Object.keys($scope.data)
			.map(function(x) { return $scope.data[x].isf; })
			.filter(function(x) { return x!='-'; })
			.length==0; };

	$scope.areas=["B","G","R","Z","S","T","D","J","M","N","O"];
	$scope.cartypes=["Private cars", "Motorcycles", "Mass public transport trucks", "Taxis", "Public buses & minibuses", "Private transport vehicles", "Other private vehicles: Ambulances, etc..."];
	$scope.horsepowers=["1 - 10", "11-20", "21-30", "31-40", "41-50", "51 and above"];
	$scope.years=["2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001 and before"];

	$scope.addReset=function() {
		$scope.addC={'n':'','a':'','l':''};
	};

	$scope.add=function() {
		$scope.addCore($scope.addC,false);
		$scope.addReset();
	}
	$scope.addCore=function(xxx,isChild) {
	// xxx:   {"n":n,"a":a,"l":l};
		myscope=$scope;
		if(!myscope.data.hasOwnProperty(an2id(xxx.a,xxx.n))) {
			myscope.data[an2id(xxx.a,xxx.n)]=xxx; 
			window.localStorage.setItem('data',angular.toJson(myscope.data));
			if(!isChild) myscope.$broadcast('requestUpdate');
			$scope.get();
			$scope.hideAdd();
		}
	}

	$scope.serverAvailable=false;
	$scope.pingServer=function() {
		$.ajax({type:'GET',
			url: ZBOOTA_SERVER_URL+'/api/get.php',
			success: function(rt) { $scope.$apply(function() { $scope.serverAvailable=true; }); },
			error: function(rt,et,ts) { $scope.$apply(function() { $scope.serverAvailable=false; }); alert("Server"+ZBOOTA_SERVER_URL+" unavailable. "+et+";"+ts); },
		});
	};

	angular.element(document).ready(function () {
		$scope.hideAdd();
		$('#disclaimerModal').modal('hide');

		$scope.pingServer();
		wlsgi1=window.localStorage.getItem('data');
		wlsgi2=window.localStorage.getItem('dataTs');
		$scope.$apply(function() {
			if(wlsgi1!==null) { $scope.data=angular.fromJson(wlsgi1); }
			if(wlsgi2!==null) { $scope.dataTs=angular.fromJson(wlsgi2); }
		});
		setInterval(function() { $scope.$apply(function() { $scope.tnow=new Date();}); }, 1000);
	});

	$scope.$on('requestAddCore', function(event,fn) { $scope.addCore(fn,true); });

	$scope.showAdd=function() { $('#addModal').modal('show'); };
	$scope.hideAdd=function() { $('#addModal').modal('hide'); };
	$scope.showDisclaimer=function() { $('#disclaimerModal').modal('show'); };
	$scope.hideDisclaimer=function() { $('#disclaimerModal').modal('hide'); };
	$scope.getCarRowClass=function(a,n) {
		temp=$scope.data[an2id(a,n)];
		if(temp.isf!='None'||temp.pml!='None') {
			return "danger"; //lightpink"; 
		} else {
			if(temp.dm=="There are no results matching the specifications you've entered...") {
				return "info"; //orange";
			} else {
				return ""; //"white";
			}
		}
		//console.log($scope.data[an2id(a,n)]);
	};

	$scope.dataDateVsToday=function() {
		if($scope.momentFormat2($scope.tnow)!=$scope.momentFormat2($scope.dataTs)) return "text-danger bg-danger"; else return "";
	};

};
