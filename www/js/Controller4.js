function Controller4($scope) {

	$scope.addPhoto=function() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      alert('The File APIs are not fully supported in this browser.');
      return;
    }   

    input = document.getElementById('image1');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");               
    }
    else {
      file = input.files[0];
			var filerdr = new FileReader();
			filerdr.onload = function(e) {
				$('#imgprvw').attr('src', e.target.result);
				$scope.$apply(function() { $scope.$parent.photos[an2id($scope.$parent.addC.a,$scope.$parent.addC.n)]=e.target.result; });
				//console.log($scope.$parent.photos);
			}
			filerdr.readAsDataURL(input.files[0]);

    }
	};

};
