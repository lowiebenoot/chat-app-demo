var chatApp = angular.module('chatApp', ['ngResource']);

chatApp.controller('AppController', function AppController($scope)
{
	// connect to socket
	var socket = io.connect('http://localhost:1337');

	// create messages array on the scope, with some example messages
	$scope.messages = [
		{ username: 'Luke', text: 'Some one here?' },
		{ username: 'Obi-Wan Kenobi', text: 'Use the Force, Luke' },
		{ username: 'Darth Vader', text: 'The Force is strong with this one' }
	];

	// receiving messages from the socket
	socket.on('message', function(data)
	{
		// add the message to array
		$scope.messages.push(
			{ username: data.username, text: data.text }
		);

		// apply the scope
		$scope.$apply();

		// scroll to the bottom
		var element = document.getElementById('messages');
		element.scrollTop = element.scrollHeight;
	});

	// send message
	$scope.sendMessage = function()
	{
		// chech if not empty
		if($scope.messageText !== '' && $scope.messageText !== undefined)
		{
			// get the username
			var username = $scope.username ? $scope.username : 'Anonymous';

			// send message to the socket
			socket.emit('message', { username: username, text: $scope.messageText });

			// clear input field
			$scope.messageText = '';
		}
	};
});
