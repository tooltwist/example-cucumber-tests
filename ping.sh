#!/bin/sh
#
#	Test the RESTful API using curl.
#
#	The 'json' command below is used to pretty-print the JSON output,
#	and can be installed with 'sudo npm install -g json'.
#




# Call the web service
curl -v \
	-H "Accept: application/json" \
	http://localhost:3000/echo/HiThere \
| json


rm -f ${tmpfile}
