#!/bin/sh
#
#	Run Cucumber tests
#
TESTING_DIR=$(cd $(dirname $0); pwd)

# Hard coded
export API_SERVER_HOST=127.0.0.1
export API_SERVER_PORT=3000


# Check we have the things we need
broken=N
[ "${API_SERVER_HOST}" == "" ] && echo "Error: Environment variable \$API_SERVER_HOST is not defined." && broken=Y
[ "${API_SERVER_PORT}" == "" ] && echo "Error: Environment variable \$API_SERVER_PORT is not defined." && broken=Y
if [ $broken == Y ] ; then
	#echo ""
	#echo "Please run this command in the appropriate target directory:"
	#echo ""
	#echo "    $ . SETENV"
	#echo ""
	exit 1
fi

echo ""
echo "  API_SERVER_HOST=${API_SERVER_HOST}"
echo "  API_SERVER_PORT=${API_SERVER_PORT}"
echo ""


#
#	Work out any extra tags
#
extra=""
for tag in ${*} ; do
	echo Using tag $tag
	extra="${extra} --tags ${tag}"
done


#
#	Load the test data
#
#echo "$ ${TESTING_DIR}/load-test-data"
#        ${TESTING_DIR}/load-test-data
#[ "$?" != 0 ] && exit 1

#
#	Run the Cucumber tests
#
cd ${TESTING_DIR}
echo "$" ./node_modules/.bin/cucumber.js \
		--tags ~@ignore \
		${extra} \
		cucumber/features \
		--require cucumber/features/step_definitions \
		--format pretty
./node_modules/.bin/cucumber.js \
		--tags ~@ignore \
		${extra} \
		cucumber/features \
		--require cucumber/features/step_definitions \
		--format pretty
rv=$?
exit ${rv}
