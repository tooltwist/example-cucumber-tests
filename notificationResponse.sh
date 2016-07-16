#!/bin/sh
#
#	Test the RESTful API using curl.
#
#	The 'json' command below is used to pretty-print the JSON output,
#	and can be installed with 'sudo npm install -g json'.
#



# Create the input file
tmpfile=$(mktemp /tmp/notificationResponse-XXXXX)
cat > ${tmpfile} << ENDD
{
    "AuthToken":"", 
    "NotificationId":"17",
    "ResponseType":"0", 
    "deliveryDate":"2016-07-11 04:00:03.4405194", 
    "confirmationDate":"2016-07-11 04:00:03.4405194"
}
ENDD


# Display the input
echo ''
echo 'INPUT:'
cat ${tmpfile}
echo ''


# Call the web service
curl -v -X POST \
	-H "Content-Type: application/json" \
	-H "Accept: application/json" \
	--data-binary @${tmpfile} \
	http://localhost:3000/api/NotificationResponse \
| json


rm -f ${tmpfile}
