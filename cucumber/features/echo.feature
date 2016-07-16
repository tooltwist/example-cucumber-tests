@api
@ping

Feature: Echo API
	In order to confirm the API server is operational
	As a consumer of the RESTful API
	I want to be able to call the ping API and get a valid echoed back


  # Select elements paginated
	Scenario: Simple ping 1
		Given the API server is running
		When I ping the server with name 'Fred'
		Then the reply status code should be 200
		  And the reply should contain name as 'Fred'


  # Temporarily disabled test
  # i.e. a test for future functionality not developed yet)
  @ignore
	Scenario: Moon Mission
		Given I have started my space flight project
		When I send a rocket to the moon
		Then the rocket should arrive safely at the moon


  # Test error conditions
  
  # /echo
  Scenario: Call the echo API with no second parameter
  	Given the API server is running
  	When I ping the server with no name
  	Then the reply status code should be 404
  	  And the error message should be '/echo does not exist'		  

  # /echo/name/extraname
  Scenario: Call the echo API with two names
  	Given the API server is running
  	When I ping the server with two names
  	Then the reply status code should be 404
  	  And the error message should be '/echo/param1/param2 does not exist'		  
