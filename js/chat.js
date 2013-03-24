var chatApp = angular.module('chatApp', ['ngResource']);

chatApp.controller('AppController', function AppController($scope)
{
	// connect to socket
	var socket = io.connect('http://localhost:1337');

	// create messages array on the scope
	$scope.messages = [];

	// receiving messages from the socket
	socket.on('message', function(data)
	{
		// add the message to array
		$scope.messages.push(
			{ username: data.username, text: data.text }
		);

		// apply the scope
		$scope.$apply();
	});

	// send message
	$scope.sendMessage = function()
	{
		// chech if not empty
		if($scope.messageText !== '' && $scope.messageText !== undefined)
		{
			// send message to the socket
			socket.emit('message', { username: 'User 1', text: $scope.messageText });

			// clear input field
			$scope.messageText = '';
		}
	};
});
