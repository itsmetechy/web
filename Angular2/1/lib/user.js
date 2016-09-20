var app = angular.module('myApp',[]);
app.controller('userCtrl', function($scope){
    
    
    $scope.users = [
                {id:1, fName:'Hege', lName:"Pege" },
                {id:2, fName:'Kim',  lName:"Pim" },
                {id:3, fName:'Sal',  lName:"Smith" },
                {id:4, fName:'Jack', lName:"Jones" },
                {id:5, fName:'John', lName:"Doe" },
                {id:6, fName:'Peter',lName:"Pan" }
    ];
    $scope.hideform = true;    
    $scope.editUser = function(id){
        $scope.hideform = false;
        if(id === 'new'){
            $scope.fName = '';
            $scope.lName = '';
            $scope.id='';            
        }else{
            $scope.id = $scope.users[id-1].id;
            $scope.fName = $scope.users[id-1].fName;
            $scope.lName = $scope.users[id-1].lName;
        }
    }
    $scope.updateUser = function(){  
        $scope.totalObject = $scope.users.length;
        $scope.newUser = {
            id:$scope.id,
            fName:$scope.fName,
            lName:$scope.lName
        }
        if($scope.id === undefined || $scope.id == NaN || $scope.id == ''){
             $scope.users.push($scope.newUser);  
        }else{
            $scope.users[$scope.id-1].id = $scope.newUser.id;
            $scope.users[$scope.id-1].fName = $scope.newUser.fName;
            $scope.users[$scope.id-1].lName = $scope.newUser.lName;
        }
    }
});