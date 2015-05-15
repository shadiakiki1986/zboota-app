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

		//allow only valid image file types
		switch(file.type)
		{
		    case 'image/png': case 'image/gif': case 'image/jpeg': case 'image/pjpeg':
			break;
		    default:
			alert("Unsupported image type. Please use png, gif, jpeg, or pjpeg");
			return false
		}

		//Allowed file size is less than 1 MB (1048576)
		if(file.size>1048576)
		{   
		    alert("Too big Image file! Please reduce the size of your photo using an image editor.");
		    return false
		}

		var filerdr = new FileReader();
		filerdr.onload = function(e) {
			$('#imgprvw').attr('src', e.target.result);
			$scope.$apply(function() { $scope.$parent.addC.photo=e.target.result; });
		}
		filerdr.readAsDataURL(input.files[0]);

	      }
	};

	$scope.rmPhoto=function() {
		delete $scope.$parent.addC.photo;
	}


	$scope.photoshow4=function() {
		if(!$scope.$parent.addC) {
			return false;
		} else if( !$scope.$parent.addC.hasOwnProperty('photo')) return false; else return $scope.$parent.addC.photo;
	};

};
